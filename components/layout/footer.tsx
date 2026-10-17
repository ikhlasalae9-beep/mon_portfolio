'use client';

import { motion } from 'motion/react';
import { Mail, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/icons';

const socials = [
  {
    id: 'footer-github',
    href: 'https://github.com/ikhlasalae9-beep',
    label: 'GitHub',
    icon: Github,
  },
  {
    id: 'footer-linkedin',
    href: 'https://www.linkedin.com/in/alae-ikhlas/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    id: 'footer-email',
    href: 'mailto:ikhlasalae9@gmail.com',
    label: 'Email',
    icon: Mail,
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative border-t"
      style={{
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="container-max px-6 md:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left — identity */}
          <div>
            <p className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
              Alae Ikhlas
            </p>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              Data Analyst · Business Intelligence · Machine Learning
            </p>
          </div>

          {/* Center — socials */}
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'var(--bg-surface)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              );
            })}
          </div>

          {/* Right — copyright + back to top */}
          <div className="flex items-center gap-4">
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              © 2026 Alae Ikhlas
            </p>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--bg-surface)',
                color: 'var(--text-secondary)',
              }}
              aria-label="Retour en haut de la page"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
