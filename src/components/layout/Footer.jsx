import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

// Instagram SVG (lucide-react removed it in v0.400+)
function InstagramIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

const FOOTER_LINKS = [
  { section: 'Explore',  links: [
    { label: 'Portfolio',   href: '#portfolio' },
    { label: 'Pricing',     href: '#pricing'   },
    { label: 'Our Story',   href: '#about'     },
    { label: 'Reviews',     href: '#reviews'   },
  ]},
  { section: 'Services', links: [
    { label: 'Bridal Work',      href: '#portfolio' },
    { label: 'Casual Embroidery', href: '#portfolio' },
    { label: 'Aari Work',        href: '#portfolio' },
    { label: 'Custom Orders',    href: '#contact'   },
  ]},
];

export default function Footer() {
  const year = new Date().getFullYear();
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';

  return (
    <footer className="relative bg-deep-onyx border-t border-gold-primary/10 pt-16 pb-8 overflow-hidden">
      {/* Decorative green glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gold-primary/40 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-forest-green/10 blur-3xl pointer-events-none" />

      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-5 group">
              <img
                src="/Logo.png"
                alt="Dream Weave"
                className="h-12 w-12 rounded-full object-cover ring-1 ring-gold-primary/40"
                loading="lazy"
              />
              <div>
                <p className="font-cinzel text-base font-semibold tracking-[0.2em] text-gold-primary">DREAM WEAVE</p>
                <p className="font-inter text-[10px] tracking-[0.2em] text-hoop-beige/60 uppercase">Embroidery</p>
              </div>
            </a>
            <p className="font-inter text-sm text-warm-white/50 leading-relaxed max-w-xs mb-6">
              Handcrafted Aari work and intricate embroidery that transforms fabric into heirloom art.
              Every stitch tells a story.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-warm-white/50 hover:text-gold-primary transition-colors"
              >
                <Phone size={14} /> <span>+91 98765 43210</span>
              </a>
              <a
                href="mailto:hello@dreamweave.in"
                className="flex items-center gap-2 text-warm-white/50 hover:text-gold-primary transition-colors"
              >
                <Mail size={14} /> <span>hello@dreamweave.in</span>
              </a>
              <span className="flex items-center gap-2 text-warm-white/50">
                <MapPin size={14} /> <span>Tamil Nadu, India</span>
              </span>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dream Weave Instagram"
                className="p-2 rounded-full border border-gold-primary/20 text-warm-white/40 hover:text-gold-primary hover:border-gold-primary transition-all duration-300"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(col => (
            <div key={col.section}>
              <h3 className="font-cinzel text-xs tracking-[0.25em] text-gold-primary uppercase mb-5">
                {col.section}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-inter text-sm text-warm-white/45 hover:text-warm-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold-primary/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-warm-white/30 text-center">
            © {year} Dream Weave Embroidery. All rights reserved.
          </p>
          <p className="font-inter text-xs text-warm-white/25 flex items-center gap-1">
            Crafted with <Heart size={10} className="text-gold-primary fill-gold-primary" /> in Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}
