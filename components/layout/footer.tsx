'use client';

import { motion } from 'motion/react';
import { Mail, ArrowUp } from 'lucide-react';
import { Github, Linkedin, Whatsapp } from '@/components/ui/icons';
import { useSmoothScroll } from '@/components/providers/smooth-scroll';

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
    id: 'footer-whatsapp',
    href: 'https://wa.me/212600000000',
    label: 'WhatsApp',
    icon: Whatsapp,
  },
  {
    id: 'footer-email',
    href: 'mailto:ikhlasalae9@gmail.com',
    label: 'Email',
    icon: Mail,
  },
];

export function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer
      className="relative border-t border-[var(--border)] bg-[var(--bg-secondary)]"
    >
      <div className="container-max px-6 md:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left — Identity */}
          <div className="text-center md:text-left">
            <p className="font-display font-extrabold text-base text-[var(--text)]">
              Alae Ikhlas
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5 font-medium">
              Data Analyst · Business Intelligence · Machine Learning
            </p>
          </div>

          {/* Center — Socials */}
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
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[#FF5A4E] hover:text-[#FF5A4E] hover:shadow-[0_0_15px_rgba(255,90,78,0.3)] transition-all duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              );
            })}
          </div>

          {/* Right — Copyright & Back to Top */}
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <span>© 2026 Alae Ikhlas</span>
            <motion.button
              onClick={() => scrollTo('#hero', { offset: 0 })}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--surface)] hover:border-[#FF5A4E] hover:text-[#FF5A4E] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4E]"
              aria-label="Retour en haut de la page"
            >
              <ArrowUp size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
