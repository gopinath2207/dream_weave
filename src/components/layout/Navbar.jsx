import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import GoldButton from '../ui/GoldButton';

const NAV_LINKS = [
  { label: 'Home',      href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing',   href: '#pricing' },
  { label: 'Reviews',   href: '#reviews' },
  { label: 'Contact',   href: '#contact' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    setActiveLink(href);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'navbar-glass shadow-glass py-2' : 'py-4 bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="section-container flex items-center justify-between h-14">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group" aria-label="Dream Weave — Home">
            <img
              src="/Logo.png"
              alt="Dream Weave Logo"
              className="h-10 w-10 rounded-full object-cover ring-1 ring-gold-primary/40 group-hover:ring-gold-primary transition-all duration-300"
              loading="eager"
            />
            <div className="flex flex-col leading-none">
              <span className="font-cinzel text-sm font-semibold tracking-[0.2em] text-gold-shimmer">
                DREAM WEAVE
              </span>
              <span className="font-inter text-[10px] tracking-[0.15em] text-hoop-beige/70 uppercase">
                Embroidery
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative font-inter text-sm tracking-wider transition-colors duration-200 py-1 ${
                  activeLink === link.href
                    ? 'text-gold-primary'
                    : 'text-warm-white/70 hover:text-warm-white'
                }`}
              >
                {link.label}
                {activeLink === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <GoldButton
              href="#contact"
              variant="outline"
              className="text-xs py-2.5 px-5"
            >
              Book a Design
            </GoldButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-warm-white/80 hover:text-gold-primary transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              className="fixed inset-0 z-[98] bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="mobile-drawer"
              className="fixed top-0 right-0 z-[99] h-full w-72 bg-deep-onyx border-l border-gold-primary/20 flex flex-col pt-20 pb-8 px-8 md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`font-cinzel text-lg tracking-wider transition-colors duration-200 ${
                      activeLink === link.href ? 'text-gold-primary' : 'text-warm-white/80 hover:text-gold-primary'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto">
                <GoldButton href="#contact" variant="filled" className="w-full justify-center">
                  Book a Design
                </GoldButton>
              </div>

              {/* Decorative */}
              <div className="absolute bottom-16 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
