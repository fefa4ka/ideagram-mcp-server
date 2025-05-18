import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import FormData from 'form-data';

export interface IdeogramStyleReference {
  urls?: string[];
  style_code?: string;
  random_style?: boolean;
}

export interface IdeogramGenerateParams {
  /** Generation prompt (English recommended) */
  prompt: string;
  /** Aspect ratio enum (mutually exclusive with resolution) */
  aspect_ratio?: string;
  /** Back-compat: old model param → internally mapped to rendering_speed */
  model?: 'V_1' | 'V_1_TURBO' | 'V_2' | 'V_2_TURBO' | 'V_3' | 'V_3_TURBO' | 'V_3_DEFAULT' | 'V_3_QUALITY';
  /** Official v3 field */
  rendering_speed?: 'TURBO' | 'DEFAULT' | 'QUALITY';
  /** MagicPrompt control (AUTO / ON / OFF) */
  magic_prompt?: 'AUTO' | 'ON' | 'OFF';
  /** Deprecated alias kept for compatibility */
  magic_prompt_option?: 'AUTO' | 'ON' | 'OFF';
  seed?: number;
  style_type?: string;
  negative_prompt?: string;
  num_images?: number;
  resolution?: string;
  /** Optional list of 8-char style codes */
  style_codes?: string[];
  color_palette?: {
    name?: string;
    members?: Array<{ color: string; weight?: number }>;
  };
  style_reference?: IdeogramStyleReference;
}

export interface IdeogramResponse {
  created: string;
  data: Array<{
    url: string;
    id: string;
    filepath?: string;
  }>;
  /** 画像生成に使用したリクエストパラメータ */
  request?: Record<string, unknown>;
}

export class IdeogramClient {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.ideogram.ai';
  private readonly outputDir: string;

  constructor(apiKey: string, outputDir?: string) {
    if (!apiKey) {
      throw new Error('IDEOGRAM_API_KEY is required');
    }
    this.apiKey = apiKey;
    this.outputDir = outputDir || path.join(process.cwd(), 'generated_images');
    
    // 出力ディレクトリが存在しない場合は作成
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  private async downloadImage(url: string, id: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${timestamp}_${id}.png`;
    const filepath = path.join(this.outputDir, filename);

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

  async generateImage(params: IdeogramGenerateParams): Promise<IdeogramResponse> {
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
        const filepath = await this.downloadImage(img.url, img.id);
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
