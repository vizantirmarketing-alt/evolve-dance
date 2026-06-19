'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import type { FacultyForPage } from '@/sanity/lib/queries'

const T = {
  bg:         '#F7F5F1',
  bgPanel:    '#FCFBF8',
  bgMint:     '#D4F1EF',
  ink:        '#1F1F1C',
  inkDim:     '#6D6C67',
  mute:       '#A8A39C',
  hairline:   '#D6DFDA',
  accent:     '#0ABAB5',
  accentDeep: '#087876',
  accentSoft: '#81D8D0',
} as const

// Detect director by role text (no separate flag in schema; matches "Director" anywhere in role)
function isDirector(member: FacultyForPage): boolean {
  return /director/i.test(member.role ?? '')
}

// Split single name field into first/last for the display treatment
function splitName(name: string): { first: string; last: string } {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return { first: parts[0], last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

function nameToHue(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return ((h % 360) + 360) % 360
}

function creditFromSpecialties(specialties: string[] | null): string {
  if (!specialties || specialties.length === 0) return ''
  return specialties.join(' · ')
}

function Portrait({ member, big = false }: { member: FacultyForPage; big?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [10, -10])

  const { first } = splitName(member.name)
  const hue = nameToHue(member._id)
  const hotspot = member.photo?.hotspot
  // Sanity hotspot (when set in Studio) takes precedence. Otherwise
  // default to 50% 25% — keeps eyes in the upper-third sweet spot for
  // portrait photos cropped to 4:5, where faces typically sit higher.
  const objectPosition = hotspot
    ? `${hotspot.x * 100}% ${hotspot.y * 100}%`
    : '50% 25%'

  return (
    <div
      ref={ref}
      style={{
        position: 'relative', width: '100%', aspectRatio: '480 / 900', overflow: 'hidden',
        background: member.photo ? T.bgPanel : `radial-gradient(120% 80% at 50% 0%, hsl(${hue} 30% 92% / 0.85), transparent 70%), radial-gradient(60% 50% at 50% 0%, ${T.accentSoft}40, transparent 75%), linear-gradient(180deg, ${T.bgPanel}, ${T.bgMint})`,
      }}
    >
      {member.photo ? (
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            y: big ? 0 : y,
          }}
        >
          <Image
            src={member.photo.url}
            alt={member.photo.alt || member.name}
            fill
            placeholder={member.photo.lqip ? 'blur' : 'empty'}
            blurDataURL={member.photo.lqip}
            sizes={big ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 20vw, 50vw'}
            style={{ objectFit: 'cover', objectPosition }}
          />
        </motion.div>
      ) : (
        <>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          className="font-display"
          style={{
            fontSize: big ? 'clamp(120px, 12vw, 180px)' : 'clamp(80px, 9vw, 140px)',
            color: T.accentDeep, opacity: 0.28,
            fontWeight: 400, lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          {first[0]}
        </div>
      </div>
      <div style={{
        position: 'absolute', inset: '0 0 auto 0', height: '40%',
        pointerEvents: 'none',
        background: `radial-gradient(50% 100% at 50% 0%, ${T.accentSoft}33, transparent 70%)`,
      }} />
        </>
      )}
    </div>
  )
}

function Card({
  member,
  onOpen,
  index = 0,
  isDirector: isDirectorCard = false,
}: {
  member: FacultyForPage
  onOpen: (id: string) => void
  index?: number
  isDirector?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const { first, last } = splitName(member.name)
  const credit = creditFromSpecialties(member.specialties)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.5),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        type="button"
        onClick={() => onOpen(member._id)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        style={{
          display: 'block', width: '100%', textAlign: 'left',
          background: 'transparent', border: 'none', padding: 0,
          cursor: 'pointer', fontFamily: 'inherit',
          position: 'relative',
        }}
      >
      <div
        style={{
          position: 'relative',
          background: T.bgPanel,
          overflow: 'hidden',
          boxShadow: hovered
            ? [
                '0 4px 8px rgba(31,31,28,0.06)',
                '0 24px 56px rgba(31,31,28,0.14)',
                `0 0 0 1px ${T.accent}55`,
                `0 0 16px 2px ${T.accent}40`,
                `0 0 40px 8px ${T.accent}30`,
                `0 0 80px 20px ${T.accent}1A`,
              ].join(', ')
            : '0 1px 2px rgba(31,31,28,0.04), 0 8px 24px rgba(31,31,28,0.05)',
          transition: 'box-shadow 400ms cubic-bezier(0.22, 1, 0.36, 1), transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', willChange: 'transform' }}
        >
          <Portrait member={member} />
        </motion.div>
      </div>
      <div style={{ paddingTop: 16 }}>
        {member.role && isDirectorCard && (
          <div style={{
            fontSize: isDirectorCard ? 12 : 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: isDirectorCard ? '0.28em' : '0.22em',
            color: T.accentDeep,
            marginBottom: isDirectorCard ? 8 : 6,
          }}>
            {member.role}
          </div>
        )}
        <h3
          className="font-display"
          style={{
            fontSize: isDirectorCard ? 28 : 19,
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            margin: 0, color: T.ink, fontWeight: 400,
          }}
        >
          <span style={{ fontWeight: 700 }}>{first}</span>
          {last && (
            <>{' '}<span style={{ fontStyle: 'italic', opacity: 0.78 }}>{last}</span></>
          )}
        </h3>
        {credit && (
          <div style={{ position: 'relative', display: 'inline-block', marginTop: 4 }}>
            <div style={{
              fontSize: isDirectorCard ? 14 : 12,
              fontWeight: 500,
              color: T.accentDeep,
              letterSpacing: '0.01em',
            }}>
              {credit}
            </div>
            <motion.div
              animate={{ scaleX: hovered ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute', left: 0, right: 0, bottom: -2,
                height: 1, background: T.accent,
                transformOrigin: 'left',
              }}
            />
          </div>
        )}
      </div>
      </button>
    </motion.div>
  )
}

function Modal({ member, onClose, isDesktop }: {
  member: FacultyForPage
  onClose: () => void
  isDesktop: boolean
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  const { first, last } = splitName(member.name)
  const credit = creditFromSpecialties(member.specialties)
  const isDir = isDirector(member)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="instructor-modal-name"
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(31, 31, 28, 0.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: isDesktop ? 32 : 16,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 980,
          maxHeight: isDesktop ? '88vh' : '92vh',
          background: T.bg,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          boxShadow: '0 24px 80px rgba(31,31,28,0.30)',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 5,
            width: 40, height: 40, borderRadius: 999,
            background: T.bg,
            border: `1px solid ${T.hairline}`,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: T.ink,
            transition: 'background 200ms, transform 200ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = T.bgMint
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = T.bg
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-30%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: isDesktop ? '34%' : '100%',
            flexShrink: 0,
            background: T.bgPanel,
          }}
        >
          <Portrait member={member} big />
        </motion.div>

        <motion.div
          initial={{ x: '40%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '20%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          style={{
            flex: 1,
            padding: isDesktop ? '56px 56px 48px 56px' : '32px 28px',
            overflowY: 'auto',
          }}
        >
          {isDir && (
            <div style={{
              fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.32em',
              color: T.accentDeep,
              marginBottom: 16,
            }}>
              {member.role}
            </div>
          )}
          <h2
            id="instructor-modal-name"
            className="font-display"
            style={{
              fontSize: isDesktop ? 52 : 36,
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              margin: 0, color: T.ink, fontWeight: 400,
            }}
          >
            <span style={{ fontWeight: 700 }}>{first}</span>
            {last && (
              <>{' '}<span style={{ fontStyle: 'italic', opacity: 0.78 }}>{last}</span></>
            )}
          </h2>
          {credit && (
            <div style={{
              marginTop: 12,
              fontSize: isDesktop ? 16 : 14,
              fontWeight: 500,
              color: T.accentDeep,
              letterSpacing: '0.01em',
            }}>
              {credit}
            </div>
          )}
          {member.bio && member.bio.length > 0 && (
            <>
              <div style={{ marginTop: 28, height: 1, background: T.hairline }} />
              <div
                style={{
                  marginTop: 28,
                  fontSize: isDesktop ? 16 : 15,
                  lineHeight: 1.7,
                  color: T.inkDim,
                }}
              >
                <PortableText
                  value={member.bio}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p style={{ margin: '0 0 1.2em 0' }}>{children}</p>
                      ),
                    },
                  }}
                />
              </div>
            </>
          )}
          {member.role && /director/i.test(member.role) && (
            <div style={{ marginTop: 32 }}>
              <Link
                href={`/about#${member.slug.current}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  color: T.accentDeep,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  borderBottom: `1px solid ${T.accent}`,
                  paddingBottom: 4,
                  textDecoration: 'none',
                }}
              >
                Read the full story
                <span aria-hidden style={{ fontSize: 14 }}>→</span>
              </Link>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function SectionLabel({ children, count }: { children: React.ReactNode; count: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        paddingBottom: 32,
      }}
    >
      <span style={{
        fontSize: 11, textTransform: 'uppercase',
        fontWeight: 700, letterSpacing: '0.32em',
        color: T.accentDeep,
      }}>
        {children}
      </span>
      <motion.span
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: { scaleX: 1, opacity: 1 },
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          flex: 1, height: 1, background: T.hairline,
          transformOrigin: 'left',
        }}
      />
      <motion.span
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{
          fontSize: 11, color: T.mute,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.1em',
        }}
      >
        {String(count).padStart(2, '0')}
      </motion.span>
    </motion.div>
  )
}

function AnimatedHeadline({ isDesktop }: { isDesktop: boolean }) {
  const letters1 = 'The'.split('')
  const letters2 = 'Faculty'.split('')

  return (
    <motion.h1
      className="font-display"
      suppressHydrationWarning
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.045, delayChildren: 0.2 } },
      }}
      style={{
        fontSize: isDesktop ? 88 : 56,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        margin: 0,
        paddingBottom: '0.15em',
        fontWeight: 400,
        color: T.ink,
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {letters1.map((c, i) => (
        <motion.span
          key={`a-${i}`}
          variants={{
            hidden: { opacity: 0, y: '60%' },
            visible: { opacity: 1, y: '0%' },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', fontWeight: 700 }}
        >
          {c}
        </motion.span>
      ))}
      <span style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
      {letters2.map((c, i) => (
        <motion.span
          key={`b-${i}`}
          variants={{
            hidden: { opacity: 0, y: '60%' },
            visible: { opacity: 1, y: '0%' },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', fontStyle: 'italic', fontWeight: 400 }}
        >
          {c}
        </motion.span>
      ))}
    </motion.h1>
  )
}

const DANCE_STYLES = 'Ballet · Jazz · Hip Hop · Contemporary · Lyrical · Acrobatics · Tap · Tumbling · Ballroom · Stretch & Pilates · Pom · Combo'

function Marquee() {
  return (
    <div
      aria-hidden
      style={{
        width: '100%', overflow: 'hidden',
        padding: '40px 0',
        borderTop: `1px solid ${T.hairline}`,
        borderBottom: `1px solid ${T.hairline}`,
        background: T.bgPanel,
        margin: '24px 0',
      }}
    >
      <motion.div
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        style={{
          display: 'flex', whiteSpace: 'nowrap',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="font-display"
            style={{
              fontSize: 22, fontStyle: 'italic',
              color: T.ink, fontWeight: 400,
              paddingRight: 32,
            }}
          >
            {DANCE_STYLES} ·{' '}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function FacultyStage({ faculty }: { faculty: FacultyForPage[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const onChange = () => setIsDesktop(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const directors = faculty.filter(isDirector)
  const regular = faculty.filter((f) => !isDirector(f))
  const active = activeId ? faculty.find((f) => f._id === activeId) ?? null : null
  const close = useCallback(() => setActiveId(null), [])

  if (faculty.length === 0) {
    return (
      <div style={{
        minHeight: '60vh', background: T.bg, color: T.inkDim,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        Faculty roster coming soon.
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.ink }}>
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: isDesktop ? '0 64px' : '0 24px',
      }}>
        <header style={{
          position: 'relative',
          paddingTop: isDesktop ? 160 : 112,
          paddingBottom: isDesktop ? 64 : 48,
          maxWidth: 720,
        }}>
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
          >
            <div style={{ height: 1, width: 28, background: T.accent }} />
            <span style={{
              fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: T.accentDeep,
            }}>
              Evolve Dance Center
            </span>
          </motion.div>
          <AnimatedHeadline isDesktop={isDesktop} />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              zIndex: 1,
              marginTop: 24,
              fontSize: isDesktop ? 18 : 16,
              lineHeight: 1.55,
              color: T.inkDim,
              maxWidth: 560,
            }}
          >
            Working Strip professionals, conservatory-trained company members, and competitive choreographers — teaching the next generation in Las Vegas. Tap any name to read more.
          </motion.p>
        </header>

        {directors.length > 0 && (
          <section style={{ paddingBottom: isDesktop ? 80 : 56 }}>
            <SectionLabel count={directors.length}>Directors</SectionLabel>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? 'repeat(2, minmax(0, 1fr))' : 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: isDesktop ? 40 : 20,
              maxWidth: isDesktop ? '52%' : '100%',
            }}>
              {directors.map((d, idx) => (
                <Card key={d._id} member={d} onOpen={setActiveId} index={idx} isDirector />
              ))}
            </div>
          </section>
        )}
      </div>

      <Marquee />

      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        padding: isDesktop ? '0 64px' : '0 24px',
      }}>
        <section style={{ paddingBottom: isDesktop ? 96 : 64 }}>
          <SectionLabel count={regular.length}>Faculty</SectionLabel>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'repeat(5, 1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: isDesktop ? 24 : 16,
          }}>
            {regular.map((m, idx) => (
              <Card key={m._id} member={m} onOpen={setActiveId} index={idx} />
            ))}
          </div>
        </section>

        <footer style={{
          borderTop: `1px solid ${T.hairline}`,
          paddingTop: 24, paddingBottom: 48,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 11, fontWeight: 600,
          color: T.mute,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          flexWrap: 'wrap', gap: 12,
        }}>
          <span>{String(faculty.length).padStart(2, '0')} Instructors</span>
          <span>Evolve Dance Center · Las Vegas</span>
        </footer>
      </div>

      <AnimatePresence>
        {active && (
          <Modal member={active} onClose={close} isDesktop={isDesktop} />
        )}
      </AnimatePresence>
    </div>
  )
}
