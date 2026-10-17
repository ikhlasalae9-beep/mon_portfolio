'use client';

import { motion } from 'motion/react';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { educationEntries } from '@/data/education';
import { SectionHeading } from '@/components/ui/section-heading';

export function Education() {
  return (
    <section
      id="education"
      className="section-padding"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="container-max">
        <SectionHeading
          eyebrow="04 — Formation"
          title="My Learning Journey."
          subtitle="Un parcours académique ancré dans les sciences et orienté vers l'intelligence artificielle."
        />

        <div className="max-w-2xl">
          {educationEntries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-10 pb-12 last:pb-0"
            >
              {/* Timeline connector */}
              {i < educationEntries.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 + 0.3 }}
                  className="timeline-line"
                  style={{ transformOrigin: 'top' }}
                />
              )}

              {/* Dot */}
              <div className="absolute left-0 top-1 flex items-center justify-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: entry.current
                      ? 'var(--accent)'
                      : 'var(--bg-surface)',
                    border: entry.current ? 'none' : '1px solid var(--border)',
                    color: entry.current ? '#fff' : 'var(--text-secondary)',
                    boxShadow: entry.current ? '0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent)' : 'none',
                  }}
                >
                  <GraduationCap size={14} />
                </div>
              </div>

              {/* Card */}
              <div className="card p-5 ml-2">
                {/* Status badge */}
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <h3
                      className="font-display font-bold text-base leading-tight"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {entry.degree}
                    </h3>
                    {entry.option && (
                      <p
                        className="text-sm font-medium mt-0.5 gradient-text"
                      >
                        {entry.option}
                      </p>
                    )}
                  </div>
                  {entry.current && (
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border flex-shrink-0"
                      style={{
                        borderColor: 'var(--accent)',
                        color: 'var(--accent)',
                        background: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      En cours
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mb-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    {entry.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {entry.period}
                  </span>
                </div>

                {/* Institution */}
                <p
                  className="text-sm font-medium mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {entry.institution}
                </p>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {entry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
