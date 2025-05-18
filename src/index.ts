#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { IdeogramClient, IdeogramGenerateParams, IdeogramStyleReference } from "./ideogram-client.js";

const apiKey = process.env.IDEOGRAM_API_KEY;
if (!apiKey) {
  throw new Error("IDEOGRAM_API_KEY environment variable is required");
}

const ideogramClient = new IdeogramClient(apiKey);

const server = new Server(
  {
    name: "ideagram-mcp-server",
    version: "0.2.0", // v3対応でバージョン更新
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate_image",
        description: "Generate an image using Ideogram AI",
        inputSchema: {
          type: "object",
          properties: {
            prompt: {
              type: "string",
              description: "The prompt to use for generating the image (must be in English)"
            },
            aspect_ratio: {
              type: "string",
              description: "The aspect ratio for the generated image (see official docs for all 15 values)",
              enum: [
                "1x1", "4x3", "3x4", "16x9", "9x16",
                "2x3", "3x2", "5x4", "4x5", "21x9",
                "9x21", "3x1", "1x3", "2x1", "1x2"
              ]
            },
            resolution: {
              type: "string",
              description: "The resolution for the generated image (see official docs for all 69 values)",
            },
            seed: {
              type: "integer",
              description: "Random seed. Set for reproducible generation.",
              minimum: 0,
              maximum: 2147483647
            },
            magic_prompt: {
              type: "string",
              description: "Whether to use magic prompt",
              enum: ["AUTO", "ON", "OFF"]
            },
            rendering_speed: {
              type: "string",
              description: "Rendering speed for v3 (TURBO/DEFAULT/QUALITY)",
              enum: ["TURBO", "DEFAULT", "QUALITY"]
            },
            style_codes: {
              type: "array",
              description: "Array of 8-char style codes",
              items: { type: "string" }
            },
            style_type: {
              type: "string",
              description: "The style type for generation",
              enum: ["AUTO", "GENERAL", "REALISTIC", "DESIGN"]
            },
            style_reference_images: {
              type: "array",
              description: "A set of images to use as style references (max 10MB, JPEG/PNG/WebP)",
              items: { type: "string", format: "binary" }
            },
            negative_prompt: {
              type: "string",
              description: "Description of what to exclude from the image (must be in English)"
            },
            num_images: {
              type: "number",
              description: "Number of images to generate (1-8)",
              minimum: 1,
              maximum: 8
            },
            style_reference: {
              type: "object",
              description: "Style reference options for Ideogram 3.0",
              properties: {
                urls: {
                  type: "array",
                  description: "URLs to reference images for style (max 3)",
                  items: {
                    type: "string"
                  },
                  maxItems: 3
                },
                style_code: {
                  type: "string",
                  description: "Style code to apply (alternative to URLs)"
                },
                random_style: {
                  type: "boolean",
                  description: "Whether to use a random style from Ideogram's library"
                }
              }
            }
          },
          required: ["prompt"]
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "generate_image": {
      const args = request.params.arguments;
      if (!args || typeof args.prompt !== "string") {
        throw new McpError(
          ErrorCode.InvalidParams,
          "Prompt is required and must be a string"
        );
      }

      try {
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
          style_reference_images: Array.isArray(args.style_reference_images) ? args.style_reference_images : undefined,
          negative_prompt: typeof args.negative_prompt === "string" ? args.negative_prompt : undefined,
          num_images: typeof args.num_images === "number" ? args.num_images : undefined,
        };

        // Ideogram 3.0用のスタイルリファレンス機能
        if (args.style_reference && typeof args.style_reference === "object") {
          const styleRef: IdeogramStyleReference = {};
          
          // URLの配列が存在する場合
          const styleRefObj = args.style_reference as any;
          if (styleRefObj.urls && Array.isArray(styleRefObj.urls)) {
            // 最大3つのURLに制限
            styleRef.urls = styleRefObj.urls.slice(0, 3);
          }
          
          // スタイルコードがある場合
          if (typeof styleRefObj.style_code === "string") {
            styleRef.style_code = styleRefObj.style_code;
          }
          
          // ランダムスタイルの設定
          if (typeof styleRefObj.random_style === "boolean") {
            styleRef.random_style = styleRefObj.random_style;
          }
          
          params.style_reference = styleRef;
        }

        const response = await ideogramClient.generateImage(params);

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
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      }
    }

    default:
      throw new McpError(ErrorCode.MethodNotFound, "Unknown tool");
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Ideogram MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
