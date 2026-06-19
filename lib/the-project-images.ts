import manifest from '@/public/images/the-project/manifest.json'

export type TheProjectImageSlug =
  | 'project-class-wall'
  | 'project-auditions'
  | 'project-auditions-wide'
  | 'project-rehearsal-action'
  | 'studio-portrait-duo'
  | 'studio-portrait-solo'
  | 'award-driven-group'
  | 'team-hall-of-fame'

export type TheProjectImage = {
  src: string
  width: number
  height: number
  aspectRatio: number
  placeholder: string
}

export function getTheProjectImage(slug: TheProjectImageSlug): TheProjectImage {
  const entry = manifest[slug as keyof typeof manifest]
  if (!entry) {
    throw new Error(`The Project image not found in manifest: ${slug}`)
  }
  return {
    src: entry.src,
    width: entry.width,
    height: entry.height,
    aspectRatio: entry.aspectRatio,
    placeholder: entry.placeholder,
  }
}
