import { motion } from 'framer-motion';

/**
 * Section Title with animated gold underline.
 * align: 'left' | 'center' | 'right'
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignClasses = {
    center: 'items-center text-center',
    left:   'items-start text-left',
    right:  'items-end text-right',
  };

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className={`flex flex-col gap-3 ${alignClasses[align]} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {eyebrow && (
        <motion.span
          variants={itemVariants}
          className="font-inter text-xs font-medium tracking-[0.3em] uppercase text-gold-primary opacity-80"
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        variants={itemVariants}
        className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-semibold text-warm-white leading-tight"
      >
        {title}
      </motion.h2>

      {/* Gold divider */}
      <motion.div
        variants={itemVariants}
        className={`flex ${alignClasses[align].split(' ')[0]}`}
      >
        <div className="relative h-[2px] w-16">
          <div className="absolute inset-0 bg-gold-primary" />
          <motion.div
            className="absolute inset-0 bg-gold-light"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            style={{ transformOrigin: align === 'right' ? 'right' : 'left' }}
          />
        </div>
      </motion.div>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="font-inter text-base text-warm-white/60 max-w-xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
