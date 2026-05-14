import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { buildUrl } from '../../lib/cloudinary';

/**
 * Deep zoom lightbox with keyboard navigation and swipe support.
 */
export default function Lightbox({ items, activeIndex, onClose, onNavigate }) {
  const item = items[activeIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft'  && activeIndex > 0)              onNavigate(activeIndex - 1);
    if (e.key === 'ArrowRight' && activeIndex < items.length - 1) onNavigate(activeIndex + 1);
  }, [activeIndex, items.length, onClose, onNavigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!item) return null;

  const highResSrc = buildUrl(
    item.cloudinary_url || item.publicId,
    'f_auto,q_auto,w_1600'
  );

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-overlay"
        className="fixed inset-0 z-[9998] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Viewing: ${item.title || 'Portfolio image'}`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/92 backdrop-blur-sm" />

        {/* Close */}
        <button
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-warm-white transition-colors"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X size={22} />
        </button>

        {/* Prev */}
        {activeIndex > 0 && (
          <button
            className="absolute left-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-warm-white transition-colors"
            onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex - 1); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={26} />
          </button>
        )}

        {/* Next */}
        {activeIndex < items.length - 1 && (
          <button
            className="absolute right-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-warm-white transition-colors"
            onClick={(e) => { e.stopPropagation(); onNavigate(activeIndex + 1); }}
            aria-label="Next image"
          >
            <ChevronRight size={26} />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={activeIndex}
          className="relative z-10 max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-3"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={highResSrc}
            alt={item.title || 'Portfolio work'}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            draggable={false}
          />

          {/* Caption */}
          {(item.title || item.description) && (
            <div className="text-center px-4">
              {item.title && (
                <p className="font-cinzel text-gold-primary text-sm tracking-widest uppercase">
                  {item.title}
                </p>
              )}
              {item.description && (
                <p className="font-inter text-warm-white/60 text-xs mt-1">{item.description}</p>
              )}
            </div>
          )}

          {/* Counter */}
          <p className="font-inter text-xs text-warm-white/40">
            {activeIndex + 1} / {items.length}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
