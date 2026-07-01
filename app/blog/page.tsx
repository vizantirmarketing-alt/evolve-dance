import type { Metadata } from 'next'
import Link from 'next/link'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { getPublishedPosts, type BlogPost } from '@/sanity/lib/queries'

export const revalidate = 300

const JOURNAL_DESCRIPTION =
  'Stories, studio news, and dance insights from Evolve Dance Center — a Las Vegas dance studio for dancers ages 18 months to 18 years.'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Dance Studio Journal',
    description: JOURNAL_DESCRIPTION,
    alternates: { canonical: '/blog' },
    robots: { index: true, follow: true },
  }
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

function PostCard({ post }: { post: BlogPost }) {
  const slug = post.slug?.current
  if (!slug) return null

  const category = post.categories?.[0]?.title

  return (
    <li>
      <Link
        href={`/blog/${slug}`}
        className="group flex h-full flex-col border border-border bg-background-warm p-6 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-md md:p-7"
      >
        <div className="flex flex-1 flex-col">
          {category ? (
            <span className="mb-3 inline-flex w-fit rounded-sm border border-teal/35 bg-background px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-teal-hover">
              {category}
            </span>
          ) : null}

          <h2 className="font-display text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-teal-hover">
            {post.title}
          </h2>

          {post.excerpt ? (
            <p className="mt-3 line-clamp-3 font-sans text-[14px] leading-[1.75] text-foreground/70 md:text-[15px]">
              {post.excerpt}
            </p>
          ) : null}

          {post.publishedAt ? (
            <time
              dateTime={post.publishedAt}
              className="mt-5 pt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-foreground-muted md:text-[12px]"
            >
              {formatPublishedDate(post.publishedAt)}
            </time>
          ) : null}
        </div>
      </Link>
    </li>
  )
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-7 bg-teal" />
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal-hover md:text-[12px]">
              Journal
            </span>
          </div>

          <div className="max-w-3xl">
            <h1
              className="font-display font-bold text-foreground"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: '0.95' }}
            >
              Journal
            </h1>
            <p className="mt-6 max-w-xl text-[15px] font-light leading-[1.75] text-foreground-muted md:text-[16px]">
              Studio news, technique notes, and writing on dance from southwest Las Vegas.
            </p>
          </div>

          <div className="mt-14 md:mt-16">
            {posts.length === 0 ? (
              <div className="mx-auto max-w-md rounded-lg border border-border bg-background-warm px-8 py-12 text-center">
                <p className="text-[13px] leading-relaxed text-foreground-muted md:text-[14px]">
                  New posts coming soon.
                </p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10">
                {posts
                  .filter((post) => Boolean(post.slug?.current))
                  .map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
