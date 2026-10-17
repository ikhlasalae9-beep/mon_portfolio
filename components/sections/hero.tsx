'use client';

import { motion } from 'motion/react';
import { ArrowDown, MapPin, Briefcase } from 'lucide-react';
import { Portrait } from '@/components/ui/portrait';

function DataVisualizationBg() {
  // Abstract data-points / connected nodes SVG — purely decorative
  const nodes = [
    { cx: 80, cy: 60, r: 3 },
    { cx: 220, cy: 100, r: 2 },
    { cx: 160, cy: 180, r: 4 },
    { cx: 320, cy: 80, r: 2.5 },
    { cx: 380, cy: 200, r: 3 },
    { cx: 260, cy: 280, r: 2 },
    { cx: 100, cy: 320, r: 3.5 },
    { cx: 440, cy: 320, r: 2 },
    { cx: 50, cy: 220, r: 2 },
    { cx: 490, cy: 140, r: 2.5 },
  ];

  const edges = [
    [0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [2, 5], [0, 6], [4, 7], [3, 9], [8, 0], [8, 6],
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="absolute right-0 top-0 w-full h-full opacity-20 dark:opacity-15"
        viewBox="0 0 540 400"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Edges */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].cx}
            y1={nodes[a].cy}
            x2={nodes[b].cx}
            y2={nodes[b].cy}
            stroke="currentColor"
            className="text-accent"
            strokeWidth="0.75"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1 + i * 0.08, duration: 0.8, ease: 'easeOut' }}
          />
        ))}
        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill="currentColor"
            className="text-accent"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.07, duration: 0.4, ease: 'backOut' }}
          />
        ))}
        {/* Pulsing center node */}
        <motion.circle
          cx={220}
          cy={100}
          r={8}
          fill="none"
          stroke="currentColor"
          className="text-accent"
          strokeWidth="1"
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

// Animated background orbs
function BackgroundOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="orb-1 absolute w-[500px] h-[500px] rounded-full -top-32 -right-32 blur-[120px]"
        style={{ background: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
      />
      <div
        className="orb-2 absolute w-[400px] h-[400px] rounded-full bottom-0 left-0 blur-[100px]"
        style={{ background: 'color-mix(in srgb, var(--accent-secondary) 10%, transparent)' }}
      />
    </div>
  );
}

const stagger = {
  container: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center section-padding overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <BackgroundOrbs />
      <DataVisualizationBg />

      <div className="container-max relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            variants={stagger.container}
            initial="hidden"
            animate="show"
          >
            {/* Availability badge */}
            <motion.div variants={stagger.item} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono border"
                style={{
                  borderColor: 'var(--accent)',
                  color: 'var(--accent)',
                  background: 'color-mix(in srgb, var(--accent) 8%, transparent)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                À la recherche d&apos;un stage PFE
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={stagger.item}
              className="text-5xl md:text-6xl xl:text-7xl font-display font-bold leading-none tracking-tight mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              ALAE
              <br />
              <span className="gradient-text">IKHLAS</span>
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={stagger.item}
              className="text-base md:text-lg font-mono uppercase tracking-widest mb-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              Data Analyst · Business Intelligence · Machine Learning
            </motion.p>

            {/* Headline */}
            <motion.p
              variants={stagger.item}
              className="text-2xl md:text-3xl font-display font-semibold leading-tight mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              Turning Data Into{' '}
              <span className="gradient-text">Meaningful</span>{' '}
              Decisions.
            </motion.p>

            {/* Sub-text */}
            <motion.p
              variants={stagger.item}
              className="text-base leading-relaxed max-w-xl mb-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              Étudiant en Intelligence Artificielle, option Data Analyst, je transforme les données en
              analyses pertinentes, visualisations interactives et outils d&apos;aide à la décision.
            </motion.p>

            {/* Location */}
            <motion.div
              variants={stagger.item}
              className="flex items-center gap-1.5 mb-10 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              <MapPin size={14} />
              Tanger, Maroc
            </motion.div>

            {/* CTAs */}
            <motion.div variants={stagger.item} className="flex flex-wrap gap-4">
              <a
                id="hero-cta-projects"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                <Briefcase size={16} />
                Explorer mes projets
              </a>
              <a
                id="hero-cta-contact"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary"
              >
                Me contacter
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative ring behind portrait */}
              <div
                className="absolute -inset-4 rounded-3xl"
                style={{
                  background:
                    'conic-gradient(from 180deg at 50% 50%, var(--accent) 0deg, var(--accent-secondary) 120deg, transparent 240deg)',
                  opacity: 0.15,
                  filter: 'blur(20px)',
                }}
                aria-hidden="true"
              />
              <Portrait size={380} className="relative shadow-2xl" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'var(--text-secondary)' }}
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
