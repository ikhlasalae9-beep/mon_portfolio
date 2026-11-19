'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  BarChart3,
  Code,
  Database,
  Table,
  Workflow,
  Binary,
  Cpu,
  Filter,
  Search,
  Layers,
  LineChart,
  GitBranch,
  TrendingUp,
  Activity,
  Percent,
  FileCode,
  Globe,
  ScanText,
  PieChart,
  Target,
  Network,
  Server,
  Code2,
  Terminal,
  Component,
  Cloud,
  Boxes,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  LayoutGrid,
  Orbit as OrbitIcon,
  X,
  Sparkle,
} from 'lucide-react';
import {
  orbitalSkills,
  skillCategories,
  type SkillCategory,
  type OrbitalSkill,
} from '@/data/skills';
import { SectionHeading } from '@/components/ui/section-heading';
import { Github } from '@/components/ui/icons';
import { TechIcon } from '@/components/ui/tech-icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Reduced motion subscription
const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
};
const getReducedMotionSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
const getReducedMotionServerSnapshot = () => false;

function SkillIcon({
  iconType,
  skillName,
  size = 16,
  className = '',
}: {
  iconType: string;
  skillName?: string;
  size?: number;
  className?: string;
}) {
  return <TechIcon name={skillName || iconType} size={size} className={className} />;
}

// Bokeh Orbs recolored to Electric Coral #FF5A4E and Ink Navy
const BOKEH_ORBS = [
  { id: 1, cx: '15%', cy: '25%', r: 240, color: 'rgba(255, 90, 78, 0.12)', anim: 'animate-bokeh-1' },
  { id: 2, cx: '82%', cy: '35%', r: 280, color: 'rgba(27, 36, 64, 0.35)', anim: 'animate-bokeh-2' },
  { id: 3, cx: '45%', cy: '75%', r: 260, color: 'rgba(255, 90, 78, 0.1)', anim: 'animate-bokeh-3' },
];

const TWINKLE_STARS = [
  { id: 1, x: 70, y: 55, size: 3.5, delay: '0s' },
  { id: 2, x: 210, y: 35, size: 4, delay: '1.2s' },
  { id: 3, x: 810, y: 70, size: 3, delay: '2.5s' },
  { id: 4, x: 920, y: 130, size: 4.5, delay: '0.8s' },
  { id: 5, x: 120, y: 340, size: 3, delay: '1.8s' },
  { id: 6, x: 870, y: 360, size: 3.5, delay: '3.1s' },
  { id: 7, x: 60, y: 620, size: 4, delay: '2.2s' },
  { id: 8, x: 910, y: 680, size: 3, delay: '0.4s' },
  { id: 9, x: 340, y: 740, size: 3.5, delay: '1.5s' },
  { id: 10, x: 680, y: 760, size: 4, delay: '2.9s' },
  { id: 11, x: 160, y: 190, size: 3, delay: '3.5s' },
  { id: 12, x: 790, y: 220, size: 3.5, delay: '1.1s' },
];

// Ring radii in SVG coordinates
const R1 = 155; // Inner: 6 skills
const R2 = 260; // Middle: 12 skills
const R3 = 370; // Outer: 16 skills

// Pre-computed rounded static dots for hydration safety
const R3_DOTS = [0, 60, 120, 180, 240, 300].map((deg) => ({
  deg,
  cx: Math.round(R3 * Math.cos((deg * Math.PI) / 180)),
  cy: Math.round(R3 * Math.sin((deg * Math.PI) / 180)),
}));

const R2_DOTS = [30, 90, 150, 210, 270, 330].map((deg) => ({
  deg,
  cx: Math.round(R2 * Math.cos((deg * Math.PI) / 180)),
  cy: Math.round(R2 * Math.sin((deg * Math.PI) / 180)),
}));

const R1_DOTS = [45, 135, 225, 315].map((deg) => ({
  deg,
  cx: Math.round(R1 * Math.cos((deg * Math.PI) / 180)),
  cy: Math.round(R1 * Math.sin((deg * Math.PI) / 180)),
}));

