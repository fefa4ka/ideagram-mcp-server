import axios from 'axios';
import * as path from 'path';
import FormData from 'form-data';
import { IdeogramStyleReference, IdeogramGenerateParams, IdeogramResponse } from './types/ideogram.js';
import { downloadAndBlurMaskImage } from './utils/imageMaskBlur.js';

export class IdeogramClient {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://exte.nder.su';
  private readonly defaultOutputDir: string;

  constructor(apiKey: string, outputDir?: string) {
    if (!apiKey) {
      throw new Error('IDEOGRAM_API_KEY is required');
    }
    this.apiKey = apiKey;
    this.defaultOutputDir = outputDir || path.join(process.cwd(), 'docs');
  }

  /**
   * 画像生成API呼び出し
   * @param params 生成パラメータ
   * @param outputDir 保存先ディレクトリ（省略時はdefaultOutputDir）
   * @param baseFilename ベースファイル名（省略時は"ideogram-image"）
   * @param blurMask 画像の淵をぼかすかどうか
   */
  async generateImage(
    params: IdeogramGenerateParams,
    outputDir?: string,
    baseFilename?: string,
    blurMask?: boolean
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
          'Authorization': 'Bearer ' + this.apiKey,
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
        const filepath = await downloadAndBlurMaskImage(
          img.url,
          img.id,
          outputDir,
          baseFilename,
          blurMask // 追加
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
