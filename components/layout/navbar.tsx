'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'À propos', href: '#about' },
  { label: 'Projets', href: '#projects' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Formation', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'color-mix(in srgb, var(--bg-primary) 90%, transparent)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
        aria-label="Navigation principale"
      >
        <div className="container-max px-6 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#hero')}
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              aria-label="Aller au début de la page"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-display font-bold"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))' }}
              >
                AI
              </div>
              <span
                className="font-display font-bold text-sm tracking-tight hidden sm:block"
                style={{ color: 'var(--text-primary)' }}
              >
                Alae Ikhlas
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    style={{
                      color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                        style={{ background: 'var(--accent)' }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-secondary)',
                }}
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col pt-20 pb-8 px-6"
              style={{
                background: 'var(--bg-secondary)',
                borderLeft: '1px solid var(--border)',
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navigation"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Fermer le menu"
              >
                <X size={20} />
              </button>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => {
                  const sectionId = link.href.replace('#', '');
                  const isActive = activeSection === sectionId;
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      onClick={() => handleNavClick(link.href)}
                      className="text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200"
                      style={{
                        color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                        background: isActive ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent',
                      }}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </nav>

              <div className="mt-auto pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                <p className="text-xs mb-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
                  En recherche de
                </p>
                <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                  Stage PFE · Data Analyst
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
