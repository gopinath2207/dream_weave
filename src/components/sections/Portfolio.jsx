import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import CloudinaryImage from '../ui/CloudinaryImage';
import Lightbox from '../ui/Lightbox';
import { usePortfolio } from '../../hooks/usePortfolio';

const CATEGORIES = [
  { id: 'all',         label: 'All Work'    },
  { id: 'bridal',      label: 'Bridal'      },
  { id: 'traditional', label: 'Traditional' },
  { id: 'casual',      label: 'Casual'      },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory]     = useState('all');
  const [lightboxIndex,  setLightboxIndex]       = useState(null);
  const { items, loading }                       = usePortfolio(activeCategory);

  const openLightbox  = (idx) => setLightboxIndex(idx);
  const closeLightbox = ()    => setLightboxIndex(null);
  const navigateTo    = (idx) => setLightboxIndex(idx);

  return (
    <section id="portfolio" className="relative py-24 bg-deep-onyx overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-forest-green/5 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">

        <SectionTitle
          eyebrow="Handcrafted Art"
          title="Our Portfolio"
          subtitle="Each piece is a testament to our mastery — intricate Aari work, zari embroidery, and goldwork crafted stitch by stitch."
          align="center"
          className="mb-12"
        />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="Portfolio categories">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative font-inter text-sm tracking-widest uppercase px-5 py-2 rounded-sm border transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'border-gold-primary text-gold-primary bg-gold-primary/10'
                  : 'border-warm-white/15 text-warm-white/50 hover:border-gold-primary/50 hover:text-warm-white'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 border border-gold-primary rounded-sm -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Masonry grid */}
        {loading ? (
          // Skeleton loader
          <div className="masonry-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="masonry-item rounded-lg overflow-hidden bg-onyx-700 animate-pulse"
                style={{ height: [240, 320, 200, 280, 260, 300][i] }}
              />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="masonry-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {items.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  className="masonry-item group relative cursor-pointer rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.5, ease: 'easeOut' }}
                  onClick={() => openLightbox(idx)}
                  aria-label={`View ${item.title || 'portfolio image'} in detail`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(idx)}
                >
                  <CloudinaryImage
                    publicId={item.cloudinary_url || item.publicId}
                    alt={item.title || 'Dream Weave embroidery work'}
                    type="portfolio"
                    wrapperClassName="w-full"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <div className="p-2.5 rounded-full bg-gold-primary/20 backdrop-blur-sm border border-gold-primary/40">
                        <ZoomIn size={18} className="text-gold-primary" />
                      </div>
                    </div>
                    {item.title && (
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="font-cinzel text-xs text-gold-primary tracking-widest uppercase truncate">
                          {item.title}
                        </p>
                        {item.category && (
                          <p className="font-inter text-[10px] text-warm-white/50 capitalize mt-0.5">
                            {item.category}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Gold border on hover */}
                  <div className="absolute inset-0 rounded-lg ring-0 group-hover:ring-1 ring-gold-primary/40 transition-all duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty state */}
        {!loading && items.length === 0 && (
          <div className="text-center py-20">
            <p className="font-cinzel text-warm-white/30 text-lg">No work found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateTo}
        />
      )}
    </section>
  );
}
