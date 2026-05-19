import { siteConfig } from '@/data/site'
import { getFeaturedTestimonials } from '@/sanity/lib/queries'
import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import TestimonialsHero from '@/components/sections/TestimonialsHero'

export default async function TestimonialsSection() {
  const featuredTestimonials = await getFeaturedTestimonials()

  if (featuredTestimonials.length === 0) return null

  return (
    <section className="bg-[#D4F1EF] px-4 py-20 md:px-12 md:py-32">
      <RevealOnScroll>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-7 bg-[#0ABAB5] opacity-100" />
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#0ABAB5] opacity-100 md:text-[12px]">
            {siteConfig.reviewsLabel}
          </span>
        </div>
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <>
          <h2
            className="font-display mb-4 mt-4 max-w-3xl font-bold text-[#1F1F1C]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1' }}
          >
            What families love about Evolve —{' '}
            <span
              className="italic text-[#0ABAB5]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', lineHeight: '1' }}
            >
              Reviews
            </span>
          </h2>
          <p className="mb-12 max-w-2xl text-[15px] font-light leading-[1.75] text-[#6D6C67] md:mb-14 md:text-[16px]">
            {siteConfig.reviewsIntro}
          </p>
        </>
      </RevealOnScroll>

      <RevealOnScroll delay={200}>
        <TestimonialsHero testimonials={featuredTestimonials} />
      </RevealOnScroll>
    </section>
  )
}
