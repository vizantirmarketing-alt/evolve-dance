import { siteConfig } from '@/data/site'
import { getFeaturedTestimonials } from '@/sanity/lib/queries'
import { RevealOnScroll } from '@/components/sections/RevealOnScroll'
import TestimonialsHero from '@/components/sections/TestimonialsHero'

export default async function TestimonialsSection() {
  const featuredTestimonials = await getFeaturedTestimonials()

  if (featuredTestimonials.length === 0) return null

  return (
    <section className="bg-[#D4F1EF] px-4 py-12 md:px-12 md:py-32">
      <RevealOnScroll>
        <div className="mb-3 flex items-center gap-3 md:mb-6">
          <div className="h-px w-7 bg-[#0ABAB5] opacity-100" />
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#0ABAB5] opacity-100 md:text-[12px]">
            {siteConfig.reviewsLabel}
          </span>
        </div>
      </RevealOnScroll>
      <RevealOnScroll delay={100}>
        <>
          <h2 className="font-display mb-3 max-w-3xl font-bold leading-none text-[#1F1F1C] text-[26px] md:mb-4 md:mt-4 md:text-[clamp(28px,3.5vw,42px)]">
            What families love about Evolve —{' '}
            <span className="italic text-[#0ABAB5]">Reviews</span>
          </h2>
          <p className="mb-6 max-w-2xl text-[15px] font-light leading-snug text-[#6D6C67] md:mb-14 md:text-[16px] md:leading-[1.75]">
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
