import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';

function InstagramIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

// ── Behold Widget ID ──────────────────────────────────────────
// Set VITE_BEHOLD_WIDGET_ID in .env.local to activate the live feed
const BEHOLD_ID = import.meta.env.VITE_BEHOLD_WIDGET_ID || '';

// ── Setup placeholder shown before Behold is configured ──────
function BeholdSetupPlaceholder() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="aspect-square rounded-xl bg-onyx-700 flex flex-col items-center justify-center gap-2 border border-gold-primary/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
        >
          <InstagramIcon size={22} className="text-warm-white/20" />
          <span className="font-inter text-[10px] text-warm-white/20 tracking-wider text-center px-2">
            Feed loading…
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function SocialReels() {
  return (
    <section id="reels" className="relative py-24 bg-deep-onyx overflow-hidden">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent" />

      <div className="section-container relative z-10">
        <SectionTitle
          eyebrow="See it in Motion"
          title="Behind the Stitch"
          subtitle="Watch our craftswomen bring intricate designs to life, one thread at a time."
          align="center"
          className="mb-12"
        />

        {/* ── Behold Instagram Widget ─────────────────────────── */}
        {BEHOLD_ID ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="behold-wrapper"
          >
            {/*
              Behold web component — script loaded in index.html.
              Styling is controlled via Behold dashboard.
              The widget inherits the page's dark background automatically.
            */}
            <behold-widget feed-id={BEHOLD_ID} />
          </motion.div>
        ) : (
          <BeholdSetupPlaceholder />
        )}

        {/* Instagram follow CTA */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://instagram.com/au_aari_creation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-gold-primary/30 text-warm-white/60 hover:text-gold-primary hover:border-gold-primary font-inter text-sm tracking-wider transition-all duration-300 group"
            aria-label="Follow Dream Weave on Instagram"
          >
            <InstagramIcon size={16} className="group-hover:text-gold-primary transition-colors" />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
