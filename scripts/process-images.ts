/**
 * Image processing pipeline for page-specific photo assets.
 *
 * Reads source JPGs from each configured folder under public/images/
 * Outputs AVIF + WebP at 4 widths (1920/1280/768/480)
 * Generates base64 LQIP placeholders for blur-up
 * Writes one manifest.json per folder
 *
 * To add a new folder: append a new entry to FOLDERS below.
 *
 * Usage: pnpm tsx scripts/process-images.ts
 */

import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

type FolderConfig = {
  /** Folder slug relative to public/images/, e.g. "about", "the-project", "home" */
  slug: string;
  /** Source JPG filenames within the folder (without path) */
  files: readonly string[];
};

const FOLDERS: readonly FolderConfig[] = [
  {
    slug: 'about',
    files: [
      'hero-storefront.jpg',
      'lobby-wide.jpg',
      'studio-tumbling.jpg',
      'studio-ballet.jpg',
      'trophy-hall.jpg',
      'hallway-benches.jpg',
      'reception-detail.jpg',
    ],
  },
  {
    slug: 'the-project',
    files: [
      'project-class-wall.jpg',
      'project-auditions.jpg',
      'project-auditions-wide.jpg',
      'project-rehearsal-action.jpg',
      'studio-portrait-duo.jpg',
      'studio-portrait-solo.jpg',
      'award-driven-group.jpg',
      'team-hall-of-fame.jpg',
    ],
  },
  {
    slug: 'home',
    files: ['founders-groove-award.jpg'],
  },
];

const WIDTHS = [1920, 1280, 768, 480] as const;
const AVIF_QUALITY = 62;
const WEBP_QUALITY = 78;
const LQIP_WIDTH = 16;

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

async function processImage(
  filename: string,
  folderSlug: string
): Promise<[string, ManifestEntry]> {
  const slug = path.basename(filename, '.jpg');
  const folderDir = path.join(process.cwd(), 'public/images', folderSlug);
  const sourcePath = path.join(folderDir, filename);

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
      .toFile(path.join(folderDir, avifName));

    await image
      .clone()
      .resize(width, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(path.join(folderDir, webpName));

    variants.avif[width] = `/images/${folderSlug}/${avifName}`;
    variants.webp[width] = `/images/${folderSlug}/${webpName}`;

    console.log(`  ✓ ${avifName} + ${webpName}`);
  }

  return [
    slug,
    {
      src: `/images/${folderSlug}/${filename}`,
      width: srcW,
      height: srcH,
      aspectRatio: srcW / srcH,
      placeholder,
      variants,
    },
  ];
}

async function processFolder(config: FolderConfig): Promise<void> {
  const folderDir = path.join(process.cwd(), 'public/images', config.slug);
  const manifestPath = path.join(folderDir, 'manifest.json');

  console.log(`\n━━━ Folder: ${config.slug} ━━━\n`);

  if (!existsSync(folderDir)) {
    await mkdir(folderDir, { recursive: true });
  }

  const manifest: Manifest = {};

  for (const filename of config.files) {
    console.log(`→ ${filename}`);
    const [slug, entry] = await processImage(filename, config.slug);
    manifest[slug] = entry;
    console.log('');
  }

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`✓ ${config.slug}/manifest.json written`);
  console.log(`✓ ${config.files.length} images processed in ${config.slug}/`);
}

async function main() {
  console.log('Processing image folders...');

  for (const config of FOLDERS) {
    await processFolder(config);
  }

  console.log(`\n━━━ Complete ━━━`);
  console.log(`Processed ${FOLDERS.length} folders.`);
}

main().catch((err) => {
  console.error('Processing failed:', err);
  process.exit(1);
});
