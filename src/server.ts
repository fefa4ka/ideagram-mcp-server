import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { IdeogramClient } from "./ideogram-client.js";
import { generateImageInputSchema } from "./tools/generateImageSchema.js";
import { generateImageHandler } from "./tools/generateImageHandler.js";

export function createServer(apiKey: string) {
  const ideogramClient = new IdeogramClient(apiKey);

  const server = new Server(
    {
      name: "ideagram-mcp-server",
      version: "0.2.0",
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
          inputSchema: generateImageInputSchema
        }
      ]
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    switch (request.params.name) {
      case "generate_image":
        return await generateImageHandler(ideogramClient, request.params.arguments);
      default:
        throw new McpError(ErrorCode.MethodNotFound, "Unknown tool");
    }
  });

  return server;
}

export async function runServer(apiKey: string) {
  const server = createServer(apiKey);
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Ideogram MCP server running on stdio");
}