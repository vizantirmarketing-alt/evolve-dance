import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F5F1',
        'background-warm': '#FCFBF8',
        'background-mint': '#D4F1EF',
        foreground: '#1F1F1C',
        'foreground-muted': '#6D6C67',
        border: '#D6DFDA',

        teal: {
          DEFAULT: '#0ABAB5',
          hover: '#087876',
          soft: '#81D8D0',
          light: '#D4F1EF',
        },

        project: {
          DEFAULT: '#173432',
          foreground: '#F4FBF9',
          accent: '#81D8D0',
        },

        status: {
          open: '#0ABAB5',
          full: '#B97568',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
        widest3: '0.25em',
      },
      animation: {
        'pulse-dot':    'pulseDot 2s ease-in-out infinite',
        'ticker':       'ticker 25s linear infinite',
        'fade-up':      'fadeUp 0.8s ease forwards',
        'scroll-line':  'scrollLine 2s ease-in-out infinite',
        'grid-slide':   'gridSlide 20s linear infinite',
        'orb-float':    'orbFloat 8s ease-in-out infinite',
        'orb-float-r':  'orbFloat 12s ease-in-out infinite reverse',
        'ring-pulse':   'ringPulse 3s ease-in-out infinite',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 8px #0ABAB5' },
          '50%':      { opacity: '0.6', boxShadow: '0 0 16px #0ABAB5, 0 0 32px rgba(10,186,181,0.18)' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.33%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scrollLine: {
          '0%':   { opacity: '0.3', transform: 'scaleY(0.8) translateY(-4px)' },
          '50%':  { opacity: '1',   transform: 'scaleY(1) translateY(0)' },
          '100%': { opacity: '0.3', transform: 'scaleY(0.8) translateY(4px)' },
        },
        gridSlide: {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%':      { transform: 'translateY(-30px) scale(1.05)' },
        },
        ringPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(10,186,181,0)' },
          '50%':      { boxShadow: '0 0 40px 0 rgba(10,186,181,0.08)' },
        },
      },
      backgroundImage: {
        'teal-grid': `
          linear-gradient(rgba(10,186,181,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(10,186,181,0.04) 1px, transparent 1px)
        `,
        'animated-grid': `
          linear-gradient(rgba(10,186,181,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(10,186,181,0.05) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid-80': '80px 80px',
        'grid-60': '60px 60px',
      },
      clipPath: {
        'btn':   'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
        'panel': 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
      transitionDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            '--tw-prose-body': '#6D6C67',
            '--tw-prose-headings': '#1F1F1C',
            '--tw-prose-links': '#0ABAB5',
            color: '#6D6C67',
            fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
            'h1, h2, h3, h4': {
              fontFamily: 'var(--font-playfair), Georgia, serif',
              color: '#1F1F1C',
              fontWeight: '700',
            },
            a: {
              color: '#0ABAB5',
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(10, 186, 181, 0.4)',
              textUnderlineOffset: '4px',
              transitionProperty: 'color',
              transitionDuration: '200ms',
              '&:hover': {
                color: '#087876',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.prose-evolve': {
          '@apply prose max-w-none': {},
        },
      })
    }),
  ],
}

export default config
