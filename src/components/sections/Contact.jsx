import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GoldButton from '../ui/GoldButton';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_KEY';
const WHATSAPP      = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';

const WORK_TYPES = ['Bridal Embroidery', 'Blouse Work', 'Saree Border', 'Dupatta Work', 'Casual Kurta', 'Aari Work', 'Custom Design'];

function FormInput({ label, id, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-inter text-xs tracking-wider text-warm-white/60 uppercase">
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1 font-inter text-xs text-red-400"
        >
          <AlertCircle size={11} /> {error}
        </motion.p>
      )}
    </div>
  );
}

const inputClass =
  'w-full bg-onyx-700/60 border border-warm-white/10 rounded-lg px-4 py-3 font-inter text-sm text-warm-white ' +
  'placeholder:text-warm-white/20 focus:outline-none focus:border-gold-primary/60 focus:bg-onyx-700 transition-all duration-200';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', workType: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState('idle'); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim())      e.name     = 'Please enter your name.';
    if (!form.phone.trim())     e.phone    = 'Please enter your phone number.';
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number.';
    if (!form.workType)         e.workType = 'Please select a work type.';
    if (!form.message.trim())   e.message  = 'Please describe your requirement.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Dream Weave Enquiry from ${form.name}`,
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', phone: '', workType: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-onyx via-forest-green/8 to-deep-onyx" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-primary/25 to-transparent" />

      <div className="section-container relative z-10">
        <SectionTitle
          eyebrow="Let's Create Together"
          title="Get in Touch"
          subtitle="Ready to transform your vision into an embroidered masterpiece? We'd love to hear from you."
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">

          {/* Contact info panel */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-6 flex flex-col gap-6">
              <div>
                <p className="font-cinzel text-gold-primary text-sm tracking-[0.2em] uppercase mb-4">Quick Connect</p>

                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-[#25D366]/10 border border-[#25D366]/25 hover:bg-[#25D366]/20 transition-all duration-300 group mb-3"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle size={20} className="text-[#25D366]" />
                  <div>
                    <p className="font-inter text-sm text-warm-white font-medium">WhatsApp Chat</p>
                    <p className="font-inter text-xs text-warm-white/50">Fastest response</p>
                  </div>
                </a>

                <div className="flex flex-col gap-3 text-sm">
                  <span className="flex items-center gap-2.5 text-warm-white/50">
                    <Phone size={14} className="text-gold-primary flex-shrink-0" />
                    +91 98765 43210
                  </span>
                  <a href="mailto:hello@dreamweave.in" className="flex items-center gap-2.5 text-warm-white/50 hover:text-gold-primary transition-colors">
                    <Mail size={14} className="text-gold-primary flex-shrink-0" />
                    hello@dreamweave.in
                  </a>
                  <span className="flex items-center gap-2.5 text-warm-white/50">
                    <MapPin size={14} className="text-gold-primary flex-shrink-0" />
                    Tamil Nadu, India
                  </span>
                </div>
              </div>

              <div className="border-t border-gold-primary/10 pt-5">
                <p className="font-cinzel text-xs tracking-[0.2em] text-gold-primary uppercase mb-3">Working Hours</p>
                <p className="font-inter text-xs text-warm-white/50 leading-relaxed">
                  Monday – Saturday<br/>
                  <span className="text-warm-white/70">10:00 AM – 7:00 PM IST</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form panel */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="gold-border-card p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-gold-primary/15 border border-gold-primary/40 flex items-center justify-center">
                      <CheckCircle size={32} className="text-gold-primary" />
                    </div>
                    <div>
                      <p className="font-cinzel text-xl text-gold-primary tracking-wider mb-2">Message Sent!</p>
                      <p className="font-inter text-sm text-warm-white/50">
                        We'll get back to you within 24 hours.<br/>Or WhatsApp us for an instant reply.
                      </p>
                    </div>
                    <GoldButton variant="outline" onClick={() => setStatus('idle')}>
                      Send Another
                    </GoldButton>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormInput label="Your Name" id="name" error={errors.name}>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Priya Venkatesh"
                          className={`${inputClass} ${errors.name ? 'border-red-500/60' : ''}`}
                          autoComplete="name"
                        />
                      </FormInput>

                      <FormInput label="Phone Number" id="phone" error={errors.phone}>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={`${inputClass} ${errors.phone ? 'border-red-500/60' : ''}`}
                          autoComplete="tel"
                        />
                      </FormInput>
                    </div>

                    <FormInput label="Work Type" id="workType" error={errors.workType}>
                      <select
                        id="workType"
                        name="workType"
                        value={form.workType}
                        onChange={handleChange}
                        className={`${inputClass} ${errors.workType ? 'border-red-500/60' : ''}`}
                      >
                        <option value="">Select work type…</option>
                        {WORK_TYPES.map(w => <option key={w} value={w}>{w}</option>)}
                      </select>
                    </FormInput>

                    <FormInput label="Describe Your Requirement" id="message" error={errors.message}>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your design, fabric type, event date…"
                        rows={4}
                        className={`${inputClass} resize-none ${errors.message ? 'border-red-500/60' : ''}`}
                      />
                    </FormInput>

                    {status === 'error' && (
                      <p className="flex items-center gap-1.5 font-inter text-xs text-red-400">
                        <AlertCircle size={13} />
                        Something went wrong. Please try WhatsApp instead.
                      </p>
                    )}

                    <GoldButton
                      type="submit"
                      variant="filled"
                      className="w-full sm:w-auto justify-center"
                      disabled={status === 'sending'}
                      icon={<Send size={15} />}
                    >
                      {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </GoldButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat with Dream Weave on WhatsApp"
      >
        <MessageCircle size={24} className="text-white fill-white" />
      </a>
    </section>
  );
}
