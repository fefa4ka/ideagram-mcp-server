import { IdeogramClient } from "./ideogram-client.js";

async function main() {
  const apiKey = process.env.IDEOGRAM_API_KEY;
  if (!apiKey) {
    console.error("IDEOGRAM_API_KEY is not set");
    process.exit(1);
  }

  const client = new IdeogramClient(apiKey);
  const params = {
    prompt: "A cute cat wearing sunglasses, digital art"
  };

  try {
    const result = await client.generateImage(params);
    console.log("Test Success! Generated images:", result.data.map(d => d.filepath));
  } catch (err) {
    console.error("Test Failed:", err);
    process.exit(1);
  }
}

main();