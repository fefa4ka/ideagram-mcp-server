import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import FormData from 'form-data';

import { IdeogramStyleReference, IdeogramGenerateParams, IdeogramResponse } from './types/ideogram.js';

export class IdeogramClient {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.ideogram.ai';
  private readonly defaultOutputDir: string;

  constructor(apiKey: string, outputDir?: string) {
    if (!apiKey) {
      throw new Error('IDEOGRAM_API_KEY is required');
    }
    this.apiKey = apiKey;
    this.defaultOutputDir = outputDir || path.join(process.cwd(), 'docs');
    // ディレクトリは必要に応じて後で作成
  }

  /**
   * 画像をダウンロードして保存する
   * @param url 画像URL
   * @param id 画像ID
   * @param outputDir 保存先ディレクトリ（省略時はdefaultOutputDir）
   * @param baseFilename ベースファイル名（省略時は"ideogram-image"）
   * @returns 保存したファイルのパス
   */
  private async downloadImage(
    url: string,
    id: string,
    outputDir?: string,
    baseFilename?: string
  ): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const base = baseFilename || 'ideogram-image';
    // idがundefined/null/空文字ならファイル名から除外
    const idPart = (typeof id === "string" && id.trim() !== "" && id !== "undefined") ? `_${id}` : "";
    const filename = `${base}_${timestamp}${idPart}.png`;
    const dir = outputDir || this.defaultOutputDir;

    // ディレクトリがなければ作成
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filepath = path.join(dir, filename);

    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filepath);
        });
        fileStream.on('error', reject);
      }).on('error', reject);
    });
  }

  /**
   * 画像生成API呼び出し
   * @param params 生成パラメータ
   * @param outputDir 保存先ディレクトリ（省略時はdefaultOutputDir）
   * @param baseFilename ベースファイル名（省略時は"ideogram-image"）
   */
  async generateImage(
    params: IdeogramGenerateParams,
    outputDir?: string,
    baseFilename?: string
  ): Promise<IdeogramResponse> {
     // デフォルト値を補完（未指定なら 1x1）
     if (!params.aspect_ratio) {
       params.aspect_ratio = '1x1';
     }
     // MagicPrompt 統合 & デフォルト AUTO
     if (params.magic_prompt_option && !params.magic_prompt) {
       params.magic_prompt = params.magic_prompt_option;
       delete (params as any).magic_prompt_option;
     }
     if (!params.magic_prompt) {
       params.magic_prompt = 'AUTO';
     }

     // v3: rendering_speed を優先。model が指定されている場合は後方互換マッピング
     let rendering_speed: 'TURBO' | 'DEFAULT' | 'QUALITY' = params.rendering_speed ?? 'DEFAULT';
     if (params.model) {
       switch (params.model) {
         case 'V_3_TURBO':
         case 'V_2_TURBO':
         case 'V_1_TURBO':
           rendering_speed = 'TURBO';
           break;
         case 'V_3_QUALITY':
           rendering_speed = 'QUALITY';
           break;
         // V_3, V_2, V_1 などは DEFAULT
         default:
           rendering_speed = 'DEFAULT';
       }
       // API には model を送らない
       delete (params as any).model;
     }
     // request payload に rendering_speed を明示
     (params as any).rendering_speed = rendering_speed;
     // クライアント内で model / rendering_speed の重複を排除
     delete (params as any).model;
     delete (params as any).rendering_speed_option; // 念のため

     try {
       // 参照画像がURLとして提供されている場合
       let formData: any = undefined;
      let requestConfig: any = {
        headers: {
          'Api-Key': this.apiKey,
          'Content-Type': 'application/json',
        },
      };
      
      // style_referenceでurlsが指定されている場合はマルチパートフォームデータを使用
      if (params.style_reference?.urls && params.style_reference.urls.length > 0) {
        formData = new FormData();
        
        // 参照画像をダウンロードしてFormDataに追加
        for (let i = 0; i < params.style_reference.urls.length; i++) {
          const url = params.style_reference.urls[i];
          try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');
            formData.append(`reference_image_${i+1}`, buffer, `reference_${i+1}.jpg`);
          } catch (error) {
            console.error(`Failed to download reference image from ${url}:`, error);
          }
        }
        
        // その他のパラメータをJSON文字列としてFormDataに追加
        const paramsWithoutStyleReferenceUrls = {
          ...params,
          style_reference: {
            ...params.style_reference,
            urls: undefined // URLsを無効化して重複を避ける
          }
        };
        formData.append('image_request', JSON.stringify(paramsWithoutStyleReferenceUrls));
        
        // FormDataを使用するためのヘッダー設定
        requestConfig.headers['Content-Type'] = 'multipart/form-data';
      }
      
      // 通常のJSONリクエストまたはFormDataリクエストを送信
      const response = await axios.post(
        `${this.baseUrl}/v1/ideogram-v3/generate`,
        formData || params,
        requestConfig
      );

      // 画像を自動保存
      const downloadPromises = response.data.data.map(async (img: { url: string; id: string }) => {
        const filepath = await this.downloadImage(
          img.url,
          img.id,
          outputDir,
          baseFilename
        );
        return { ...img, filepath };
      });

      const updatedData = await Promise.all(downloadPromises);
      response.data.data = updatedData;

      const result: IdeogramResponse = {
        ...response.data,
        request: { ...params }
      };
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const detail = typeof error.response?.data === 'string'
          ? error.response.data
          : JSON.stringify(error.response?.data, null, 2);
        throw new Error(`Ideogram API error (${error.response?.status}): ${detail || error.message}`);
      }
      throw error;
    }
  }
}
