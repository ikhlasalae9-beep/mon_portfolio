'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, ChevronRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Project } from '@/data/projects';

// ─── Project visual illustrations ────────────────────────────────────────────

function ProjectIllustration({ project }: { project: Project }) {
  if (project.id === 'maisondelux') {
    return (
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Bar chart */}
        {[40, 80, 60, 110, 90, 130, 100].map((h, i) => (
          <rect
            key={i}
            x={30 + i * 38}
            y={160 - h}
            width={22}
            height={h}
            rx="4"
            fill={i === 5 ? project.color : `${project.color}50`}
          />
        ))}
        {/* Trend line */}
        <polyline
          points="41,120 79,80 117,100 155,50 193,70 231,30 269,50"
          stroke={project.accentColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* House icon */}
        <path
          d="M230 55 L250 38 L270 55 L270 75 L230 75 Z"
          stroke={project.color}
          strokeWidth="1.5"
          fill="none"
        />
        <rect x="242" y="62" width="16" height="13" rx="1" stroke={project.color} strokeWidth="1.5" fill="none" />
        {/* Labels */}
        <text x="20" y="185" fill="#A5AEC4" fontSize="8" fontFamily="Inter">Prix (MAD)</text>
        <text x="200" y="30" fill={project.accentColor} fontSize="9" fontFamily="Space Grotesk" fontWeight="600">Prédiction ML</text>
      </svg>
    );
  }

  if (project.id === 'glutisafe') {
    return (
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Phone frame */}
        <rect x="110" y="20" width="100" height="160" rx="14" stroke={project.color} strokeWidth="1.5" fill="none" />
        {/* Screen content */}
        <rect x="120" y="35" width="80" height="16" rx="3" fill={`${project.color}30`} />
        {/* Scan lines */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="122" y={58 + i * 10} width="76" height="1.5" rx="1" fill={`${project.color}${i === 1 ? '80' : '30'}`} />
        ))}
        {/* Chat bubble */}
        <rect x="122" y="110" width="50" height="22" rx="6" fill={`${project.color}40`} />
        <text x="130" y="124" fill={project.color} fontSize="7" fontFamily="Inter">Gluten free ✓</text>
        {/* OCR indicator */}
        <circle cx="200" cy="70" r="18" stroke={project.accentColor} strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
        <text x="194" y="74" fill={project.accentColor} fontSize="8" fontFamily="Inter">OCR</text>
        {/* AI label */}
        <text x="60" y="90" fill={project.color} fontSize="20" fontFamily="Space Grotesk" fontWeight="700" opacity="0.15">AI</text>
      </svg>
    );
  }

  if (project.id === 'softquiz') {
    return (
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Browser frame */}
        <rect x="40" y="30" width="240" height="150" rx="10" stroke={project.color} strokeWidth="1.5" fill="none" />
        <rect x="40" y="30" width="240" height="28" rx="10" fill={`${project.color}20`} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={58 + i * 16} cy={44} r="4" fill={`${project.color}${i === 0 ? '80' : i === 1 ? '50' : '30'}`} />
        ))}
        {/* Quiz options */}
        {['Communication', 'Leadership', 'Créativité'].map((label, i) => (
          <g key={i}>
            <rect x="60" y={80 + i * 28} width="200" height="20" rx="5" fill={i === 1 ? `${project.color}30` : `${project.color}12`} stroke={i === 1 ? project.color : 'transparent'} strokeWidth="1" />
            <circle cx="74" cy={90 + i * 28} r="5" stroke={project.color} strokeWidth="1.5" fill={i === 1 ? project.color : 'none'} />
            <text x="84" y={94 + i * 28} fill={i === 1 ? project.color : '#A5AEC4'} fontSize="8" fontFamily="Inter">{label}</text>
          </g>
        ))}
        {/* Score indicator */}
        <text x="200" y="75" fill={project.accentColor} fontSize="18" fontFamily="Space Grotesk" fontWeight="700">85%</text>
      </svg>
    );
  }

  // ITRI IA
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Community graph */}
      {[
        { cx: 160, cy: 100, r: 22, main: true },
        { cx: 80, cy: 60, r: 14, main: false },
        { cx: 240, cy: 60, r: 14, main: false },
        { cx: 80, cy: 145, r: 14, main: false },
        { cx: 240, cy: 145, r: 14, main: false },
        { cx: 160, cy: 30, r: 10, main: false },
        { cx: 160, cy: 168, r: 10, main: false },
      ].map((n, i) => (
        <g key={i}>
          {i > 0 && (
            <line
              x1={160} y1={100}
              x2={n.cx} y2={n.cy}
              stroke={project.color}
              strokeWidth="1"
              opacity="0.4"
            />
          )}
          <circle
            cx={n.cx} cy={n.cy} r={n.r}
            fill={n.main ? `${project.color}40` : `${project.color}20`}
            stroke={project.color}
            strokeWidth="1.5"
          />
        </g>
      ))}
      <text x="151" y="105" fill={project.color} fontSize="12" fontFamily="Space Grotesk" fontWeight="700">IA</text>
      {/* Trello-like columns */}
      {['Todo', 'En cours', 'Fait'].map((label, i) => (
        <g key={i}>
          <rect x={20 + i * 85} y={158} width="75" height="34" rx="4" fill={`${project.color}15`} stroke={`${project.color}30`} strokeWidth="1" />
          <text x={58 + i * 85} y="172" fill={project.color} fontSize="7" fontFamily="Inter" textAnchor="middle">{label}</text>
          <rect x={28 + i * 85} y="176" width="59" height="5" rx="2" fill={`${project.color}30`} />
        </g>
      ))}
    </svg>
  );
}

