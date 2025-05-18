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