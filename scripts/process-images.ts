/**
 * Image processing pipeline for About page assets.
 *
 * Reads source JPGs from public/images/about/
 * Outputs AVIF + WebP at 4 widths (1920/1280/768/480)
 * Generates base64 LQIP placeholders for blur-up
 * Writes manifest.json with dimensions + placeholders
 *
 * Usage: pnpm tsx scripts/process-images.ts
 */

import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const SOURCE_DIR = path.join(process.cwd(), 'public/images/about');
const OUTPUT_DIR = path.join(process.cwd(), 'public/images/about');
const MANIFEST_PATH = path.join(process.cwd(), 'public/images/about/manifest.json');

const WIDTHS = [1920, 1280, 768, 480] as const;
const AVIF_QUALITY = 62;
const WEBP_QUALITY = 78;
const LQIP_WIDTH = 16;

const SOURCE_FILES = [
  'hero-storefront.jpg',
  'lobby-wide.jpg',
  'studio-tumbling.jpg',
  'studio-ballet.jpg',
  'trophy-hall.jpg',
  'hallway-benches.jpg',
  'reception-detail.jpg',
] as const;

type ManifestEntry = {
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  placeholder: string;
  variants: {
    avif: Record<number, string>;
    webp: Record<number, string>;
  };
};

type Manifest = Record<string, ManifestEntry>;

async function processImage(filename: string): Promise<[string, ManifestEntry]> {
  const slug = path.basename(filename, '.jpg');
  const sourcePath = path.join(SOURCE_DIR, filename);

  if (!existsSync(sourcePath)) {
    throw new Error(`Source file not found: ${sourcePath}`);
  }

  const image = sharp(sourcePath);
  const metadata = await image.metadata();
  const { width: srcW = 0, height: srcH = 0 } = metadata;

  if (!srcW || !srcH) {
    throw new Error(`Could not read dimensions: ${filename}`);
  }

  const lqipBuffer = await image
    .clone()
    .resize(LQIP_WIDTH, null, { fit: 'inside' })
    .webp({ quality: 50 })
    .toBuffer();
  const placeholder = `data:image/webp;base64,${lqipBuffer.toString('base64')}`;

  const variants: ManifestEntry['variants'] = { avif: {}, webp: {} };

  for (const width of WIDTHS) {
    if (width > srcW) continue;

    const avifName = `${slug}-${width}.avif`;
    const webpName = `${slug}-${width}.webp`;

    await image
      .clone()
      .resize(width, null, { fit: 'inside', withoutEnlargement: true })
      .avif({ quality: AVIF_QUALITY, effort: 6 })
      .toFile(path.join(OUTPUT_DIR, avifName));

    await image
      .clone()
      .resize(width, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(path.join(OUTPUT_DIR, webpName));

    variants.avif[width] = `/images/about/${avifName}`;
    variants.webp[width] = `/images/about/${webpName}`;

    console.log(`  ✓ ${avifName} + ${webpName}`);
  }

  return [
    slug,
    {
      src: `/images/about/${filename}`,
      width: srcW,
      height: srcH,
      aspectRatio: srcW / srcH,
      placeholder,
      variants,
    },
  ];
}

async function main() {
  console.log('Processing About page images...\n');

  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  const manifest: Manifest = {};

  for (const filename of SOURCE_FILES) {
    console.log(`→ ${filename}`);
    const [slug, entry] = await processImage(filename);
    manifest[slug] = entry;
    console.log('');
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log(`✓ Manifest written: ${MANIFEST_PATH}`);
  console.log(`✓ ${SOURCE_FILES.length} images processed\n`);
}

main().catch((err) => {
  console.error('Processing failed:', err);
  process.exit(1);
});
