import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

export const revalidate = 300

/*
 * TODO (Sanity): No blog/post document type is registered in sanity/schemas yet.
 * When one exists:
 * - Add a published posts query in sanity/lib/queries.ts and a fetch helper.
 * - Below the hero, branch like FAQ: if posts.length === 0 keep this empty state;
 *   else render a list from query results (title, slug, dates, excerpt, etc.).
 * - No app/blog/[slug] until post routes are scoped separately.
 */

export default async function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pb-24 pt-24 md:pb-28 md:pt-28">
        <section className="px-6 md:px-16 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-7 bg-teal" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal md:text-[12px]">BLOG</span>
            </div>

            <div className="max-w-3xl">
              <h1 className="font-display font-bold text-foreground">
                <span style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: '0.95' }}>The </span>
                <span className="italic text-teal" style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: '0.95' }}>
                  journal
                </span>
                <span style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: '0.95' }}>.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[15px] font-light leading-[1.75] text-foreground-muted md:text-[16px]">
                Studio news, technique notes, and writing on dance.
              </p>
            </div>

            <div className="mt-14 md:mt-16">
              <div className="mx-auto max-w-md rounded-lg border border-border bg-background-warm px-8 py-12 text-center">
                <p className="text-[13px] leading-relaxed text-foreground-muted md:text-[14px]">Posts coming soon.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
