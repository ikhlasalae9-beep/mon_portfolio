'use client';

import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/section-heading';
import { BarChart3, Brain, Database, Target } from 'lucide-react';

const strengths = [
  {
    icon: Brain,
    title: 'Pensée Analytique',
    description:
      'Capacité à décomposer des problèmes complexes en hypothèses testables et à formuler des conclusions rigoureuses à partir des données.',
  },
  {
    icon: BarChart3,
    title: 'Visualisation & BI',
    description:
      'Transformation de données brutes en dashboards analytiques, KPIs pertinents et visualisations compréhensibles par les décideurs.',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description:
      'Collecte, nettoyage, modélisation et structuration des données pour garantir leur qualité et leur utilisabilité dans des analyses fiables.',
  },
  {
    icon: Target,
    title: 'Machine Learning',
    description:
      'Conception et déploiement de modèles prédictifs intégrés à des applications réelles pour apporter une valeur métier concrète.',
  },
];

export function About() {
  return (
    <section
      id="about"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — heading + story */}
          <div>
            <SectionHeading
              eyebrow="01 — À propos"
              title="Beyond the Data."
              subtitle="Ce qui me passionne, ce n'est pas seulement les chiffres — c'est ce qu'ils révèlent."
            />

            <div className="space-y-5" style={{ color: 'var(--text-secondary)' }}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="leading-relaxed text-base"
              >
                Étudiant en <strong style={{ color: 'var(--text-primary)' }}>Intelligence Artificielle</strong>, option{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Data Analyst</strong> à l&apos;ISMONTIC de Tanger, je
                construis une expertise au croisement de l&apos;analyse de données, de la Business Intelligence et du Machine
                Learning.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="leading-relaxed text-base"
              >
                Mon approche repose sur la{' '}
                <strong style={{ color: 'var(--text-primary)' }}>rigueur analytique</strong> acquise en sciences
                physiques, combinée à une curiosité constante pour les outils et les méthodes qui permettent de rendre
                les données réellement utiles.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="leading-relaxed text-base"
              >
                De l&apos;exploration et du nettoyage des données à la modélisation en schéma en étoile, en passant par la
                conception de tableaux de bord Power BI et le déploiement de modèles prédictifs, je cherche à créer des{' '}
                <strong style={{ color: 'var(--text-primary)' }}>outils d&apos;aide à la décision</strong> qui ont un impact
                réel.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-4"
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-mono"
                  style={{
                    borderColor: 'var(--accent)',
                    color: 'var(--accent)',
                    background: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  Disponible pour un Stage PFE — Tanger, Maroc
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right — strengths grid */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strengths.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="card p-5"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                        color: 'var(--accent)',
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <h3
                      className="font-display font-semibold text-sm mb-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {s.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 pl-5 border-l-2 italic text-sm leading-relaxed"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--text-secondary)',
              }}
            >
              &ldquo;La donnée sans contexte n&apos;est qu&apos;un nombre. Avec la bonne question, elle devient une décision.&rdquo;
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
