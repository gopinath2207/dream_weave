import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import GoldButton from '../ui/GoldButton';
import { fetchConfig } from '../../lib/supabase';

// ── Animated SVG embroidery particles ─────────────────────────
function EmbroideryParticle({ style, size = 6, delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gold-primary/20 will-change-transform"
      style={{ width: size, height: size, ...style }}
      animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

// ── Decorative thread SVG ─────────────────────────────────────
function ThreadDecoration() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Sweeping gold curves mimicking embroidery thread paths */}
      <motion.path
        d="M-50 350 Q300 100 600 350 T1250 350"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
        strokeDasharray="1200"
        initial={{ strokeDashoffset: 1200 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />
      <motion.path
        d="M-50 420 Q300 650 600 420 T1250 420"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="1"
        strokeDasharray="1200"
        initial={{ strokeDashoffset: 1200 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 3.5, ease: 'easeInOut', delay: 0.3 }}
      />
      <motion.path
        d="M600 -20 Q850 200 700 400 Q550 600 750 720"
        fill="none"
        stroke="url(#mintGrad)"
        strokeWidth="1"
        strokeDasharray="800"
        initial={{ strokeDashoffset: 800 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 4, ease: 'easeInOut', delay: 0.8 }}
      />
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#8B6914" stopOpacity="0" />
          <stop offset="30%"  stopColor="#C9A227" stopOpacity="1" />
          <stop offset="70%"  stopColor="#E8C84A" stopOpacity="1" />
          <stop offset="100%" stopColor="#8B6914" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mintGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#5ECFB5" stopOpacity="0" />
          <stop offset="50%"  stopColor="#5ECFB5" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#5ECFB5" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Container animation variants ─────────────────────────────
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.4 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Main Hero Component ────────────────────────────────────────
export default function Hero() {
  const [tagline, setTagline] = useState('Where Every Stitch Tells a Story');

  // Fetch dynamic tagline from Supabase site_config
  useEffect(() => {
    fetchConfig('hero_tagline').then(val => { if (val) setTagline(val); });
  }, []);

  const stats = [
    { value: '500+', label: 'Designs Crafted' },
    { value: '8+',   label: 'Years of Mastery' },
    { value: '100%', label: 'Handmade Artistry' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero-gradient"
      aria-label="Dream Weave hero section"
    >
      {/* ── Background layers ───────────────────────────── */}
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.7)_100%)] pointer-events-none" />

      {/* Green glow blob top-left */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-forest-green/30 blur-3xl pointer-events-none" />
      {/* Green glow blob bottom-right */}
      <div className="absolute -bottom-40 -right-20 w-[400px] h-[400px] rounded-full bg-forest-green/20 blur-3xl pointer-events-none" />

      {/* Animated SVG thread decoration */}
      <ThreadDecoration />

      {/* Floating particles */}
      <EmbroideryParticle style={{ top: '20%', left: '15%' }}  size={8}  delay={0}   />
      <EmbroideryParticle style={{ top: '35%', left: '8%'  }}  size={4}  delay={1.5} />
      <EmbroideryParticle style={{ top: '65%', left: '20%' }}  size={6}  delay={0.7} />
      <EmbroideryParticle style={{ top: '25%', right: '12%' }} size={5}  delay={1.2} />
      <EmbroideryParticle style={{ top: '55%', right: '18%' }} size={9}  delay={0.3} />
      <EmbroideryParticle style={{ top: '75%', right: '10%' }} size={4}  delay={2.0} />

      {/* ── Main content ────────────────────────────────── */}
      <div className="relative z-10 section-container flex flex-col items-center text-center pt-28 pb-16">

        {/* Eyebrow badge */}
        <motion.div
          className="flex items-center gap-2 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card px-4 py-2 flex items-center gap-2 border-gold-primary/30">
            <Sparkles size={12} className="text-gold-primary" />
            <span className="font-inter text-xs tracking-[0.25em] text-gold-primary uppercase">
              Premium Aari Work
            </span>
            <Sparkles size={12} className="text-gold-primary" />
          </div>
        </motion.div>

        {/* Main brand name */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-cinzel font-bold leading-none tracking-[0.15em] uppercase">
            <span
              className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-gold-shimmer"
              style={{ WebkitTextStroke: '1px rgba(201,162,39,0.1)' }}
            >
              Dream
            </span>
            <span
              className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-gold-shimmer mt-[-0.1em]"
              style={{ WebkitTextStroke: '1px rgba(201,162,39,0.1)' }}
            >
              Weave
            </span>
          </h1>
        </motion.div>

        {/* Sub-brand */}
        <motion.p
          className="font-inter text-[10px] sm:text-xs tracking-[0.5em] uppercase text-hoop-beige/70 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          ✦ &nbsp; Embroidery &nbsp; ✦
        </motion.p>

        {/* Gold divider */}
        <motion.div
          className="w-24 h-[1px] bg-gold-shimmer mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.0, ease: 'easeOut' }}
        />

        {/* Tagline */}
        <motion.p
          className="font-cinzel text-base sm:text-xl md:text-2xl text-warm-white/80 max-w-2xl leading-relaxed mb-12 italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          "{tagline}"
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <GoldButton href="#portfolio" variant="filled" className="text-sm sm:text-base px-8 py-4">
            Explore Collection
          </GoldButton>
          <GoldButton href="#contact" variant="outline" className="text-sm sm:text-base px-8 py-4">
            Get a Quote
          </GoldButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map(stat => (
            <motion.div key={stat.label} variants={itemVariants} className="flex flex-col items-center gap-1">
              <span className="font-cinzel text-2xl sm:text-3xl font-semibold text-gold-primary">
                {stat.value}
              </span>
              <span className="font-inter text-[10px] sm:text-xs text-warm-white/40 tracking-wider text-center uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative horizontal line */}
        <motion.div
          className="w-full max-w-lg h-[1px] mt-8 bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#portfolio"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-warm-white/30 hover:text-gold-primary transition-colors group"
        aria-label="Scroll to portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="font-inter text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="group-hover:text-gold-primary transition-colors" />
        </motion.div>
      </motion.a>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-onyx to-transparent pointer-events-none" />
    </section>
  );
}
