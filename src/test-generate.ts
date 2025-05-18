import { IdeogramClient } from './ideogram-client';

(async () => {
  const apiKey = process.env.IDEOGRAM_API_KEY;
  if (!apiKey) {
    console.error('Please set IDEOGRAM_API_KEY environment variable.');
    process.exit(1);
  }

  const client = new IdeogramClient(apiKey);

  try {
    const res = await client.generateImage({
      prompt: 'A cute kitten playing with yarn, digital illustration'
    });
    console.log('Generation succeeded:', JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Generation failed:', err);
    process.exit(1);
  }
})();