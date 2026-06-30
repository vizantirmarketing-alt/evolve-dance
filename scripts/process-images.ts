// Generates manifest.json for each image folder. Source JPGs are NOT modified.
// Responsive delivery + format negotiation handled by next/image at runtime
// via Vercel image optimization. No pre-generated AVIF/WebP variants needed.

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
      'studio-portrait-duo.jpg',
      'studio-portrait-solo.jpg',
      'award-driven-group.jpg',
      'team-hall-of-fame.jpg',
      'what-it-is-masterclass.jpg',
      'what-it-takes-leap.jpg',
    ],
  },
  {
    slug: 'home',
    files: ['founders-groove-award.jpg'],
  },
];

const LQIP_WIDTH = 16;

type ManifestEntry = {
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  placeholder: string;
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

  return [
    slug,
    {
      src: `/images/${folderSlug}/${filename}`,
      width: srcW,
      height: srcH,
      aspectRatio: srcW / srcH,
      placeholder,
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
    console.log(`  ✓ manifest entry for ${slug}`);
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
