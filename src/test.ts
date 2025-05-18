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
    // デフォルト保存先・ファイル名
    const result = await client.generateImage(params);
    console.log("Result full:", result); // 返り血（返り値）の中身も全部表示！ギャルチェック✨
    console.log("Test Success! Generated images:", result.data.map(d => d.filepath));

    // 保存先・ファイル名を指定したパターン
    const customDir = "images";
    const customBase = "my-cat";
    const resultCustom = await client.generateImage(
      params,
      customDir,
      customBase
    );
    console.log("Result (custom dir/name):", resultCustom);
    console.log(
      `Test Success! Custom saved images:`,
      resultCustom.data.map(d => d.filepath)
    );

    // 横長＋blur_maskテスト
    const wideParams = {
      prompt: "A beautiful panoramic landscape, digital art, magic cat, text 'Ideogram MCP Server'",
      aspect_ratio: "16x9"
    };
    const resultWideBlur = await client.generateImage(
      wideParams,
      undefined,
      undefined,
      true // blur_mask ON
    );
    console.log("Result (wide + blur):", resultWideBlur);
    console.log(
      `Test Success! Wide blurred images:`,
      resultWideBlur.data.map(d => d.filepath)
    );
  } catch (err) {
    console.error("Test Failed:", err);
    process.exit(1);
  }
}

main();