// Orbital speeds
const SPEED_RING_1 = 0.00032;  // ~19s
const SPEED_RING_2 = -0.00018; // ~34s
const SPEED_RING_3 = 0.00011;  // ~57s

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
  const [activeSkill, setActiveSkill] = useState<OrbitalSkill | null>(null);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'orbit' | 'grid'>('orbit');
  const [isInView, setIsInView] = useState(false);
  const [hoveredCoords, setHoveredCoords] = useState<{ x: number; y: number } | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const ring1Skills = useMemo(() => orbitalSkills.filter((s) => s.ring === 1), []);
  const ring2Skills = useMemo(() => orbitalSkills.filter((s) => s.ring === 2), []);
  const ring3Skills = useMemo(() => orbitalSkills.filter((s) => s.ring === 3), []);
  const totalCount = orbitalSkills.length;

  const orbitalState = useRef<{
    nodes: Record<
      string,
      {
        angle: number;
        radius: number;
        speed: number;
        speedFactor: number;
        bobPhase: number;
        currentX: number;
        currentY: number;
      }
    >;
    lastTime: number;
    rafId: number | null;
  }>({
    nodes: {},
    lastTime: 0,
    rafId: null,
  });

  // Initialize node angles and positions
  useEffect(() => {
    const nodes: typeof orbitalState.current.nodes = {};

    ring1Skills.forEach((skill, i) => {
      const angle = (i * 2 * Math.PI) / ring1Skills.length;
      nodes[skill.id] = {
        angle,
        radius: R1,
        speed: SPEED_RING_1,
        speedFactor: 1.0,
        bobPhase: i * 1.05,
        currentX: Math.round(Math.cos(angle) * R1),
        currentY: Math.round(Math.sin(angle) * R1),
      };
    });

    ring2Skills.forEach((skill, i) => {
      const angle = (i * 2 * Math.PI) / ring2Skills.length + Math.PI / 12;
      nodes[skill.id] = {
        angle,
        radius: R2,
        speed: SPEED_RING_2,
        speedFactor: 1.0,
        bobPhase: (ring1Skills.length + i) * 1.15,
        currentX: Math.round(Math.cos(angle) * R2),
        currentY: Math.round(Math.sin(angle) * R2),
      };
    });

    ring3Skills.forEach((skill, i) => {
      const angle = (i * 2 * Math.PI) / ring3Skills.length + Math.PI / 16;
      nodes[skill.id] = {
        angle,
        radius: R3,
        speed: SPEED_RING_3,
        speedFactor: 1.0,
        bobPhase: (ring1Skills.length + ring2Skills.length + i) * 1.25,
        currentX: Math.round(Math.cos(angle) * R3),
        currentY: Math.round(Math.sin(angle) * R3),
      };
    });

    orbitalState.current.nodes = nodes;
  }, [ring1Skills, ring2Skills, ring3Skills]);

  // Viewport detection
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Escape to close info card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveSkill(null);
        setHoveredSkillId(null);
        setHoveredCoords(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Animation Loop
  useEffect(() => {
    if (viewMode !== 'orbit') return;

    let isRunning = true;

    const animate = (timestamp: number) => {
      if (!isRunning) return;

      if (!orbitalState.current.lastTime) {
        orbitalState.current.lastTime = timestamp;
      }

      const dt = Math.min(timestamp - orbitalState.current.lastTime, 50);
      orbitalState.current.lastTime = timestamp;

      const isPausedGlobally =
        isManualPaused ||
        prefersReducedMotion ||
        !isInView ||
        (typeof document !== 'undefined' && document.hidden);

      const nodes = orbitalState.current.nodes;

      for (const skillId in nodes) {
        const node = nodes[skillId];
        const isHovered = hoveredSkillId === skillId;

        const targetSpeed = isPausedGlobally ? 0 : isHovered ? 0 : 1;
        node.speedFactor += (targetSpeed - node.speedFactor) * 0.08;

        node.angle += node.speed * dt * node.speedFactor;

        const bob = Math.sin(timestamp * 0.0018 + node.bobPhase) * 2.8;
        const x = node.radius * Math.cos(node.angle);
        const y = node.radius * Math.sin(node.angle) + bob;

        node.currentX = x;
        node.currentY = y;

        const el = nodeRefs.current[skillId];
        if (el) {
          el.setAttribute('transform', `translate(${x.toFixed(2)}, ${y.toFixed(2)})`);
        }

        if (isHovered) {
          setHoveredCoords({ x, y });
        }
      }

      orbitalState.current.rafId = requestAnimationFrame(animate);
    };

    orbitalState.current.lastTime = performance.now();
    orbitalState.current.rafId = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (orbitalState.current.rafId) {
        cancelAnimationFrame(orbitalState.current.rafId);
      }
    };
  }, [viewMode, isManualPaused, prefersReducedMotion, isInView, hoveredSkillId]);

  const handleNodeMouseEnter = useCallback((skill: OrbitalSkill) => {
    setHoveredSkillId(skill.id);
    const nodeData = orbitalState.current.nodes[skill.id];
    if (nodeData) {
      setHoveredCoords({ x: nodeData.currentX, y: nodeData.currentY });
    }
  }, []);

  const handleNodeMouseLeave = useCallback(() => {
    setHoveredSkillId(null);
    setHoveredCoords(null);
  }, []);

  const handleNodeClick = useCallback((skill: OrbitalSkill) => {
    setActiveSkill((prev) => (prev?.id === skill.id ? null : skill));
  }, []);

  const handleReset = useCallback(() => {
    setSelectedCategory('all');
    setActiveSkill(null);
    setHoveredSkillId(null);
    setHoveredCoords(null);
  }, []);

  const activeCategoryInfo = activeSkill ? skillCategories[activeSkill.category] : null;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding relative overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* Background Bokeh & Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {BOKEH_ORBS.map((orb) => (
          <div
            key={orb.id}
            className={`absolute rounded-full ${orb.anim}`}
            style={{
              left: orb.cx,
              top: orb.cy,
              width: orb.r,
              height: orb.r,
              background: orb.color,
              filter: 'blur(80px)',
            }}
          />
        ))}

        <svg className="absolute inset-0 w-full h-full opacity-50 dark:opacity-30" xmlns="http://www.w3.org/2000/svg">
          {TWINKLE_STARS.map((s) => (
            <g
              key={s.id}
              className="animate-twinkle"
              style={{ animationDelay: s.delay }}
              transform={`translate(${s.x}, ${s.y})`}
            >
              <circle cx="0" cy="0" r={s.size * 0.4} fill="#FF5A4E" opacity="0.6" />
            </g>
          ))}
        </svg>
      </div>

      <div className="container-max relative z-10">
        {/* Section Header: max 1 short line under 12 words */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <SectionHeading
            eyebrow="02 — Compétences"
            title="Écosystème Analytique."
            subtitle="Modélisation interactive de mes expertises techniques en orbite dynamique."
            className="mb-0"
          />

          {/* Controls Bar: Orbit / Grid toggle & Play / Pause */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <div className="inline-flex items-center p-1 rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode('orbit')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'orbit'
                    ? 'bg-[#FF5A4E] text-[#141B2D] shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
                aria-label="Mode Vue Planétaire 360"
              >
                <OrbitIcon size={14} />
                <span>Orbite</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#FF5A4E] text-[#141B2D] shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
                aria-label="Mode Vue Grille"
              >
                <LayoutGrid size={14} />
                <span>Grille</span>
              </button>
            </div>

            {viewMode === 'orbit' && (
              <button
                type="button"
                onClick={() => setIsManualPaused((prev) => !prev)}
                className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#FF5A4E] hover:border-[#FF5A4E] transition-all"
                aria-label={isManualPaused ? 'Reprendre la rotation' : 'Mettre en pause'}
              >
                {isManualPaused ? <Play size={13} className="translate-x-0.5" /> : <Pause size={13} />}
              </button>
            )}
          </div>
        </div>

        {/* Category Legend & Filter Chips */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-4 mb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border transition-all whitespace-nowrap shadow-xs ${
                selectedCategory === 'all'
                  ? 'border-[#FF5A4E] bg-[#FF5A4E] text-[#141B2D]'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Tous ({totalCount})
            </button>

            {(Object.keys(skillCategories) as SkillCategory[]).map((catKey) => {
              const cat = skillCategories[catKey];
              const isSelected = selectedCategory === catKey;
              const count = orbitalSkills.filter((s) => s.category === catKey).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? 'all' : catKey)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border transition-all whitespace-nowrap ${
                    isSelected
                      ? 'border-[#FF5A4E] bg-[#FF5A4E] text-[#141B2D]'
                      : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shadow-xs"
                    style={{
                      backgroundColor: isSelected ? '#141B2D' : cat.color,
                    }}
                  />
                  <span>{cat.shortLabel}</span>
                  <span className="opacity-75 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Sparkle size={13} className="text-[#FF5A4E]" />
            <span>Survolez une compétence pour l&apos;inspecter</span>
          </div>
        </div>

        {/* ─── MAIN CONTENT: ORBIT VIEW VS GRID VIEW ──────────────────── */}
        {viewMode === 'orbit' ? (
          <div className="relative w-full max-w-[880px] mx-auto aspect-square flex items-center justify-center py-2">
            <svg
              viewBox="-440 -440 880 880"
              className="w-full h-full select-none"
              preserveAspectRatio="xMidYMid meet"
              aria-label="Diagramme orbital interactif"
            >
              <defs>
                <radialGradient id="coralSunGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FF5A4E" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#FF5A4E" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#FF5A4E" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Crosshair Guides */}
              <line x1="-420" y1="0" x2="420" y2="0" stroke="var(--border)" strokeWidth="0.65" opacity="0.35" strokeDasharray="3 4" />
              <line x1="0" y1="-420" x2="0" y2="420" stroke="var(--border)" strokeWidth="0.65" opacity="0.35" strokeDasharray="3 4" />

              {/* Orbital Ring 3 (Outer) */}
              <circle
                cx="0"
                cy="0"
                r={R3}
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.55"
              />
              {R3_DOTS.map((dot) => (
                <circle
                  key={`dot-r3-${dot.deg}`}
                  cx={dot.cx}
                  cy={dot.cy}
                  r="1.75"
                  fill="#FF5A4E"
                  opacity="0.35"
                />
              ))}

              {/* Orbital Ring 2 (Middle) */}
              <circle
                cx="0"
                cy="0"
                r={R2}
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.6"
              />
              {R2_DOTS.map((dot) => (
                <circle
                  key={`dot-r2-${dot.deg}`}
                  cx={dot.cx}
                  cy={dot.cy}
                  r="1.75"
                  fill="#FF5A4E"
                  opacity="0.4"
                />
              ))}

              {/* Orbital Ring 1 (Inner) */}
              <circle
                cx="0"
                cy="0"
                r={R1}
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.15"
                strokeDasharray="3 5"
                opacity="0.75"
              />
              {R1_DOTS.map((dot) => (
                <circle
                  key={`dot-r1-${dot.deg}`}
                  cx={dot.cx}
                  cy={dot.cy}
                  r="2"
                  fill="#FF5A4E"
                  opacity="0.5"
                />
              ))}

              {/* Hover Line to Center */}
              {hoveredCoords && (
                <line
                  x1={hoveredCoords.x}
                  y1={hoveredCoords.y}
                  x2={0}
                  y2={0}
                  stroke="#FF5A4E"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.8"
                  pointerEvents="none"
                />
              )}

              {/* Orbiting Skill Nodes */}
              {orbitalSkills.map((skill) => {
                const categoryInfo = skillCategories[skill.category];
                const isHovered = hoveredSkillId === skill.id;
                const isSelected = activeSkill?.id === skill.id;
                const isHighlighted = isHovered || isSelected;

                const matchesFilter = selectedCategory === 'all' || selectedCategory === skill.category;
                const nodeOpacity = matchesFilter ? (hoveredSkillId && !isHovered ? 0.6 : 1) : 0.18;

                return (
                  <g
                    key={skill.id}
                    ref={(el) => {
                      nodeRefs.current[skill.id] = el;
                    }}
                    className="cursor-pointer group"
                    onClick={() => handleNodeClick(skill)}
                    onMouseEnter={() => handleNodeMouseEnter(skill)}
                    onMouseLeave={handleNodeMouseLeave}
                    tabIndex={0}
                    role="button"
                    aria-label={`${skill.name} — ${categoryInfo.label} (${skill.proficiency}%)`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNodeClick(skill);
                      }
                    }}
                    opacity={nodeOpacity}
                    style={{
                      transition: 'opacity 0.3s ease',
                      outline: 'none',
                    }}
                  >
                    <g
                      style={{
                        transform: isHighlighted ? 'scale(1.15)' : 'scale(1)',
                        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {/* Coral Aura */}
                      {isHighlighted && (
                        <circle
                          cx="0"
                          cy="0"
                          r="26"
                          fill="#FF5A4E"
                          opacity="0.3"
                          style={{ filter: 'drop-shadow(0 0 14px rgba(255, 90, 78, 0.6))' }}
                        />
                      )}

                      {/* Bubble Outer Circle */}
                      <circle
                        cx="0"
                        cy="0"
                        r={isHighlighted ? 20 : 17}
                        fill="var(--surface-solid)"
                        stroke={isHighlighted ? '#FF5A4E' : 'var(--border)'}
                        strokeWidth={isHighlighted ? 2 : 1.25}
                        style={{
                          filter: isHighlighted
                            ? 'drop-shadow(0 4px 14px rgba(255, 90, 78, 0.4))'
                            : 'drop-shadow(0 2px 6px rgba(20, 27, 45, 0.1))',
                          transition: 'all 0.2s ease',
                        }}
                      />

                      {/* Inner Category Rim */}
                      <circle
                        cx="0"
                        cy="0"
                        r={isHighlighted ? 15 : 13}
                        fill={`${categoryInfo.color}20`}
                        opacity="0.9"
                      />

                      {/* Line Icon */}
                      <g transform="translate(-7.5, -7.5)" style={{ color: isHighlighted ? '#FF5A4E' : categoryInfo.color }}>
                        <SkillIcon iconType={skill.iconType} skillName={skill.name} size={15} />
                      </g>

                      {/* Text Label Below Node */}
                      <g transform="translate(0, 26)" pointerEvents="none">
                        <rect
                          x={-skill.name.length * 3.5 - 6}
                          y="-7.5"
                          width={skill.name.length * 7 + 12}
                          height="15"
                          rx="9999"
                          fill="var(--surface-solid)"
                          stroke={isHighlighted ? '#FF5A4E' : 'var(--border)'}
                          strokeWidth={isHighlighted ? 1.25 : 0.75}
                          opacity={isHighlighted ? 0.98 : 0.92}
                        />
                        <text
                          x="0"
                          y="2"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontFamily="var(--font-display)"
                          fontWeight={isHighlighted ? '800' : '700'}
                          fontSize="8.5"
                          letterSpacing="0.01em"
                          fill={isHighlighted ? '#FF5A4E' : 'var(--text)'}
                        >
                          {skill.name}
                        </text>
                      </g>
                    </g>
                  </g>
                );
              })}

              {/* ─── CENTRAL ELEMENT: DATA ANALYST CORE ──────────────────────── */}
              <g
                className="cursor-pointer group select-none"
                onClick={handleReset}
                role="button"
                tabIndex={0}
                aria-label="Cœur Data Analyst Engine — Cliquer pour réinitialiser"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleReset();
                  }
                }}
              >
                <circle cx="0" cy="0" r="92" fill="url(#coralSunGlow)" />
                <circle
                  cx="0"
                  cy="0"
                  r="66"
                  fill="none"
                  stroke="#FF5A4E"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="54"
                  fill="var(--surface-solid)"
                  stroke="var(--border)"
                  strokeWidth="1.5"
                  style={{
                    filter: 'drop-shadow(0 6px 20px rgba(255, 90, 78, 0.25))',
                  }}
                />
                <circle
                  cx="0"
                  cy="0"
                  r="46"
                  fill="rgba(255, 90, 78, 0.12)"
                  stroke="#FF5A4E"
                  strokeWidth="0.8"
                  opacity="0.4"
                />

                <g transform="translate(0, -18)">
                  <circle cx="0" cy="0" r="2.75" fill="#FF5A4E" />
                  <circle cx="-6.5" cy="0" r="1.5" fill="#FF5A4E" opacity="0.6" />
                  <circle cx="6.5" cy="0" r="1.5" fill="#FF5A4E" opacity="0.6" />
                </g>

                <text
                  x="0"
                  y="-1"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="var(--font-display)"
                  fontWeight="800"
                  fontSize="11.5"
                  letterSpacing="1.2"
                  fill="var(--text)"
                >
                  DATA ANALYST
                </text>

                <text
                  x="0"
                  y="13"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="var(--font-mono)"
                  fontWeight="800"
                  fontSize="8"
                  letterSpacing="2.5"
                  fill="#FF5A4E"
                >
                  ENGINE
                </text>

                <circle cx="0" cy="25" r="2.5" fill="#FF5A4E" />
                <circle cx="0" cy="25" r="5.5" fill="#FF5A4E" opacity="0.25" className="animate-ping" />
              </g>
            </svg>

            {/* Floating Soft Info Card */}
            <AnimatePresence>
              {activeSkill && activeCategoryInfo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden md:block absolute top-4 right-4 w-80 card p-5 shadow-elevated z-30"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: '#FF5A4E',
                  }}
                  role="region"
                  aria-label={`Détails de ${activeSkill.name}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs"
                        style={{
                          backgroundColor: `${activeCategoryInfo.color}18`,
                          color: activeCategoryInfo.color,
                          border: `1px solid ${activeCategoryInfo.color}40`,
                        }}
                      >
                        <SkillIcon iconType={activeSkill.iconType} skillName={activeSkill.name} size={20} />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-base leading-tight text-[var(--text)]">
                          {activeSkill.name}
                        </h4>
                        <span
                          className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-0.5"
                          style={{
                            backgroundColor: `${activeCategoryInfo.color}18`,
                            color: activeCategoryInfo.color,
                          }}
                        >
                          {activeCategoryInfo.shortLabel}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveSkill(null)}
                      className="w-7 h-7 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--text-muted)] hover:text-[#FF5A4E] hover:border-[#FF5A4E] transition-colors"
                      aria-label="Fermer les détails"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Proficiency progress bar */}
                  <div className="mb-3.5">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[var(--text-muted)]">Niveau de maîtrise</span>
                      <span className="font-mono font-bold text-[#FF5A4E]">{activeSkill.proficiency}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[var(--surface-2)] overflow-hidden border border-[var(--border)]">
                      <motion.div
                        className="h-full rounded-full bg-[#FF5A4E]"
                        initial={{ width: 0 }}
                        animate={{ width: `${activeSkill.proficiency}%` }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed mb-3.5 text-[var(--text-muted)]">
                    {activeSkill.description}
                  </p>

                  {activeSkill.relatedProjects.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                        Projets associés :
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeSkill.relatedProjects.map((proj) => (
                          <span
                            key={proj}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)]"
                          >
                            {proj}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Grid Matrix View */
          <div className="space-y-8">
            {(Object.keys(skillCategories) as SkillCategory[])
              .filter((cat) => selectedCategory === 'all' || selectedCategory === cat)
              .map((catKey) => {
                const cat = skillCategories[catKey];
                const catSkills = orbitalSkills.filter((s) => s.category === catKey);

                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="card p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${cat.color}18`,
                          color: cat.color,
                          border: `1px solid ${cat.color}35`,
                        }}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-base leading-tight text-[var(--text)]">
                          {cat.label}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {catSkills.map((skill) => {
                        const isCurrentActive = activeSkill?.id === skill.id;

                        return (
                          <div
                            key={skill.id}
                            onClick={() => setActiveSkill(skill)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                              isCurrentActive
                                ? 'border-[#FF5A4E] bg-[#FF5A4E]/10 shadow-xs'
                                : 'border-[var(--border)] bg-[var(--surface)] hover:border-[#FF5A4E]'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{
                                  backgroundColor: `${cat.color}18`,
                                  color: cat.color,
                                }}
                              >
                                <SkillIcon iconType={skill.iconType} skillName={skill.name} size={16} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="font-bold text-xs truncate text-[var(--text)]">
                                    {skill.name}
                                  </p>
                                  <span className="text-[10px] font-mono text-[#FF5A4E] font-bold">
                                    {skill.proficiency}%
                                  </span>
                                </div>
                                <p className="text-[11px] leading-relaxed line-clamp-2 mt-0.5 text-[var(--text-muted)]">
                                  {skill.description}
                                </p>
                              </div>
                            </div>

                            <div className="w-full h-1 rounded-full bg-[var(--border)] overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${skill.proficiency}%`,
                                  backgroundColor: cat.color,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
          </div>
        )}

        {/* Mobile Bottom Sheet for Skill Details */}
        <AnimatePresence>
          {activeSkill && activeCategoryInfo && (
            <div className="md:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
                onClick={() => setActiveSkill(null)}
                aria-hidden="true"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 p-6 rounded-t-3xl border-t border-[var(--border)] bg-[var(--surface)] shadow-elevated"
                role="dialog"
                aria-modal="true"
                aria-label={`Détails de ${activeSkill.name}`}
              >
                <div className="w-12 h-1.5 rounded-full bg-[var(--border)] mx-auto mb-4" />

                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${activeCategoryInfo.color}18`,
                        color: activeCategoryInfo.color,
                        border: `1px solid ${activeCategoryInfo.color}35`,
                      }}
                    >
                      <SkillIcon iconType={activeSkill.iconType} skillName={activeSkill.name} size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[var(--text)]">
                        {activeSkill.name}
                      </h4>
                      <span
                        className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${activeCategoryInfo.color}18`,
                          color: activeCategoryInfo.color,
                        }}
                      >
                        {activeCategoryInfo.label}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveSkill(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--text-muted)]"
                    aria-label="Fermer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[var(--text-muted)]">Niveau de maîtrise</span>
                    <span className="font-mono font-bold text-[#FF5A4E]">{activeSkill.proficiency}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[var(--surface-2)] overflow-hidden border border-[var(--border)]">
                    <div
                      className="h-full rounded-full bg-[#FF5A4E]"
                      style={{ width: `${activeSkill.proficiency}%` }}
                    />
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4 text-[var(--text-muted)]">
                  {activeSkill.description}
                </p>

                {activeSkill.relatedProjects.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                      Projets associés :
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeSkill.relatedProjects.map((proj) => (
                        <span
                          key={proj}
                          className="text-xs font-semibold px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text)]"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Bottom Metrics Bar */}
        <div className="mt-8 pt-5 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5A4E]" />
              Data & BI ({orbitalSkills.filter((s) => s.category === 'data-bi').length})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F4F1EA] dark:bg-[#F4F1EA] border border-black/20" />
              Programming ({orbitalSkills.filter((s) => s.category === 'programming').length})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF7369]" />
              ML & AI ({orbitalSkills.filter((s) => s.category === 'ml-ai').length})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#344161]" />
              Web & Cloud ({orbitalSkills.filter((s) => s.category === 'web-cloud').length})
            </span>
          </div>

          <div className="text-right">
            <span>Total : {totalCount} compétences vérifiées</span>
          </div>
        </div>
      </div>
    </section>
  );
}
