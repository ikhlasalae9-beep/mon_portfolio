'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useSmoothScroll } from '@/components/providers/smooth-scroll';

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Outils', href: '#tools' },
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projets', href: '#projects' },
  { label: 'Formation', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section detection
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    scrollTo(href, { offset: -70 });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none"
        aria-label="Navigation principale"
      >
        <div
          className={`container-max px-4 sm:px-6 h-14 sm:h-16 rounded-full pointer-events-auto flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'bg-[var(--surface)]/90 backdrop-blur-xl border border-[var(--border)] shadow-lg shadow-black/10'
              : 'bg-[var(--surface)]/70 backdrop-blur-md border border-[var(--border)]'
          }`}
        >
          {/* Logo Left */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4E] rounded-full text-left"
            aria-label="Aller au début de la page"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF5A4E] flex items-center justify-center text-[#141B2D] text-xs font-display font-extrabold shadow-sm transition-transform group-hover:scale-105">
              AI
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm tracking-tight text-[var(--text)] leading-tight">
                Alae Ikhlas
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-medium tracking-wide">
                Data Analyst
              </span>
            </div>
          </button>

          {/* Desktop Nav Links (PillNav style) */}
          <div className="hidden md:flex items-center gap-1 bg-[var(--surface-2)]/60 px-2 py-1 rounded-full border border-[var(--border-subtle)]">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-display font-bold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4E] ${
                    isActive
                      ? 'text-[#141B2D] font-extrabold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePillNav"
                      className="absolute inset-0 rounded-full bg-[#FF5A4E] shadow-[0_2px_12px_rgba(255,90,78,0.35)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Actions: Theme Toggle + Contact CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <button
              onClick={() => handleNavClick('#contact')}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-display font-bold bg-[#FF5A4E] text-[#141B2D] shadow-sm hover:shadow-[0_0_20px_rgba(255,90,78,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Me contacter</span>
              <ArrowUpRight size={13} />
            </button>

            {/* Mobile burger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4E]"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-2xl p-5"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-display font-bold text-left transition-colors ${
                      isActive
                        ? 'bg-[#FF5A4E] text-[#141B2D]'
                        : 'text-[var(--text)] hover:bg-[var(--surface-2)]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#141B2D]" />}
                  </button>
                );
              })}
              <button
                onClick={() => handleNavClick('#contact')}
                className="mt-3 w-full py-3 rounded-xl bg-[#FF5A4E] text-[#141B2D] text-sm font-display font-bold flex items-center justify-center gap-2"
              >
                <span>Me contacter</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
