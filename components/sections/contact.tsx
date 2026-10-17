'use client';

import { motion } from 'motion/react';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/icons';
import { SectionHeading } from '@/components/ui/section-heading';

const contactLinks = [
  {
    id: 'contact-email',
    icon: Mail,
    label: 'Email',
    value: 'ikhlasalae9@gmail.com',
    href: 'mailto:ikhlasalae9@gmail.com',
    description: 'Réponse sous 24h',
  },
  {
    id: 'contact-linkedin',
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'alae-ikhlas',
    href: 'https://www.linkedin.com/in/alae-ikhlas/',
    description: 'Profil professionnel',
  },
  {
    id: 'contact-github',
    icon: Github,
    label: 'GitHub',
    value: 'ikhlasalae9-beep',
    href: 'https://github.com/ikhlasalae9-beep',
    description: 'Projets & code',
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background orb */}
      <div
        className="orb-3 absolute -bottom-32 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'color-mix(in srgb, var(--accent) 8%, transparent)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <SectionHeading
              eyebrow="05 — Contact"
              title="Let's Turn Data Into Something Useful."
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base leading-relaxed mb-8 max-w-md"
              style={{ color: 'var(--text-secondary)' }}
            >
              Vous recherchez un stagiaire PFE motivé par l&apos;analyse de données, la Business Intelligence
              et le Machine Learning ? Échangeons autour de vos projets.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 text-sm mb-10"
              style={{ color: 'var(--text-secondary)' }}
            >
              <MapPin size={14} />
              <span>Tanger, Maroc</span>
              <span className="mx-2">·</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Disponible pour Stage PFE
              </span>
            </motion.div>

            <motion.a
              href="mailto:ikhlasalae9@gmail.com"
              id="contact-primary-cta"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary inline-flex text-base"
            >
              <Mail size={18} />
              Envoyer un email
              <ArrowRight size={16} className="ml-1" />
            </motion.a>
          </div>

          {/* Right — contact cards */}
          <div className="space-y-4">
            {contactLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.id}
                  id={link.id}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="card flex items-center gap-5 p-5 group"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {link.label}
                    </p>
                    <p className="font-display font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                      {link.value}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: 'var(--accent)' }}
                  />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
