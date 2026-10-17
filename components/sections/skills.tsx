'use client';

import { motion } from 'motion/react';
import { Brain, BarChart3, Code2, Wrench } from 'lucide-react';
import { skillGroups } from '@/data/skills';
import { SectionHeading } from '@/components/ui/section-heading';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain,
  BarChart3,
  Code2,
  Wrench,
};

const groupColors = ['#5B8CFF', '#A78BFA', '#34D399', '#F59E0B'];

export function Skills() {
  return (
    <section
      id="skills"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="container-max">
        <SectionHeading
          eyebrow="03 — Compétences"
          title="Tools I Use to Make Data Useful."
          subtitle="Un écosystème maîtrisé — de la collecte à la visualisation, en passant par la modélisation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => {
            const Icon = iconMap[group.icon];
            const color = groupColors[gi];

            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="card p-6"
              >
                {/* Group header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `color-mix(in srgb, ${color} 12%, transparent)`,
                      color,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3
                    className="font-display font-semibold text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {group.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.1 + si * 0.04, duration: 0.3 }}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border cursor-default transition-all duration-200"
                      style={{
                        borderColor: `${color}40`,
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-primary)',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = color;
                        el.style.color = color;
                        el.style.background = `color-mix(in srgb, ${color} 8%, transparent)`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = `${color}40`;
                        el.style.color = 'var(--text-secondary)';
                        el.style.background = 'var(--bg-primary)';
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: color }}
                      />
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative data bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 h-1 rounded-full overflow-hidden"
          style={{
            background:
              'linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 50%, var(--accent) 100%)',
            transformOrigin: 'left',
          }}
        />
      </div>
    </section>
  );
}
