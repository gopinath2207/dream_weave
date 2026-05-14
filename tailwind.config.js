/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Dream Weave Brand Palette (extracted from Logo 1.png) ──
        'forest-green':  '#0D3B1E', // Logo circle background
        'deep-green':    '#0A2210', // Deeper variation for gradients
        'deep-onyx':     '#0A0A0A', // Page base background
        'onyx-800':      '#111111',
        'onyx-700':      '#1A1A1A',

        // Gold spectrum
        'gold-primary':  '#C9A227', // "DREAM WEAVE" text
        'gold-light':    '#E8C84A', // Ring highlight / shimmer
        'gold-dark':     '#8B6914', // Ring shadow / depth
        'gold-muted':    '#A08020', // Muted gold for subtle elements

        // Warm neutrals
        'hoop-beige':    '#C4A882', // Embroidery hoop, borders, secondary text
        'warm-white':    '#F5F0E8', // Body text

        // Accent greens
        'sage-green':    '#A8D5A2', // Hibiscus flower petals
        'mint-thread':   '#5ECFB5', // Needle thread accent
      },

      fontFamily: {
        'cinzel':  ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        'inter':   ['"Inter"', '"Roboto"', 'system-ui', 'sans-serif'],
      },

      backgroundImage: {
        // Cinematic dark gradient base
        'hero-gradient':
          'radial-gradient(ellipse at 50% 0%, #0D3B1E 0%, #061508 45%, #0A0A0A 100%)',
        // Gold shimmer for text/borders
        'gold-shimmer':
          'linear-gradient(135deg, #8B6914 0%, #C9A227 30%, #E8C84A 50%, #C9A227 70%, #8B6914 100%)',
        // Subtle green radial for section backgrounds
        'section-gradient':
          'radial-gradient(ellipse at 50% 50%, #0D3B1E22 0%, transparent 70%)',
        // Dark green card bg
        'card-gradient':
          'linear-gradient(135deg, #0D3B1E33 0%, #0A0A0A 100%)',
      },

      boxShadow: {
        'gold-glow':   '0 0 20px rgba(201, 162, 39, 0.35), 0 0 60px rgba(201, 162, 39, 0.15)',
        'gold-sm':     '0 0 10px rgba(201, 162, 39, 0.25)',
        'green-glow':  '0 0 30px rgba(13, 59, 30, 0.6)',
        'glass':       '0 8px 32px rgba(0, 0, 0, 0.6)',
      },

      animation: {
        'shimmer':         'shimmer 3s linear infinite',
        'float':           'float 6s ease-in-out infinite',
        'float-slow':      'float 9s ease-in-out infinite',
        'pulse-gold':      'pulseGold 2s ease-in-out infinite',
        'fade-up':         'fadeUp 0.8s ease forwards',
        'spin-slow':       'spin 20s linear infinite',
        'thread-draw':     'threadDraw 2s ease forwards',
        'whatsapp-pulse':  'whatsappPulse 2s ease-in-out infinite',
      },

      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(201,162,39,0.3)' },
          '50%':      { boxShadow: '0 0 30px rgba(201,162,39,0.7)' },
        },
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        threadDraw: {
          '0%':   { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        whatsappPulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(37,211,102,0.7)' },
          '50%':      { transform: 'scale(1.08)', boxShadow: '0 0 0 14px rgba(37,211,102,0)' },
        },
      },

      backdropBlur: {
        'xs': '2px',
      },

      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
};
