'use client';

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, MapPin, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import { educationEntries } from '@/data/education';
import { SectionHeading } from '@/components/ui/section-heading';
import { SpotlightCard } from '@/components/react-bits/spotlight-card';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Education() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !pathRef.current || !containerRef.current) return;
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReduced) return;

      const path = pathRef.current;
      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'bottom 85%',
        scrub: 0.8,
        onUpdate: (self) => {
          const drawLength = length * self.progress;
          gsap.set(path, { strokeDashoffset: length - drawLength });
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="education"
      className="section-padding bg-[var(--bg-secondary)]/75 backdrop-blur-[2px] relative overflow-hidden"
    >
      <div className="container-max" ref={containerRef}>
        {/* Section Header: max 1 short line under 12 words */}
        <SectionHeading
          eyebrow="04 — Formation"
          title="Parcours Académique."
          subtitle="Fondations scientifiques et spécialisation de pointe en analyse de données."
        />

        <div className="relative max-w-4xl mx-auto pt-4 pb-8">
          {/* Timeline Center SVG Line (Desk: center, Mobile: left-6) */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-1/2 -translate-x-1/2 w-4 pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 16 600"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Subtle background line */}
              <line
                x1="8"
                y1="0"
                x2="8"
                y2="600"
                stroke="var(--border)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Scrubbed Drawing Line in Electric Coral #FF5A4E */}
              <path
                ref={pathRef}
                d="M 8 0 L 8 600"
                stroke="#FF5A4E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="space-y-12 sm:space-y-16">
            {educationEntries.map((entry, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={entry.id}
                  className={`relative flex items-center flex-col sm:flex-row ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Dot popping in */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-6 z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="w-8 h-8 rounded-full bg-[var(--surface)] border-2 border-[#FF5A4E] shadow-[0_0_15px_rgba(255,90,78,0.4)] flex items-center justify-center text-[#FF5A4E]"
                    >
                      <GraduationCap size={15} />
                    </motion.div>
                  </div>

                  {/* Empty Spacer on opposite side for desktop alternation */}
                  <div className="hidden sm:block w-1/2" />

                  {/* Card side */}
                  <div className="w-full sm:w-1/2 pl-14 sm:pl-0 sm:px-8">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <SpotlightCard className="p-6 rounded-2xl">
                        {/* Header Row */}
                        <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                          <span className="badge-pill text-[10px]">
                            {entry.current ? (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A4E] animate-pulse" />
                                En cours
                              </>
                            ) : (
                              'Diplômé'
                            )}
                          </span>
                          <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1">
                            <Calendar size={12} className="text-[#FF5A4E]" />
                            {entry.period}
                          </span>
                        </div>

                        {/* Degree Title */}
                        <h3 className="font-display font-extrabold text-base sm:text-lg text-[var(--text)] mb-0.5">
                          {entry.degree}
                        </h3>

                        {/* Option or Institution */}
                        {entry.option && (
                          <p className="text-xs font-bold text-[#FF5A4E] mb-2">
                            {entry.option}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-3">
                          <MapPin size={12} className="text-[#FF5A4E] shrink-0" />
                          <span>{entry.institution} — {entry.location}</span>
                        </div>

                        {/* ONE short line: max 12 words */}
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-3 border-t border-[var(--border)]">
                          {entry.id === 'ismontic'
                            ? "Analyse de données, Business Intelligence et Machine Learning appliqué."
                            : "Socle scientifique et modélisation analytique fondatrice de la rigueur data."}
                        </p>
                      </SpotlightCard>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
