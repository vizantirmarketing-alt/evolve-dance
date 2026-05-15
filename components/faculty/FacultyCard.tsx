import Image from 'next/image'

import { cn } from '@/lib/utils'
import type { Faculty } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

function initialFromName(name: string) {
  const t = name.trim()
  return t ? t.charAt(0).toUpperCase() : '?'
}

export default function FacultyCard({ faculty }: { faculty: Faculty }) {
  const { name, role, specialties, photo } = faculty

  const hasImage = Boolean(photo?.asset?._id)
  const src = hasImage && photo ? urlFor(photo).width(720).height(900).fit('crop').quality(85).auto('format').url() : null
  const alt = (photo?.alt?.trim() || `Photo of ${name}`) as string

  const tags = (specialties ?? []).map((s) => s.trim()).filter(Boolean)

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-background-warm shadow-sm',
        'transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-md',
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-border">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center font-display text-[clamp(3rem,12vw,5rem)] font-bold text-teal/20"
            aria-hidden
          >
            {initialFromName(name)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-display text-lg font-bold leading-snug text-foreground md:text-xl">{name}</h2>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-teal">{role}</p>

        {tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Specialties">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-sm border border-teal/35 bg-background px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/80"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}
