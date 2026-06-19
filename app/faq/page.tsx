import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { getPublishedFaqs } from '@/sanity/lib/queries'

export const revalidate = 300

export default async function FaqPage() {
  const faqs = await getPublishedFaqs()

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <main className="flex-1 bg-background pb-24 pt-24 md:pb-28 md:pt-28">
        <section className="px-6 md:px-16 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-7 bg-teal" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal md:text-[12px]">FAQ</span>
            </div>

            <div className="max-w-3xl">
              <h1 className="font-display font-bold text-foreground">
                <span style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: '0.95' }}>Frequently asked </span>
                <span className="italic text-teal" style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: '0.95' }}>
                  questions
                </span>
                <span style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: '0.95' }}>.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[15px] font-light leading-[1.75] text-foreground-muted md:text-[16px]">
                Common questions about classes, enrollment, and studio policies.
              </p>
            </div>

            <div className="mt-14 md:mt-16">
              {faqs.length === 0 ? (
                <div className="mx-auto max-w-md rounded-lg border border-border bg-background-warm px-8 py-12 text-center">
                  <p className="text-[13px] leading-relaxed text-foreground-muted md:text-[14px]">FAQ content coming soon.</p>
                </div>
              ) : (
                <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
                  {faqs.map((item) => (
                    <article key={item._id} className="py-8 first:pt-0 last:pb-0">
                      {item.category ? (
                        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-teal md:text-[12px]">{item.category}</p>
                      ) : null}
                      <h2 className="font-display text-xl font-bold leading-snug text-foreground md:text-2xl">{item.question}</h2>
                      <p className="mt-4 whitespace-pre-wrap text-[14px] leading-[1.75] text-foreground-muted md:text-[15px]">{item.answer}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
