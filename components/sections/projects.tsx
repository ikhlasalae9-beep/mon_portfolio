'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Info,
  Maximize2,
  Code2,
  BarChart3,
  Brain,
  Globe,
  Users,
  Eye,
  FileDown,
  Layers,
} from 'lucide-react';
import {
  projects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from '@/data/projects';
import { SectionHeading } from '@/components/ui/section-heading';
import { TechIcon } from '@/components/ui/tech-icons';
import { Github } from '@/components/ui/icons';
import { SpotlightCard } from '@/components/react-bits/spotlight-card';
import { useSmoothScroll } from '@/components/providers/smooth-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Category icon map
const categoryIcons = {
  BarChart3,
  Brain,
  Globe,
  Users,
};

// ─── 16:9 Cover Thumbnail / SVG Illustration / Elegant Placeholder ──────────

function ProjectCover({
  project,
  className = '',
}: {
  project: Project;
  className?: string;
}) {
  const [imageError, setImageError] = useState(false);

  // Real photos ONLY for MaisonDeLUX and GlutiSafe
  const useRealPhoto =
    (project.id === 'maisondelux' || project.id === 'glutisafe') &&
    project.cover &&
    !imageError;

  if (useRealPhoto) {
    return (
      <div className={`relative w-full aspect-video overflow-hidden bg-[var(--surface-2)] rounded-t-2xl ${className}`}>
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141B2D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    );
  }

  // SoftQuiz & ITRI IA keep authentic SVG illustrations in navy/coral
  if (project.id === 'softquiz') {
    return (
      <div className={`relative w-full aspect-video overflow-hidden bg-gradient-to-br from-[#1B2440] to-[#141B2D] p-6 flex flex-col items-center justify-center rounded-t-2xl ${className}`}>
        <div className="architectural-grid absolute inset-0 opacity-30" />
        <div className="w-14 h-14 rounded-2xl bg-[#FF5A4E]/15 border border-[#FF5A4E]/40 flex items-center justify-center text-[#FF5A4E] shadow-[0_0_25px_rgba(255,90,78,0.25)] transition-transform duration-300 group-hover:scale-110">
          <Globe size={26} strokeWidth={1.5} />
        </div>
        <span className="mt-3 text-xs font-display font-extrabold text-[#F4F1EA] tracking-wide">
          SoftQuiz Platform
        </span>
        <span className="text-[10px] text-[#FF5A4E] font-mono mt-0.5">
          Web Interactive UI
        </span>
      </div>
    );
  }

  if (project.id === 'itria') {
    return (
      <div className={`relative w-full aspect-video overflow-hidden bg-gradient-to-br from-[#1B2440] to-[#141B2D] p-6 flex flex-col items-center justify-center rounded-t-2xl ${className}`}>
        <div className="architectural-grid absolute inset-0 opacity-30" />
        <div className="w-14 h-14 rounded-2xl bg-[#FF5A4E]/15 border border-[#FF5A4E]/40 flex items-center justify-center text-[#FF5A4E] shadow-[0_0_25px_rgba(255,90,78,0.25)] transition-transform duration-300 group-hover:scale-110">
          <Users size={26} strokeWidth={1.5} />
        </div>
        <span className="mt-3 text-xs font-display font-extrabold text-[#F4F1EA] tracking-wide">
          ITRI IA Community
        </span>
        <span className="text-[10px] text-[#FF5A4E] font-mono mt-0.5">
          Workshops & Management
        </span>
      </div>
    );
  }

  // Streamlit Apps (Projet Éducation, Churn Bancaire) or Power BI Dashboards
  const isPowerBI = project.category === 'power-bi';

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden flex flex-col items-center justify-center p-6 border-b border-[var(--border)] bg-[var(--surface-2)]/60 rounded-t-2xl ${className}`}
    >
      <div className="architectural-grid absolute inset-0 opacity-40 pointer-events-none" />

      <div className="w-12 h-12 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[#FF5A4E] shadow-sm mb-2 transition-transform duration-300 group-hover:scale-110">
        <TechIcon name={isPowerBI ? 'power bi' : 'streamlit'} size={24} />
      </div>

      <span className="text-[11px] font-display font-bold uppercase tracking-wider text-[var(--text)] text-center line-clamp-1">
        {isPowerBI ? 'Power BI Dashboard' : 'Application Streamlit'}
      </span>

      <span className="text-[10px] text-[var(--text-muted)] font-medium mt-0.5">
        {project.liveUrl ? 'Prêt à explorer' : 'À venir · Prototype'}
      </span>
    </div>
  );
}

// ─── Project Details Modal (Carousel, Iframe Embed, Focus Trap) ─────────────

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive'>('overview');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Esc key and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Détails du projet ${project.title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={modalRef}
        data-lenis-prevent
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl p-6 sm:p-8 flex flex-col gap-6"
      >
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="badge-pill text-[10px]">
                {project.category === 'power-bi'
                  ? 'Power BI & BI'
                  : project.category === 'streamlit-ml'
                  ? 'Streamlit & ML'
                  : project.category === 'ia-web'
                  ? 'IA & Web'
                  : 'Communauté'}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">{project.year}</span>
              <span className="text-xs text-[var(--text-muted)]">·</span>
              <span className="text-xs text-[#FF5A4E] font-semibold">{project.role}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--text)]">
              {project.title}
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">{project.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[#FF5A4E] hover:border-[#FF5A4E] transition-colors shrink-0"
            aria-label="Fermer la modal"
          >
            <X size={17} />
          </button>
        </div>

        {/* Tab switch if embedUrl is available */}
        {project.embedUrl && (
          <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-display font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#FF5A4E] text-[#141B2D]'
                  : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Vue d&apos;ensemble
            </button>
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-display font-bold transition-all ${
                activeTab === 'interactive'
                  ? 'bg-[#FF5A4E] text-[#141B2D]'
                  : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Application Interactive
            </button>
          </div>
        )}

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Visual Cover */}
            <div className="rounded-xl overflow-hidden border border-[var(--border)]">
              <ProjectCover project={project} />
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-display font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Description du Projet
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--text)]">
                {project.description}
              </p>
            </div>

            {/* Highlights */}
            {project.highlights.length > 0 && (
              <div>
                <h3 className="text-xs font-display font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                  Réalisations & Points Clés
                </h3>
                <ul className="space-y-2">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A4E] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tool Icons Row */}
            <div>
              <h3 className="text-xs font-display font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                Technologies Employées
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <div
                    key={tool}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-xs font-bold text-[var(--text)]"
                  >
                    <TechIcon name={tool} size={14} className="text-[#FF5A4E]" />
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Embed */}
        {activeTab === 'interactive' && project.embedUrl && (
          <div className="space-y-3">
            <div className="relative w-full h-[480px] rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface-2)]">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-[var(--text-muted)]">
                  Chargement de l&apos;application interactive...
                </div>
              )}
              <iframe
                src={project.embedUrl}
                title={project.title}
                onLoad={() => setIframeLoaded(true)}
                className="w-full h-full border-0"
              />
            </div>
            <div className="flex justify-end">
              <a
                href={project.liveUrl || project.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2 px-4"
              >
                <span>Ouvrir dans un nouvel onglet</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2 px-4"
              >
                <Eye size={14} />
                <span>Voir en direct</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2 px-4"
              >
                <Github size={14} />
                <span>Code source</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-display font-bold text-[var(--text-muted)] hover:text-[#FF5A4E] transition-colors ml-auto"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Single Uniform Project Card (3D tilt + stagger, strictly aligned) ────────

function ProjectCard({
  project,
  onOpenModal,
  animIndex = 0,
}: {
  project: Project;
  onOpenModal: (project: Project) => void;
  animIndex?: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);

  // 3D tilt on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 14;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateZ(2px)`;
  };
  const handleMouseLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <div ref={cardRef} className="project-card-anim h-full" style={{ opacity: 0, transform: 'translateY(24px)' }}>
      <div
        ref={tiltRef}
        style={{ transition: 'transform 0.15s ease', transformStyle: 'preserve-3d', height: '100%' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <SpotlightCard
          className="group flex flex-col justify-between h-full rounded-2xl cursor-pointer hover:border-[#FF5A4E]/40 hover:shadow-[0_0_30px_rgba(255,90,78,0.12)] transition-all duration-300"
          onClick={() => onOpenModal(project)}
        >
          <div>
            {/* Cover 16:9 top */}
            <ProjectCover project={project} />

            <div className="p-5 flex flex-col">
              {/* Category Chip + Year */}
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="text-[#FF5A4E] font-display font-extrabold tracking-wide uppercase">
                  {project.category === 'power-bi'
                    ? 'Power BI'
                    : project.category === 'streamlit-ml'
                    ? 'Streamlit / ML'
                    : project.category === 'ia-web'
                    ? 'IA / Web'
                    : 'Communauté'}
                </span>
                <span className="font-mono text-[var(--text-muted)] font-semibold">{project.year}</span>
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text)] line-clamp-1 mb-1.5 group-hover:text-[#FF5A4E] transition-colors">
                {project.title}
              </h3>

              {/* ONE short line: max 10 words */}
              <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed min-h-[2.5rem]">
                {project.shortDescription}
              </p>
            </div>
          </div>

          <div className="px-5 pb-5 pt-3 border-t border-[var(--border)] flex items-center justify-between gap-3">
            {/* Row of monochrome tool icons */}
            <div className="flex items-center gap-2 overflow-hidden text-[var(--text-muted)]">
              {project.tools.slice(0, 4).map((tool) => (
                <span
                  key={tool}
                  title={tool}
                  className="w-6 h-6 rounded-md bg-[var(--surface-2)] flex items-center justify-center transition-colors group-hover:text-[#FF5A4E]"
                >
                  <TechIcon name={tool} size={13} />
                </span>
              ))}
              {project.tools.length > 4 && (
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  +{project.tools.length - 4}
                </span>
              )}
            </div>

            {/* Action button with slide-in arrow */}
            <div className="flex items-center gap-1.5 text-xs font-display font-bold text-[var(--text)] group-hover:text-[#FF5A4E] transition-colors shrink-0">
              <span>Détails</span>
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

// ─── Animated Category Block ──────────────────────────────────────────────────

function CategoryBlock({
  category,
  onOpenModal,
}: {
  category: { id: string; name: string; iconName: 'BarChart3' | 'Brain' | 'Globe' | 'Users'; projects: Project[] };
  onOpenModal: (project: Project) => void;
}) {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const Icon = categoryIcons[category.iconName] || BarChart3;

  useGSAP(
    () => {
      if (!blockRef.current) return;

      // Register ScrollTrigger if not already registered
      if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      // Category header slide in from left + coral line draw
      if (headerRef.current && lineRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
          }
        );
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 0.8, ease: 'power3.out', transformOrigin: 'left center',
            scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
          }
        );
      }

      // Cards stagger entrance
      const cards = blockRef.current.querySelectorAll('.project-card-anim');
      if (cards.length > 0) {
        gsap.to(cards, {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
          scrollTrigger: { trigger: blockRef.current, start: 'top 80%', once: true },
        });
      }

      return () => ScrollTrigger.getAll().forEach(t => t.kill());
    },
    { scope: blockRef }
  );

  return (
    <div ref={blockRef} id={`cat-${category.id}`} className="scroll-mt-28">
      {/* Category Header with animated coral line */}
      <div ref={headerRef} className="mb-6" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF5A4E]/15 text-[#FF5A4E] flex items-center justify-center">
              <Icon size={18} strokeWidth={1.5} />
            </div>
            <h3 className="font-display font-extrabold text-lg sm:text-xl text-[var(--text)]">
              {category.name}
            </h3>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {category.projects.length} {category.projects.length > 1 ? 'projets' : 'projet'}
          </span>
        </div>
        {/* Self-drawing coral line */}
        <div className="relative h-px bg-[var(--border)] overflow-hidden">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-gradient-to-r from-[#FF5A4E] via-[#FF5A4E]/50 to-transparent"
            style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
          />
        </div>
      </div>

      {/* Uniform Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.projects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenModal={onOpenModal}
            animIndex={idx}
          />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN PROJECTS SECTION ──────────────────────────────────────────────────

export function Projects() {
  const { scrollTo } = useSmoothScroll();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Featured project: MaisonDeLUX
  const featuredProject = useMemo(
    () => projects.find((p) => p.id === 'maisondelux') || projects[0],
    []
  );

  // Grouped projects by category, excluding featured
  const categorizedProjects = useMemo(() => {
    return projectCategories
      .map((cat) => {
        const items = projects.filter((p) => p.category === cat.id && p.id !== 'maisondelux');
        return {
          ...cat,
          projects: items,
        };
      })
      .filter((group) => group.projects.length > 0);
  }, []);

  const handleChipClick = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      scrollTo('#projects', { offset: -60 });
    } else {
      scrollTo(`#cat-${catId}`, { offset: -80 });
    }
  };

  return (
    <section
      id="projects"
      className="section-padding bg-[var(--bg-primary)]/75 backdrop-blur-[2px] relative"
    >
      <div className="container-max">
        {/* Section Header */}
        <SectionHeading
          eyebrow="03 — Projets & Réalisations"
          title="Données en Action."
          subtitle="Tableaux de bord décisionnels, modèles prédictifs et solutions logicielles complètes."
        />

        {/* Sticky Filter Bar */}
        <div className="sticky top-20 z-30 mb-10 py-3 backdrop-blur-xl bg-[var(--surface)]/80 rounded-2xl border border-[var(--border)] px-4 flex items-center justify-between gap-4 flex-wrap shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => handleChipClick('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-display font-bold tracking-wide transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#FF5A4E] text-[#141B2D] shadow-sm'
                  : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Tous ({projects.length})
            </button>

            {categorizedProjects.map((cat) => {
              const Icon = categoryIcons[cat.iconName] || BarChart3;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleChipClick(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-display font-bold tracking-wide transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#FF5A4E] text-[#141B2D] shadow-sm'
                      : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <Icon size={13} />
                  <span>{cat.name}</span>
                  <span className="opacity-75 text-[10px]">({cat.projects.length})</span>
                </button>
              );
            })}
          </div>

          <span className="hidden lg:inline text-xs font-mono text-[var(--text-muted)]">
            {projects.length} réalisations au total
          </span>
        </div>

        {/* ─── 1. FEATURED PROJECT (MaisonDeLUX) ─────────────────────────── */}
        {featuredProject && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-[#FF5A4E]" />
              <span className="text-xs font-display font-bold uppercase tracking-wider text-[#FF5A4E]">
                Projet Vedette Phare
              </span>
            </div>

            <SpotlightCard
              className="p-6 sm:p-8 rounded-3xl cursor-pointer group"
              onClick={() => setSelectedProject(featuredProject)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Big Real Photo Cover 16:9 */}
                <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[var(--border)] shadow-md">
                  <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface-2)]">
                    <img
                      src="/projects/maisondeluxcover.png"
                      alt="MaisonDeLUX — Projet Phare"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Right: Info */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge-pill text-[10px]">
                        Pipeline Data · Machine Learning · Power BI
                      </span>
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        {featuredProject.year}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--text)] group-hover:text-[#FF5A4E] transition-colors mb-2">
                      {featuredProject.title}
                    </h3>

                    <p className="text-sm font-semibold text-[#FF5A4E] mb-3">
                      {featuredProject.subtitle}
                    </p>

                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                      {featuredProject.shortDescription}
                    </p>

                    {/* Tool Icons */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {featuredProject.tools.map((t) => (
                        <div
                          key={t}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--surface-2)] text-xs font-bold text-[var(--text)] border border-[var(--border)]"
                        >
                          <TechIcon name={t} size={14} className="text-[#FF5A4E]" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="btn-primary text-xs py-2.5 px-5">
                      <span>Explorer l&apos;étude de cas</span>
                      <ChevronRight size={14} />
                    </button>
                    {featuredProject.liveUrl && (
                      <a
                        href={featuredProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-secondary text-xs py-2.5 px-4"
                      >
                        <ExternalLink size={14} />
                        <span>Visiter</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        )}

        {/* ─── 2. ANIMATED CATEGORY BLOCKS ─────────────────────────────────── */}
        <div className="space-y-16">
          {categorizedProjects.map((category) => (
            <CategoryBlock
              key={category.id}
              category={category}
              onOpenModal={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
