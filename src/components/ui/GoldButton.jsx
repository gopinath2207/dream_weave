import { motion } from 'framer-motion';

/**
 * Reusable Gold CTA Button
 * variant: 'filled' | 'outline' | 'ghost'
 */
export default function GoldButton({
  children,
  variant = 'filled',
  onClick,
  href,
  className = '',
  icon,
  type = 'button',
  disabled = false,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-inter font-medium tracking-widest text-sm uppercase ' +
    'px-7 py-3.5 rounded-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-gold-primary focus-visible:ring-offset-2 focus-visible:ring-offset-deep-onyx ' +
    'disabled:opacity-40 disabled:cursor-not-allowed';

  const variants = {
    filled:
      'bg-gold-primary text-deep-onyx hover:bg-gold-light ' +
      'shadow-gold-sm hover:shadow-gold-glow active:scale-95',

    outline:
      'border border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-deep-onyx ' +
      'hover:shadow-gold-sm active:scale-95',

    ghost:
      'text-gold-primary hover:text-gold-light underline-offset-4 hover:underline active:scale-95',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      {content}
    </motion.button>
  );
}