// ─── Project Modal ────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Visual header */}
          <div
            className="h-48 flex items-center justify-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${project.color}15, ${project.accentColor}15)` }}
          >
            <div className="w-72 h-40">
              <ProjectIllustration project={project} />
            </div>
            {/* Category badge */}
            <span
              className="absolute top-4 left-4 text-xs font-mono px-3 py-1 rounded-full border"
              style={{ borderColor: project.color, color: project.color, background: `${project.color}15` }}
            >
              {project.role}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {project.subtitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center border ml-4 flex-shrink-0"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                aria-label="Fermer"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              {project.description}
            </p>

            {/* Highlights */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: project.color }}>
                Ce que j&apos;ai réalisé
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <ChevronRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: project.color }} />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag" style={{ color: project.color, borderColor: `${project.color}40` }}>
                  {tech}
                </span>
              ))}
            </div>

            {/* External link */}
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
                id={`modal-link-${project.id}`}
              >
                <ExternalLink size={16} />
                Voir le projet
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Featured Project Card ────────────────────────────────────────────────────

function FeaturedProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="card overflow-hidden cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Voir ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Visual */}
        <div
          className="h-64 lg:h-auto relative flex items-center justify-center p-8 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.color}15, ${project.accentColor}10)` }}
        >
          <motion.div
            className="w-full max-w-xs"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <ProjectIllustration project={project} />
          </motion.div>
          <div
            className="absolute top-4 left-4 text-xs font-mono px-2 py-1 rounded border"
            style={{ borderColor: project.color, color: project.color, background: `${project.color}15` }}
          >
            Projet vedette
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: project.color }}>
              {project.category === 'data' ? 'Data & BI' : project.category}
            </p>
            <h3 className="text-2xl font-display font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              {project.subtitle}
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="btn-primary text-sm"
              id={`project-details-${project.id}`}
              onClick={onClick}
            >
              Découvrir le projet
            </button>
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`project-link-${project.id}`}
                className="flex items-center gap-1.5 text-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
                aria-label="Voir le projet en ligne"
              >
                <ExternalLink size={14} />
                Voir en ligne
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Regular Project Card ─────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card overflow-hidden cursor-pointer group flex flex-col"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Voir ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Visual */}
      <div
        className="h-44 flex items-center justify-center p-6 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color}12, ${project.accentColor}08)` }}
      >
        <motion.div
          className="w-full max-w-[220px]"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <ProjectIllustration project={project} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: project.color }}>
          {project.category === 'ai'
            ? 'IA & OCR'
            : project.category === 'web'
            ? 'Full-Stack Web'
            : project.category === 'community'
            ? 'Communauté & Gestion'
            : project.category}
        </p>
        <h3 className="text-lg font-display font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
          {project.subtitle}
        </p>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>
          {project.description.slice(0, 140)}…
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 3).map((t) => (
            <span key={t} className="tech-tag text-xs">
              {t}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="tech-tag text-xs">+{project.technologies.length - 3}</span>
          )}
        </div>
        <button
          className="flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: project.color }}
          id={`project-open-${project.id}`}
        >
          Voir le projet
          <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="section-padding"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="container-max">
        <SectionHeading
          eyebrow="02 — Projets"
          title="Featured Projects."
          subtitle="Des projets conçus pour résoudre de vrais problèmes avec les données."
        />

        {/* Featured */}
        {featured && (
          <div className="mb-8">
            <FeaturedProjectCard project={featured} onClick={() => setActiveProject(featured)} />
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
