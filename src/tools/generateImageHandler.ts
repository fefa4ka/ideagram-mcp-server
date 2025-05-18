import { IdeogramClient } from "../ideogram-client.js";
import { IdeogramGenerateParams, IdeogramStyleReference } from "../types/ideogram.js";
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

export async function generateImageHandler(ideogramClient: IdeogramClient, args: any) {
  if (!args || typeof args.prompt !== "string") {
    throw new McpError(
      ErrorCode.InvalidParams,
      "Prompt is required and must be a string"
    );
  }

  // 保存先ディレクトリとファイル名のデフォルト設定
  const outputDir = typeof args.output_dir === "string" && args.output_dir.trim() !== ""
    ? args.output_dir
    : "docs";
  const baseFilename = typeof args.base_filename === "string" && args.base_filename.trim() !== ""
    ? args.base_filename
    : "ideogram-image";

  const params: IdeogramGenerateParams = {
    prompt: args.prompt,
    aspect_ratio: typeof args.aspect_ratio === "string" ? args.aspect_ratio : undefined,
    resolution: typeof args.resolution === "string" ? args.resolution : undefined,
    seed: typeof args.seed === "number" ? args.seed : undefined,
    magic_prompt: typeof args.magic_prompt === "string" && ["AUTO", "ON", "OFF"].includes(args.magic_prompt)
      ? args.magic_prompt as IdeogramGenerateParams["magic_prompt"]
      : undefined,
    rendering_speed: typeof args.rendering_speed === "string" && ["TURBO", "DEFAULT", "QUALITY"].includes(args.rendering_speed)
      ? args.rendering_speed as IdeogramGenerateParams["rendering_speed"]
      : undefined,
    style_codes: Array.isArray(args.style_codes) ? args.style_codes : undefined,
    style_type: typeof args.style_type === "string" ? args.style_type : undefined,
    negative_prompt: typeof args.negative_prompt === "string" ? args.negative_prompt : undefined,
    num_images: typeof args.num_images === "number" ? args.num_images : undefined,
  };

  // Ideogram 3.0用のスタイルリファレンス機能
  if (args.style_reference && typeof args.style_reference === "object") {
    const styleRef: IdeogramStyleReference = {};
    const styleRefObj = args.style_reference as any;
    if (styleRefObj.urls && Array.isArray(styleRefObj.urls)) {
      styleRef.urls = styleRefObj.urls.slice(0, 3);
    }
    if (typeof styleRefObj.style_code === "string") {
      styleRef.style_code = styleRefObj.style_code;
    }
    if (typeof styleRefObj.random_style === "boolean") {
      styleRef.random_style = styleRefObj.random_style;
    }
    params.style_reference = styleRef;
  }

  // blur_maskオプション受け取り
  const blurMask = args.blur_mask === true;

  const response = await ideogramClient.generateImage(params, outputDir, baseFilename, blurMask);

  return {
    content: [
      {
        type: "text",
        text: `Generated ${response.data.length} image(s):\n${response.data
          .map((img) => `URL: ${img.url}\nSaved to: ${img.filepath}`)
          .join("\n\n")}`
      }
    ]
  };
}