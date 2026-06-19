import manifest from '@/public/images/about/manifest.json'

export type AboutImageSlug =
  | 'hero-storefront'
  | 'lobby-wide'
  | 'studio-tumbling'
  | 'studio-ballet'
  | 'trophy-hall'
  | 'hallway-benches'
  | 'reception-detail'

export type AboutImage = {
  src: string
  width: number
  height: number
  aspectRatio: number
  placeholder: string
}

export function getAboutImage(slug: AboutImageSlug): AboutImage {
  const entry = manifest[slug as keyof typeof manifest]
  if (!entry) {
    throw new Error(`About image not found in manifest: ${slug}`)
  }
  return {
    src: entry.src,
    width: entry.width,
    height: entry.height,
    aspectRatio: entry.aspectRatio,
    placeholder: entry.placeholder,
  }
}
