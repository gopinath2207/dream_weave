import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { useTestimonials } from '../../hooks/useTestimonials';

function StarRating({ rating = 5 }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < rating ? 'text-gold-primary fill-gold-primary' : 'text-warm-white/20'}
        />
      ))}
    </div>
  );
}

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');

  // Generate a deterministic colour from name
  const hue = name.charCodeAt(0) * 13 % 360;
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center font-cinzel text-sm font-semibold text-deep-onyx flex-shrink-0"
      style={{ background: `hsl(${hue}, 60%, 55%)` }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const { items, loading } = useTestimonials();
  const [current, setCurrent]   = useState(0);
  const [direction, setDir]     = useState(1);

  const navigate = (dir) => {
    setDir(dir);
    setCurrent(prev => {
      const next = prev + dir;
      if (next < 0) return items.length - 1;
      if (next >= items.length) return 0;
      return next;
    });
  };

  if (loading) {
    return (
      <section id="reviews" className="py-24 bg-deep-onyx">
        <div className="section-container">
          <div className="h-64 bg-onyx-700 animate-pulse rounded-2xl" />
        </div>
      </section>
    );
  }

  const item = items[current];
  const variants = {
    enter:  (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit:   (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.3 } }),
  };

  return (
    <section id="reviews" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-onyx via-forest-green/5 to-deep-onyx" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent" />

      <div className="section-container relative z-10">
        <SectionTitle
          eyebrow="Client Stories"
          title="What They Say"
          subtitle="Real words from real clients who trusted us with their most precious moments."
          align="center"
          className="mb-16"
        />

        <div className="max-w-3xl mx-auto">
          {/* Main testimonial card */}
          <div className="relative glass-card p-8 sm:p-12 min-h-[260px] overflow-hidden">
            {/* Large decorative quote */}
            <Quote
              size={80}
              className="absolute top-4 right-6 text-gold-primary/8 rotate-180"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <StarRating rating={item.rating} />

                <p className="font-inter text-base sm:text-lg text-warm-white/80 leading-relaxed mt-5 mb-8 italic">
                  "{item.text}"
                </p>

                <div className="flex items-center gap-3">
                  <Avatar name={item.name} />
                  <div>
                    <p className="font-cinzel text-sm text-warm-white tracking-wider">{item.name}</p>
                    {item.location && (
                      <p className="font-inter text-xs text-warm-white/40">{item.location}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-full border border-gold-primary/25 text-warm-white/60 hover:border-gold-primary hover:text-gold-primary transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 h-2 bg-gold-primary'
                      : 'w-2 h-2 bg-warm-white/20 hover:bg-warm-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => navigate(1)}
              className="p-2.5 rounded-full border border-gold-primary/25 text-warm-white/60 hover:border-gold-primary hover:text-gold-primary transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
