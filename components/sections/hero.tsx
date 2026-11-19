'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from '@/components/react-bits/split-text';
import { CountUp } from '@/components/react-bits/count-up';
import { Magnet } from '@/components/react-bits/magnet';
import { TechIcon } from '@/components/ui/tech-icons';
import { heroStats } from '@/data/stats';
import { heroLatestProject } from '@/data/hero-cards';
import { useSmoothScroll } from '@/components/providers/smooth-scroll';

// No Scikit-learn pill — floating icons are small, decorative only
const floatingIcons = [
  { name: 'Python', x: -35, y: -90, delay: 0 },
  { name: 'Power BI', x: 130, y: -70, delay: 0.2 },
  { name: 'SQL', x: -60, y: 30, delay: 0.4 },
  { name: 'Streamlit', x: 140, y: 70, delay: 0.3 },
];

const ROLES = ['Data Analyst', 'ML Engineer', 'BI Developer', 'Data Scientist'];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length);
        setVisible(true);
      }, 350);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block text-[#FF5A4E] font-mono text-sm font-bold tracking-wide transition-all duration-350"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
      }}
    >
      {ROLES[index]}
    </span>
  );
}

export function Hero() {
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [photoError, setPhotoError] = useState(false);
  const [photoSrc, setPhotoSrc] = useState('/images/profile-cutout.png');

  const handlePhotoError = () => {
    if (photoSrc === '/images/profile-cutout.png') {
      setPhotoSrc('/images/portrait.jpg');
    } else if (photoSrc === '/images/portrait.jpg') {
      setPhotoSrc('/images/profile.jpg');
    } else {
      setPhotoError(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMouseParallax({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  };

  const handleMouseLeave = () => setMouseParallax({ x: 0, y: 0 });

  // GSAP continuous float on the photo column
  const photoColRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    if (!photoColRef.current) return;
    gsap.to(photoColRef.current, {
      y: -8, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
  }, { scope: photoColRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[95svh] flex flex-col justify-center section-padding pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 overflow-hidden bg-transparent"
    >
      {/* Background Architectural Grid */}
      <div className="architectural-grid absolute inset-0 pointer-events-none opacity-50 dark:opacity-30" />

      <div className="container-max relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN */}
          <div ref={heroContentRef} className="lg:col-span-7 flex flex-col items-start text-left section-scrim p-4 sm:p-6 rounded-3xl">
            {/* Pill badge */}
            <div
              className="mb-5 sm:mb-6"
              style={{ animation: 'fadeSlideUp 0.5s ease forwards', animationDelay: '0s' }}
            >
              <div className="badge-pill">
                <span className="w-2 h-2 rounded-full bg-[#FF5A4E] shadow-[0_0_8px_#FF5A4E] animate-pulse" />
                <RotatingRole />
                <span className="text-[var(--text)] opacity-50 mx-1">·</span>
                <span className="text-[var(--text)] text-xs">Business Intelligence</span>
              </div>
            </div>

            {/* Headline with GSAP SplitText */}
            <h1 className="font-display font-extrabold text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[1.04] tracking-[-0.035em] text-[var(--text)] mb-5">
              <SplitText text="Je transforme les données" delay={0.05} />
              <br />
              <span className="text-[#FF5A4E] drop-shadow-[0_0_30px_rgba(255,90,78,0.25)] shimmer-coral">
                <SplitText text="en décisions d'impact." delay={0.35} />
              </span>
            </h1>

            {/* One short sentence */}
            <p
              className="text-base sm:text-lg leading-relaxed text-[var(--text-muted)] max-w-lg mb-8 font-normal"
              style={{ animation: 'fadeSlideUp 0.5s ease forwards', animationDelay: '0.45s', opacity: 0 }}
            >
              Transformer la donnée brute en visualisations stratégiques et modèles prédictifs exploitables.
            </p>

            {/* Magnetic CTA Buttons */}
            <div
              className="flex flex-wrap items-center gap-4 mb-10"
              style={{ animation: 'fadeSlideUp 0.5s ease forwards', animationDelay: '0.55s', opacity: 0 }}
            >
              <Magnet strength={20}>
                <button
                  onClick={() => scrollTo('#projects')}
                  className="btn-primary group"
                  aria-label="Explorer mes projets"
                >
                  <span>Explorer mes projets</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              </Magnet>

              <Magnet strength={15}>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="btn-secondary group"
                  aria-label="Me contacter"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FF5A4E]/15 text-[#FF5A4E] flex items-center justify-center transition-colors group-hover:bg-[#FF5A4E] group-hover:text-[#141B2D]">
                    <Play size={10} className="fill-current translate-x-0.5" />
                  </div>
                  <span>Me contacter</span>
                </button>
              </Magnet>
            </div>

            {/* Stat Counters */}
            <div
              className="w-full pt-6 border-t border-[var(--border)]"
              style={{ animation: 'fadeSlideUp 0.6s ease forwards', animationDelay: '0.65s', opacity: 0 }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0">
                <div className="flex flex-col sm:border-r sm:border-[var(--border)] sm:pr-4">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text)] tracking-tight">
                    <CountUp to={10} suffix="+" />
                  </span>
                  <span className="text-xs font-bold font-display text-[var(--text)] mt-0.5">Projets Réalisés</span>
                  <span className="text-[11px] text-[var(--text-muted)]">BI &amp; Machine Learning</span>
                </div>
                <div className="flex flex-col sm:border-r sm:border-[var(--border)] sm:px-4">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text)] tracking-tight">
                    <CountUp to={95} suffix="%+" />
                  </span>
                  <span className="text-xs font-bold font-display text-[var(--text)] mt-0.5">Précision Modèles</span>
                  <span className="text-[11px] text-[var(--text-muted)]">Classification &amp; Tests</span>
                </div>
                <div className="flex flex-col sm:border-r sm:border-[var(--border)] sm:px-4">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text)] tracking-tight">
                    <CountUp to={15} suffix="+" />
                  </span>
                  <span className="text-xs font-bold font-display text-[var(--text)] mt-0.5">Outils Maîtrisés</span>
                  <span className="text-[11px] text-[var(--text-muted)]">Python, Power BI, SQL</span>
                </div>
                <div className="flex flex-col sm:pl-4">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text)] tracking-tight">
                    <CountUp to={100} suffix="%" />
                  </span>
                  <span className="text-xs font-bold font-display text-[var(--text)] mt-0.5">Rigueur &amp; Passion</span>
                  <span className="text-[11px] text-[var(--text-muted)]">Impact Métier</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Photo with continuous float */}
          <div
            ref={photoColRef}
            className="lg:col-span-5 relative flex justify-center items-end min-h-[420px] sm:min-h-[500px] lg:min-h-[580px]"
          >
            {/* Large coral glow behind subject */}
            <div className="hero-subject-glow" />

            {/* Halo rings (decorative only, no labels) */}
            <div
              className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border border-[#FF5A4E]/20 pointer-events-none transition-transform duration-700 ease-out"
              style={{ transform: `translate3d(${mouseParallax.x * -12}px, ${mouseParallax.y * -12}px, 0)` }}
            />
            <div
              className="absolute w-[440px] h-[440px] sm:w-[520px] sm:h-[520px] rounded-full border border-[#FF5A4E]/10 pointer-events-none transition-transform duration-700 ease-out"
              style={{ transform: `translate3d(${mouseParallax.x * -20}px, ${mouseParallax.y * -20}px, 0)` }}
            />

            {/* Photo */}
            <div
              className="relative z-10 w-full flex items-end justify-center h-full"
              style={{ transform: `translate3d(${mouseParallax.x * 10}px, ${mouseParallax.y * 10}px, 0)`, transition: 'transform 0.6s ease-out' }}
            >
              {!photoError ? (
                <div className="relative w-full flex items-end justify-center">
                  <img
                    src={photoSrc}
                    alt="Alae Ikhlas — Data Analyst"
                    width={440}
                    height={620}
                    onError={handlePhotoError}
                    className="max-h-[75vh] w-auto object-contain object-bottom select-none drop-shadow-[0_20px_40px_rgba(20,27,45,0.4)] dark:drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 0%, black 82%, transparent 98%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 82%, transparent 98%)',
                    }}
                  />
                </div>
              ) : (
                <div className="w-[300px] sm:w-[360px] h-[420px] sm:h-[480px] rounded-t-full rounded-b-3xl border border-[#FF5A4E]/30 bg-gradient-to-b from-[#1B2440] to-[#141B2D] p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                  <div className="architectural-grid absolute inset-0 opacity-40" />
                  <div className="w-24 h-24 rounded-full bg-[#FF5A4E]/20 border border-[#FF5A4E] flex items-center justify-center text-[#FF5A4E] text-3xl font-display font-extrabold mb-4 shadow-[0_0_30px_rgba(255,90,78,0.4)]">
                    AI
                  </div>
                  <p className="font-display font-bold text-lg text-[#F4F1EA] text-center">Alae Ikhlas</p>
                  <p className="text-xs text-[#FF5A4E] font-mono mt-1">Data Analyst &amp; ML</p>
                </div>
              )}

              {/* Floating Tool Icons — icon only, no text, no orbit labels */}
              {floatingIcons.map((icon, idx) => (
                <div
                  key={icon.name}
                  className="absolute pointer-events-none z-20"
                  style={{
                    transform: `translate3d(${icon.x + mouseParallax.x * (idx % 2 === 0 ? 18 : -18)}px, ${icon.y + mouseParallax.y * (idx % 2 === 0 ? 18 : -18)}px, 0)`,
                    animation: `fadeSlideUp 0.5s ease forwards`,
                    animationDelay: `${0.6 + icon.delay}s`,
                    opacity: 0,
                  }}
                >
                  <div className="w-9 h-9 rounded-full bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border)] shadow-lg flex items-center justify-center text-[#FF5A4E]"
                    title={icon.name}
                  >
                    <TechIcon name={icon.name} size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HERO FOOTER ROW */}
        <div
          className="mt-8 sm:mt-12 pt-6 flex items-center justify-between flex-wrap gap-4"
          style={{ animation: 'fadeSlideUp 0.6s ease forwards', animationDelay: '0.8s', opacity: 0 }}
        >
          <button
            onClick={() => scrollTo(heroLatestProject.href)}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[var(--surface)]/80 backdrop-blur-xl border border-[var(--border)] shadow-sm hover:border-[#FF5A4E]/50 hover:shadow-md transition-all group text-left"
            aria-label={`Découvrir le ${heroLatestProject.badge} : ${heroLatestProject.title}`}
          >
            <div className="w-7 h-7 rounded-lg bg-[#FF5A4E]/15 text-[#FF5A4E] flex items-center justify-center font-bold text-xs">
              <Sparkles size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5A4E]">{heroLatestProject.badge}</span>
              <span className="text-xs font-bold text-[var(--text)] group-hover:text-[#FF5A4E] transition-colors flex items-center gap-1">
                {heroLatestProject.title}
                <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>

          <button
            onClick={() => scrollTo('#tools')}
            className="group flex items-center gap-2.5 text-xs font-bold font-display tracking-wide text-[var(--text-muted)] hover:text-[#FF5A4E] transition-colors ml-auto"
            aria-label="Défiler vers la suite"
          >
            <span>Explorer</span>
            <div className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-1.5 transition-colors">
              <div
                className="w-1 h-1.5 rounded-full bg-[#FF5A4E]"
                style={{ animation: 'scrollDot 1.8s ease-in-out infinite' }}
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
