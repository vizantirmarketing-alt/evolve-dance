import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { getPolicyPage, type PortableTextBlock, type PolicyPage } from '@/sanity/lib/queries'

import { PoliciesFallback } from './policies-fallback'
import { formatPolicyLastUpdated, policyBodyComponents } from './policy-portable-text'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Studio Policies | Evolve Dance Center',
  description:
    'Tuition, attendance, dress code, recital, and studio policies for families enrolled at Evolve Dance Center in Las Vegas.',
  alternates: { canonical: '/policies' },
  openGraph: {
    title: 'Studio Policies | Evolve Dance Center',
    description:
      'Tuition, attendance, dress code, recital, and studio policies for families enrolled at Evolve Dance Center in Las Vegas.',
    url: '/policies',
  },
  robots: {
    index: true,
    follow: true,
  },
}

function hasPolicyContent(data: PolicyPage | null): data is PolicyPage {
  return Boolean(
    data?.title?.trim() &&
      data?.intro?.trim() &&
      data?.lastUpdated &&
      Array.isArray(data.sections) &&
      data.sections.length > 0,
  )
}

function PoliciesFromSanity({ data }: { data: PolicyPage }) {
  const lastUpdated = formatPolicyLastUpdated(data.lastUpdated)

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-background px-4 pb-32 pt-24 md:px-12 md:pt-28">
        <div className="mx-auto max-w-prose">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-7 bg-teal opacity-100" />
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal opacity-100 md:text-[12px]">
              Studio Policies
            </span>
          </div>

          <div className="mb-12">
            <h1
              className="font-display font-bold leading-none text-foreground"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
            >
              {data.title}
            </h1>
            <p className="mt-3 text-[13px] font-light tracking-wide text-foreground-muted md:text-[14px]">
              Last updated: {lastUpdated}
            </p>
            <p className="mt-6 text-[15px] font-light leading-[1.8] text-foreground-muted md:text-[16px]">
              {data.intro}
            </p>
          </div>

          <article className="font-sans">
            {data.sections?.map((section) => (
              <section key={section.heading}>
                <h2 className="mt-12 font-display text-2xl font-bold text-foreground md:text-3xl">
                  {section.heading}
                </h2>
                <PortableText
                  value={(section.body ?? []) as PortableTextBlock[]}
                  components={policyBodyComponents}
                />
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default async function PoliciesPage() {
  const policyPage = await getPolicyPage()

  if (hasPolicyContent(policyPage)) {
    return <PoliciesFromSanity data={policyPage} />
  }

  return <PoliciesFallback />
}
