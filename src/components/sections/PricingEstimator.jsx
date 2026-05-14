import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import GoldButton from '../ui/GoldButton';
import { MessageCircle } from 'lucide-react';

// ── Pricing data ──────────────────────────────────────────────
const BASE_PRICE = {
  light:  [800,  1500],
  medium: [2000, 4000],
  bridal: [8000, 20000],
};
const SLEEVE_ADD = {
  sleeveless: 0,
  half:        500,
  full:        1200,
};
const TIMELINE_ADD = {
  standard: 0,
  express:  1500,
};

const STEPS = {
  intensity: {
    label: 'Work Intensity',
    description: 'Choose the complexity of embroidery work',
    options: [
      { id: 'light',  label: 'Light Work',   desc: 'Simple floral motifs, borders',    icon: '🌸' },
      { id: 'medium', label: 'Medium Work',  desc: 'Detailed patterns, multi-colour',   icon: '🪡' },
      { id: 'bridal', label: 'Bridal / Heavy', desc: 'Full goldwork, zari, heavy Aari', icon: '👑' },
    ],
  },
  sleeve: {
    label: 'Sleeve Length',
    description: 'Select the sleeve type for accurate pricing',
    options: [
      { id: 'sleeveless', label: 'Sleeveless',  desc: 'No sleeves',           icon: '✂️' },
      { id: 'half',       label: 'Half Sleeve', desc: 'Elbow length',          icon: '👕' },
      { id: 'full',       label: 'Full Sleeve', desc: 'Wrist length',           icon: '🧥' },
    ],
  },
  timeline: {
    label: 'Delivery Timeline',
    description: 'How soon do you need the work completed?',
    options: [
      { id: 'standard', label: 'Standard',  desc: '7–14 working days', icon: '📅' },
      { id: 'express',  label: 'Express',   desc: '3–6 working days (+₹1500)', icon: '⚡' },
    ],
  },
};

function StepOption({ option, isSelected, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-4 rounded-lg border text-left transition-all duration-300 ${
        isSelected
          ? 'border-gold-primary bg-gold-primary/10 shadow-gold-sm'
          : 'border-warm-white/10 bg-onyx-700/50 hover:border-gold-primary/40 hover:bg-onyx-700'
      }`}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isSelected}
    >
      <span className="text-xl mt-0.5 flex-shrink-0">{option.icon}</span>
      <div>
        <p className={`font-cinzel text-sm tracking-wider ${isSelected ? 'text-gold-primary' : 'text-warm-white'}`}>
          {option.label}
        </p>
        <p className="font-inter text-xs text-warm-white/50 mt-0.5">{option.desc}</p>
      </div>
      {isSelected && (
        <motion.div
          layoutId={`check-${option.id}`}
          className="ml-auto flex-shrink-0 w-5 h-5 rounded-full bg-gold-primary flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}

export default function PricingEstimator() {
  const [selections, setSelections] = useState({
    intensity: null,
    sleeve:    null,
    timeline:  null,
  });
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';

  const priceRange = useMemo(() => {
    const { intensity, sleeve, timeline } = selections;
    if (!intensity || !sleeve || !timeline) return null;

    const [baseMin, baseMax] = BASE_PRICE[intensity];
    const sleeveAdd          = SLEEVE_ADD[sleeve];
    const timelineAdd        = TIMELINE_ADD[timeline];

    return {
      min: baseMin + sleeveAdd + timelineAdd,
      max: baseMax + sleeveAdd + timelineAdd,
    };
  }, [selections]);

  const formatPrice = (n) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  const whatsappMessage = () => {
    const { intensity, sleeve, timeline } = selections;
    const msg = `Hi Dream Weave! I'd like a quote for:\n- Work: ${intensity}\n- Sleeve: ${sleeve}\n- Timeline: ${timeline}\n- Estimated: ${priceRange ? `${formatPrice(priceRange.min)} – ${formatPrice(priceRange.max)}` : 'TBD'}\n\nPlease confirm details.`;
    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Section BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-onyx via-deep-green/10 to-deep-onyx" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent" />

      <div className="section-container relative z-10">
        <SectionTitle
          eyebrow="Transparent Pricing"
          title="Price Estimator"
          subtitle="Get an instant price range for your custom embroidery order. No hidden costs."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start max-w-5xl mx-auto">

          {/* Selectors */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {Object.entries(STEPS).map(([key, step]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-cinzel text-sm tracking-[0.2em] text-gold-primary uppercase mb-1">{step.label}</p>
                <p className="font-inter text-xs text-warm-white/40 mb-4">{step.description}</p>
                <div className="flex flex-col gap-2">
                  {step.options.map(opt => (
                    <StepOption
                      key={opt.id}
                      option={opt}
                      isSelected={selections[key] === opt.id}
                      onClick={() => setSelections(prev => ({ ...prev, [key]: opt.id }))}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Price result card */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <motion.div
              className="gold-border-card p-6 flex flex-col gap-6"
              animate={priceRange ? { boxShadow: '0 0 30px rgba(201,162,39,0.2)' } : { boxShadow: 'none' }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <p className="font-inter text-xs tracking-[0.25em] uppercase text-warm-white/40 mb-3">
                  Estimated Price Range
                </p>

                <AnimatePresence mode="wait">
                  {priceRange ? (
                    <motion.div
                      key="price"
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <p className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-shimmer">
                        {formatPrice(priceRange.min)}
                      </p>
                      <p className="font-cinzel text-lg text-gold-primary/70 mt-1">
                        — {formatPrice(priceRange.max)}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-4"
                    >
                      <p className="font-cinzel text-3xl text-warm-white/15">₹ — — —</p>
                      <p className="font-inter text-xs text-warm-white/30 mt-2">
                        Select all options above
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Selection summary */}
              <div className="border-t border-gold-primary/15 pt-4 flex flex-col gap-2">
                {Object.entries(STEPS).map(([key, step]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="font-inter text-xs text-warm-white/40">{step.label}</span>
                    <span className={`font-inter text-xs ${selections[key] ? 'text-warm-white' : 'text-warm-white/20'}`}>
                      {selections[key]
                        ? STEPS[key].options.find(o => o.id === selections[key])?.label
                        : '—'
                      }
                    </span>
                  </div>
                ))}
              </div>

              {priceRange && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <GoldButton
                    href={whatsappMessage()}
                    variant="filled"
                    className="w-full justify-center"
                    icon={<MessageCircle size={16} />}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book on WhatsApp
                  </GoldButton>
                </motion.div>
              )}

              <p className="font-inter text-[10px] text-warm-white/25 text-center leading-relaxed">
                * Final price may vary based on design complexity and fabric type.
                A detailed quote will be provided after consultation.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
