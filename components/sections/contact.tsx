'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { Github, Linkedin, Whatsapp } from '@/components/ui/icons';
import { SectionHeading } from '@/components/ui/section-heading';
import { Magnet } from '@/components/react-bits/magnet';
import { LogoLoop } from '@/components/react-bits/logo-loop';
import { SpotlightCard } from '@/components/react-bits/spotlight-card';

const contactChannels = [
  {
    id: 'contact-email',
    icon: Mail,
    label: 'Email',
    handle: 'ikhlasalae9@gmail.com',
    href: 'mailto:ikhlasalae9@gmail.com',
    badge: 'Sous 24h',
  },
  {
    id: 'contact-linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    handle: 'alae-ikhlas',
    href: 'https://www.linkedin.com/in/alae-ikhlas/',
    badge: 'Réseau Pro',
  },
  {
    id: 'contact-github',
    icon: Github,
    label: 'GitHub',
    handle: 'ikhlasalae9-beep',
    href: 'https://github.com/ikhlasalae9-beep',
    badge: 'Code Source',
  },
  {
    id: 'contact-whatsapp',
    icon: Whatsapp,
    label: 'WhatsApp',
    handle: '+212 600 000 000',
    href: 'https://wa.me/212600000000',
    badge: 'Direct',
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="section-padding bg-[var(--bg-primary)] relative overflow-hidden"
    >
      {/* Background Scrolling Marquee Banner "PARLONS DATA · MACHINE LEARNING · BI" */}
      <div className="absolute top-12 left-0 right-0 pointer-events-none opacity-5 select-none overflow-hidden">
        <LogoLoop speed={25} direction="left">
          <div className="flex items-center gap-8 text-[clamp(4rem,9vw,8rem)] font-display font-black tracking-tighter text-[var(--text)] whitespace-nowrap">
            <span>PARLONS DATA</span>
            <span>·</span>
            <span>BUSINESS INTELLIGENCE</span>
            <span>·</span>
            <span>STAGE PFE</span>
            <span>·</span>
            <span>MACHINE LEARNING</span>
            <span>·</span>
          </div>
        </LogoLoop>
      </div>

      <div className="container-max relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Section Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <div className="badge-pill">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A4E] shadow-[0_0_8px_#FF5A4E] animate-pulse" />
              <span>05 — Contact & Opportunités</span>
            </div>
          </motion.div>

          {/* Giant "Parlons Data" Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-[clamp(2.75rem,6.5vw,5rem)] leading-[1.04] tracking-[-0.035em] text-[var(--text)] mb-4"
          >
            Parlons <span className="text-[#FF5A4E]">data</span> et impact.
          </motion.h2>

          {/* ONE short line: max 12 words */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[var(--text-muted)] max-w-lg mb-8 font-normal"
          >
            Disponible immédiatement pour un stage PFE à Tanger ou à distance.
          </motion.p>

          {/* Big Magnetic CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-14"
          >
            <Magnet strength={30}>
              <a
                href="mailto:ikhlasalae9@gmail.com"
                className="btn-primary text-base sm:text-lg py-4 px-9 shadow-[0_10px_35px_rgba(255,90,78,0.4)] group inline-flex items-center gap-3"
                aria-label="Envoyer un email directement à Alae Ikhlas"
              >
                <Mail size={20} />
                <span>ikhlasalae9@gmail.com</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5" />
              </a>
            </Magnet>
          </motion.div>

          {/* Animated Circular Icon Links Row */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
            {contactChannels.map((channel, i) => {
              const Icon = channel.icon;
              return (
                <motion.a
                  key={channel.id}
                  href={channel.href}
                  target={channel.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={channel.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.35 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[#FF5A4E]/50 hover:shadow-[0_0_20px_rgba(255,90,78,0.2)] transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-full border border-[var(--border)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[#FF5A4E] group-hover:border-[#FF5A4E] group-hover:scale-110 shadow-xs transition-all duration-300 mb-3">
                    <Icon size={20} />
                  </div>
                  <span className="font-display font-bold text-sm text-[var(--text)] group-hover:text-[#FF5A4E] transition-colors">
                    {channel.label}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-mono mt-0.5 truncate max-w-full">
                    {channel.badge}
                  </span>
                </motion.a>
              );
            })}
          </div>

          {/* Location Badge */}
          <div className="mt-12 flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <MapPin size={14} className="text-[#FF5A4E]" />
            <span>Tanger, Maroc · Mobilité nationale & télétravail</span>
          </div>
        </div>
      </div>
    </section>
  );
}
