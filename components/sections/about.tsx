'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  MapPin,
  Calendar,
  Sparkles,
  Database,
  BarChart3,
  Brain,
  Workflow,
  CheckCircle2,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { SpotlightCard } from '@/components/react-bits/spotlight-card';
import { CountUp } from '@/components/react-bits/count-up';

export function About() {
  return (
    <section
      id="about"
      className="section-padding bg-[var(--bg-secondary)]/75 backdrop-blur-[2px] relative overflow-hidden"
    >
      <div className="container-max">
        {/* Section Header: max 1 short line under 12 words */}
        <SectionHeading
          eyebrow="01 — À propos"
          title="Profil & Expertise."
          subtitle="Transformer la donnée en leviers décisionnels mesurables et stratégiques."
        />

        {/* Bento Grid: visual tiles, stagger on scroll, very little text */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* Tile 1: Formation & Localisation (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-6 lg:col-span-4"
          >
            <SpotlightCard className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF5A4E]/15 text-[#FF5A4E] flex items-center justify-center">
                    <GraduationCap size={20} />
                  </div>
                  <span className="badge-pill text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A4E] animate-pulse" />
                    En cours
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-[var(--text)] mb-1">
                  ISMONTIC Tanger
                </h3>
                <p className="text-xs text-[#FF5A4E] font-semibold mb-4">
                  Option Data Analyst · IA
                </p>

                <div className="space-y-2 text-xs text-[var(--text-muted)] border-t border-[var(--border)] pt-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-[#FF5A4E] shrink-0" />
                    <span>Tanger, Maroc</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-[#FF5A4E] shrink-0" />
                    <span>2025 — Présent (PFE)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-[#FF5A4E] shrink-0" />
                    <span>Bac Sciences Physiques (2024)</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-bold text-[var(--text)]">
                <span>Disponibilité PFE</span>
                <span className="text-[#FF5A4E]">Immédiate</span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Tile 2: Mini Data-Viz Donut Chart (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-6 lg:col-span-4"
          >
            <SpotlightCard className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-display font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Pôles d&apos;Expertise
                  </span>
                  <BarChart3 size={18} className="text-[#FF5A4E]" />
                </div>

                {/* SVG Donut Chart */}
                <div className="flex items-center justify-center py-2">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {/* Background Circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="var(--border)"
                        strokeWidth="12"
                      />
                      {/* BI & Dashboards: 45% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#FF5A4E"
                        strokeWidth="12"
                        strokeDasharray="238.76"
                        strokeDashoffset="131.3" // 238.76 * (1 - 0.45)
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      {/* Machine Learning: 30% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="rgba(255, 90, 78, 0.5)"
                        strokeWidth="12"
                        strokeDasharray="238.76"
                        strokeDashoffset="167.1" // 238.76 * (1 - 0.30)
                        strokeLinecap="round"
                        style={{ transform: 'rotate(162deg)', transformOrigin: '50px 50px' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xl font-display font-extrabold text-[var(--text)]">
                        100%
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-[#FF5A4E] font-bold">
                        Data-Driven
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend with clean indicators */}
              <div className="grid grid-cols-3 gap-1 pt-3 border-t border-[var(--border)] text-[10px]">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF5A4E]" />
                    <span className="font-bold text-[var(--text)]">45%</span>
                  </div>
                  <span className="text-[var(--text-muted)] truncate">Data & BI</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF5A4E]/50" />
                    <span className="font-bold text-[var(--text)]">30%</span>
                  </div>
                  <span className="text-[var(--text-muted)] truncate">ML & IA</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--text-muted)]" />
                    <span className="font-bold text-[var(--text)]">25%</span>
                  </div>
                  <span className="text-[var(--text-muted)] truncate">ETL & SQL</span>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Tile 3: Big Number & Sparkline (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-12 lg:col-span-4"
          >
            <SpotlightCard className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-display font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Précision & Métriques
                  </span>
                  <TrendingUp size={18} className="text-[#FF5A4E]" />
                </div>

                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-4xl sm:text-5xl font-display font-extrabold text-[var(--text)]">
                    <CountUp to={95} suffix="%" />
                  </span>
                  <span className="text-xs text-[#FF5A4E] font-bold">+</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mb-3">
                  Score ROC-AUC et fidélité de prédiction sur modèles de classification client.
                </p>

                {/* Animated SVG Sparkline in Coral & Navy */}
                <div className="w-full h-12 pt-1">
                  <svg viewBox="0 0 100 24" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF5A4E" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#FF5A4E" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,18 Q 15,22 25,12 T 50,8 T 75,14 T 100,4 L 100,24 L 0,24 Z"
                      fill="url(#sparklineGrad)"
                    />
                    <path
                      d="M 0,18 Q 15,22 25,12 T 50,8 T 75,14 T 100,4"
                      fill="none"
                      stroke="#FF5A4E"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="4" r="3" fill="#FF5A4E" className="animate-ping" />
                    <circle cx="100" cy="4" r="2.5" fill="#141B2D" stroke="#FF5A4E" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                <span>Validation Croisée</span>
                <span className="font-bold text-[var(--text)]">K-Fold 5x</span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Tile 4: Analytical Visual Chips (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="md:col-span-6"
          >
            <SpotlightCard className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A4E]" />
                  <span className="text-xs font-display font-bold uppercase tracking-wider text-[var(--text)]">
                    Pratiques & Méthodologies
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border)] flex items-center gap-3">
                    <Database size={16} className="text-[#FF5A4E] shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[var(--text)]">Schéma en Étoile</span>
                      <span className="text-[10px] text-[var(--text-muted)]">Faits & Dimensions</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border)] flex items-center gap-3">
                    <BarChart3 size={16} className="text-[#FF5A4E] shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[var(--text)]">Mesures DAX</span>
                      <span className="text-[10px] text-[var(--text-muted)]">Time Intelligence</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border)] flex items-center gap-3">
                    <Workflow size={16} className="text-[#FF5A4E] shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[var(--text)]">Pipelines ETL</span>
                      <span className="text-[10px] text-[var(--text-muted)]">Ingestion & Parsing</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border)] flex items-center gap-3">
                    <Brain size={16} className="text-[#FF5A4E] shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[var(--text)]">Machine Learning</span>
                      <span className="text-[10px] text-[var(--text-muted)]">Scikit-learn Pipelines</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-[var(--text-muted)] italic">
                Rigueur scientifique et structuration méthodique des données.
              </p>
            </SpotlightCard>
          </motion.div>

          {/* Tile 5: Rigor & Code Cleanliness (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-6"
          >
            <SpotlightCard className="p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Cpu size={16} className="text-[#FF5A4E]" />
                  <span className="text-xs font-display font-bold uppercase tracking-wider text-[var(--text)]">
                    Exigence & Qualité
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--text)] font-semibold">Traçabilité & Reproductibilité</span>
                    <span className="font-mono text-[#FF5A4E] font-bold">100% Git</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--surface-2)] overflow-hidden">
                    <div className="h-full bg-[#FF5A4E] rounded-full w-full" />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[var(--text)] font-semibold">Nettoyage & Imputation Robuste</span>
                    <span className="font-mono text-[#FF5A4E] font-bold">Regex / Pandas</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--surface-2)] overflow-hidden">
                    <div className="h-full bg-[#FF5A4E] rounded-full w-[95%]" />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[var(--text)] font-semibold">Ergonomie Décisionnelle</span>
                    <span className="font-mono text-[#FF5A4E] font-bold">Power BI / UX</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--surface-2)] overflow-hidden">
                    <div className="h-full bg-[#FF5A4E] rounded-full w-[90%]" />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                <span>Objectif de livraison</span>
                <span className="text-[var(--text)] font-bold">Impact Métier Immédiat</span>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
