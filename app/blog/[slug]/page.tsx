import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextComponents } from '@portabletext/react'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { urlFor } from '@/sanity/lib/image'
import {
  getAllPostSlugs,
  getPostBySlug,
  type BlogPost,
  type PortableTextBlock,
  type SanityImage,
} from '@/sanity/lib/queries'

export const revalidate = 300

type PageProps = {
  params: Promise<{ slug: string }>
}

function formatPublishedDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function coverImageUrl(post: BlogPost): string | undefined {
  if (!post.coverImage?.asset?._id) return undefined
  return urlFor(post.coverImage).width(1600).height(900).fit('crop').quality(90).auto('format').url()
}

function portableImageUrl(image: SanityImage): string {
  return urlFor(image).width(1200).quality(85).auto('format').url()
}

const bodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 font-sans text-[15px] leading-[1.85] text-foreground-muted md:text-[16px]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-5 mt-12 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-10 font-display text-2xl font-bold leading-snug text-foreground md:text-3xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-teal py-1 pl-6 font-display text-xl italic leading-relaxed text-foreground md:text-2xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 font-sans text-[15px] leading-[1.85] text-foreground-muted md:text-[16px]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 font-sans text-[15px] leading-[1.85] text-foreground-muted md:text-[16px]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '#'
      const isExternal = href.startsWith('http')

      return (
        <a
          href={href}
          className="font-medium text-teal underline decoration-teal/40 underline-offset-4 transition-colors hover:text-teal-hover"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._id) return null

      const src = portableImageUrl(value as SanityImage)
      const alt = (value as SanityImage).alt?.trim() || ''

      return (
        <figure className="my-10">
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-background-warm">
            <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
          </div>
        </figure>
      )
    },
  },
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.filter(Boolean).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const description = post.seoDescription?.trim() || post.excerpt?.trim() || undefined

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    robots: { index: true, follow: true },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const heroSrc = coverImageUrl(post)
  const heroAlt = post.coverImage?.alt?.trim() || post.title
  const imageUrl = heroSrc
  const body = (post.body ?? []) as PortableTextBlock[]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    ...(imageUrl ? { image: imageUrl } : {}),
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Evolve Dance Center',
    },
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background pb-24 pt-24 md:pb-28 md:pt-28">
        <article>
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-7 bg-teal" />
              <Link
                href="/blog"
                className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal transition-colors hover:text-teal-hover md:text-[12px]"
              >
                Journal
              </Link>
            </div>

            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden border border-border bg-background-warm">
              {heroSrc ? (
                <Image
                  src={heroSrc}
                  alt={heroAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-[12px] uppercase tracking-[0.15em] text-foreground-muted">Journal</span>
                </div>
              )}
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-6">
            <header className="mb-10 border-b border-border pb-10">
              <h1
                className="font-display font-bold text-foreground"
                style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: '1.05' }}
              >
                {post.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                {post.publishedAt ? (
                  <time
                    dateTime={post.publishedAt}
                    className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground-muted md:text-[12px]"
                  >
                    {formatPublishedDate(post.publishedAt)}
                  </time>
                ) : null}

                {post.categories && post.categories.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category) => (
                      <span
                        key={category._id}
                        className="inline-flex rounded-sm border border-teal/35 bg-background px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-teal"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                ) : null}

                {post.tags && post.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground-muted md:text-[12px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </header>

            {body.length > 0 ? (
              <div className="prose-evolve">
                <PortableText value={body} components={bodyComponents} />
              </div>
            ) : null}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
