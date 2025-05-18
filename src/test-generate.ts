/* eslint-disable no-console */
/// <reference types="node" />

/**
 * Comprehensive test script for IdeogramClient.generateImage().
 * Run with:
 *   $ Env:IDEOGRAM_API_KEY=\"YOUR_KEY\"; npm run build; node build/test-generate.js
 *
 * The script iterates multiple parameter combinations to ensure
 *  – default parameters
 *  – different rendering_speed (TURBO / QUALITY)
 *  – different aspect_ratio
 *  – magic_prompt flag
 *  – multiple images request
 *  – error case (invalid aspect_ratio) to verify graceful failure
 */

import fs from 'fs';
import path from 'path';
import { IdeogramClient } from './ideogram-client.js';

type Case = {
  name: string;
  params: Record<string, unknown>;
  shouldFail?: boolean;
};

const TEST_CASES: Case[] = [
  {
    name: 'default-ok',
    params: { prompt: 'A cute cat wearing sunglasses, digital art' }
  },
  {
    name: 'turbo-ok',
    params: {
      prompt: 'A futuristic neon cityscape, ultra wide',
      model: 'V_3_TURBO'
    }
  },
  {
    name: 'quality-ok',
    params: {
      prompt: 'Oil painting of Mount Fuji at dawn, ultra detail',
      model: 'V_3_QUALITY'
    }
  },
  {
    name: 'ratio-3x1-ok',
    params: {
      prompt: 'Panorama desert sunset with caravan',
      aspect_ratio: '3x1'
    }
  },
  {
    name: 'magic-prompt-on-ok',
    params: {
      prompt: 'Ancient library interior',
      magic_prompt_option: 'ON'
    }
  },
  {
    name: 'multi-image-ok',
    params: {
      prompt: 'Colorful abstract background',
      num_images: 2
    }
  },
  {
    name: 'invalid-ratio-fail',
    params: {
      prompt: 'Should fail',
      aspect_ratio: 'invalid_ratio'
    },
    shouldFail: true
  }
];

(async () => {
  const apiKey = process.env.IDEOGRAM_API_KEY;
  if (!apiKey) {
    console.error('Please set IDEOGRAM_API_KEY environment variable.');
    process.exit(1);
  }

  // Prepare output directory
  const outDir = path.join(process.cwd(), 'generated_test_images');
  fs.mkdirSync(outDir, { recursive: true });

  const client = new IdeogramClient(apiKey, outDir);
  let passed = 0;

  for (const tcase of TEST_CASES) {
    console.log(`\n=== Running case: ${tcase.name} ===`);
    try {
      // @ts-expect-error dynamic params object
      const res = await client.generateImage(tcase.params);
      if (tcase.shouldFail) {
        console.error('❌ Expected failure but succeeded.');
        continue;
      }
      console.log('✅ Success:', res.data.map((d) => d.filepath));
      passed++;
    } catch (err) {
      if (tcase.shouldFail) {
        console.log('✅ Expected failure received:', (err as Error).message);
        passed++;
      } else {
        console.error('❌ Unexpected failure:', err);
      }
    }
  }

  console.log(`\nTest passed ${passed}/${TEST_CASES.length} cases.`);
})();