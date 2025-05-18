import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import sharp from 'sharp';
import axios from 'axios';

/**
 * 画像をダウンロードして保存し、必要ならマスク合成でぼかす
 * @param url 画像URL
 * @param id 画像ID
 * @param outputDir 保存先ディレクトリ
 * @param baseFilename ベースファイル名
 * @param blurMask 画像の淵をぼかすかどうか
 * @returns 保存したファイルのパス
 */
export async function downloadAndBlurMaskImage(
  url: string,
  id: string,
  outputDir?: string,
  baseFilename?: string,
  blurMask?: boolean
): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const base = baseFilename || 'ideogram-image';
  const idPart = (typeof id === "string" && id.trim() !== "" && id !== "undefined") ? `_${id}` : "";
  const filename = `${base}_${timestamp}${idPart}.png`;
  const dir = outputDir || path.join(process.cwd(), 'docs');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filepath = path.join(dir, filename);

  // 1. 画像ダウンロード
  await new Promise<void>((resolve, reject) => {
    https.get(url, (response) => {
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });

  // 2. blurMaskオプションがtrueならマスク合成
  if (blurMask) {
    try {
      // マスク画像URL
      const maskUrl = "https://raw.githubusercontent.com/Sunwood-ai-labs/pic-to-header/refs/heads/main/assets/mask.png";
      // マスク画像DL
      const maskResp = await axios.get(maskUrl, { responseType: "arraybuffer" });
      const maskBuffer = Buffer.from(maskResp.data);

      // 入力画像・マスク画像をRGBAでrawバッファ取得
      const inputSharp = sharp(filepath).ensureAlpha();
      const inputMeta = await inputSharp.metadata();
      const width = inputMeta.width!;
      const height = inputMeta.height!;

      // 入力画像RGBA
      const inputRaw = await inputSharp
        .raw()
        .toBuffer();

      // マスク画像をリサイズ・アルファ付きRGBAでraw取得
      const maskRaw = await sharp(maskBuffer)
        .resize(width, height)
        .ensureAlpha()
        .blur(16)
        .raw()
        .toBuffer();

      // 減算合成: 画像のアルファ - (マスクのアルファ * alpha)
      const alpha = 1.0; // Python例と同じ
      const outRaw = Buffer.alloc(inputRaw.length);
      for (let i = 0; i < width * height; i++) {
        // RGBはそのまま
        outRaw[i * 4 + 0] = inputRaw[i * 4 + 0];
        outRaw[i * 4 + 1] = inputRaw[i * 4 + 1];
        outRaw[i * 4 + 2] = inputRaw[i * 4 + 2];
        // アルファ減算
        const origA = inputRaw[i * 4 + 3];
        const maskA = maskRaw[i * 4 + 3];
        let newA = origA - Math.round(maskA * alpha);
        if (newA < 0) newA = 0;
        outRaw[i * 4 + 3] = newA;
      }

      // RGBA rawバッファから画像再構成
      await sharp(outRaw, { raw: { width, height, channels: 4 } })
        .png()
        .toFile(filepath);
    } catch (e) {
      console.error("Blur mask processing failed:", e);
    }
  }

  return filepath;
}