import manifest from '@/public/images/the-project/manifest.json'

export type TheProjectImageSlug =
  | 'project-class-wall'
  | 'project-auditions'
  | 'project-auditions-wide'
  | 'studio-portrait-solo'
  | 'award-driven-group'
  | 'team-groove-winner'
  | 'team-hall-of-fame'
  | 'what-it-is-masterclass'
  | 'what-it-takes-leap'

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
