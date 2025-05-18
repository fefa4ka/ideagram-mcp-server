export const generateImageInputSchema = {
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
};