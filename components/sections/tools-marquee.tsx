'use client';

import React from 'react';
import { LogoLoop } from '@/components/react-bits/logo-loop';
import { TechIcon } from '@/components/ui/tech-icons';

const tools = [
  { name: 'Python', role: 'Data Science & Scripting' },
  { name: 'SQL', role: 'PostgreSQL & Requêtage' },
  { name: 'Power BI', role: 'Dashboards & DAX' },
  { name: 'Excel', role: 'TCD & Analyse Avancée' },
  { name: 'Streamlit', role: 'Applications Web Data' },
  { name: 'Pandas', role: 'Data Wrangling' },
  { name: 'NumPy', role: 'Calculs Vectorisés' },
  { name: 'Scikit-learn', role: 'Machine Learning' },
  { name: 'Git', role: 'Version Control' },
  { name: 'Talend', role: 'Pipelines ETL' },
  { name: 'Next.js', role: 'Front-End & API' },
  { name: 'Supabase', role: 'Base de Données Cloud' },
];

export function ToolsMarquee() {
  return (
    <section
      id="tools"
      className="py-10 border-y border-[var(--border)] bg-[var(--surface)]/50 relative overflow-hidden"
      aria-label="Technologies et outils maîtrisés"
    >
      <div className="container-max px-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A4E]" />
          <span className="text-[11px] font-display font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Stack Technique & Écosystème
          </span>
        </div>
        <span className="text-[11px] font-mono text-[var(--text-muted)] opacity-70">
          Scroll-accelerated
        </span>
      </div>

      <LogoLoop speed={35} direction="left" className="py-2">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="group mx-3 sm:mx-4 px-4 py-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[#FF5A4E]/50 hover:shadow-[0_0_20px_rgba(255,90,78,0.2)] transition-all duration-300 flex items-center gap-3 shrink-0 cursor-default"
          >
            <div className="w-8 h-8 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[#FF5A4E] group-hover:scale-110 transition-all duration-300">
              <TechIcon name={tool.name} size={18} />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xs sm:text-sm text-[var(--text)] group-hover:text-[#FF5A4E] transition-colors">
                {tool.name}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-medium">
                {tool.role}
              </span>
            </div>
          </div>
        ))}
      </LogoLoop>
    </section>
  );
}
