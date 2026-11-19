'use client';

import React from 'react';
import {
  Brain,
  Filter,
  Search,
  Target,
  Percent,
  Network,
  Binary,
  Globe,
  ScanText,
  Boxes,
  Workflow,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Layers,
  Code2,
  Terminal,
  Server,
  Cloud,
  FileCode,
  GraduationCap,
  Calendar,
  MapPin,
  Sparkles,
} from 'lucide-react';

export interface TechIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * Curated authentic tech brand SVGs from Simple Icons / Devicon.
 * Rendered in neutral monochrome with smooth hover transition to Electric Coral #FF5A4E.
 */

export function PythonIcon({ size = 18, className = '', ...props }: TechIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.75h5.813v.825H3.88s-3.88-.44-3.88 5.75c0 6.188 3.39 5.975 3.39 5.975h2.02v-2.838s-.11-3.39 3.33-3.39h5.713s3.23.05 3.23-3.138V3.138S18.067 0 11.914 0zm-3.05 1.73a1.01 1.01 0 1 1 0 2.02 1.01 1.01 0 0 1 0-2.02zm3.222 22.27c6.094 0 5.714-2.656 5.714-2.656l-.006-2.75h-5.813v-.825h8.139s3.88.44 3.88-5.75c0-6.188-3.39-5.975-3.39-5.975h-2.02v2.838s.11 3.39-3.33 3.39h-5.713s-3.23-.05-3.23 3.138v5.456s-.38 3.138 5.773 3.138zm3.05-1.73a1.01 1.01 0 1 1 0-2.02 1.01 1.01 0 0 1 0 2.02z" />
    </svg>
  );
}

export function PowerBIIcon({ size = 18, className = '', ...props }: TechIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M15.5 2h-3a1.5 1.5 0 0 0-1.5 1.5v17a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 15.5 2zM9.5 7h-3A1.5 1.5 0 0 0 5 8.5v12A1.5 1.5 0 0 0 6.5 22h3a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 9.5 7zm12 6h-3a1.5 1.5 0 0 0-1.5 1.5v6a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5z" />
    </svg>
  );
}

export function StreamlitIcon({ size = 18, className = '', ...props }: TechIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2.5a.75.75 0 0 0-.66.39L6.5 11.5h11L12.66 2.89A.75.75 0 0 0 12 2.5zM3.46 9.87a.75.75 0 0 0-.96.95l4.5 10a.75.75 0 0 0 .96.39L12 19.3l-4.04-8.08-4.5-1.35zm17.08 0l-4.5 1.35L12 19.3l4.04 1.91a.75.75 0 0 0 .96-.39l4.5-10a.75.75 0 0 0-.96-.95z" />
    </svg>
  );
}

export function ExcelIcon({ size = 18, className = '', ...props }: TechIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M21.17 3.25H7.83A1.83 1.83 0 0 0 6 5.08v1.67H3.83A1.83 1.83 0 0 0 2 8.58v6.84a1.83 1.83 0 0 0 1.83 1.83H6v1.67a1.83 1.83 0 0 0 1.83 1.83h13.34A1.83 1.83 0 0 0 23 18.92V5.08a1.83 1.83 0 0 0-1.83-1.83zM6 15.25H3.83v-6.5H6zm4.88-1.5l1.83-3.21h1.72l-2.65 4.14 2.76 4.32h-1.78l-1.9-3.32-1.9 3.32H7.18l2.76-4.32-2.65-4.14h1.73zm10.29 5.17H7.83V17h1.42l2.35-3.8-2.3-3.7H7.83V5.08h13.34z" />
    </svg>
  );
}

export function PandasIcon({ size = 18, className = '', ...props }: TechIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12.75 2a1.75 1.75 0 0 0-1.75 1.75v3.5a1.75 1.75 0 1 0 3.5 0v-3.5A1.75 1.75 0 0 0 12.75 2zM6.5 7.5A1.75 1.75 0 0 0 4.75 9.25v7.5a1.75 1.75 0 1 0 3.5 0v-7.5A1.75 1.75 0 0 0 6.5 7.5zm11 0a1.75 1.75 0 0 0-1.75 1.75v7.5a1.75 1.75 0 1 0 3.5 0v-7.5A1.75 1.75 0 0 0 17.5 7.5zM12 12.5a1.75 1.75 0 0 0-1.75 1.75v5.5a1.75 1.75 0 1 0 3.5 0v-5.5A1.75 1.75 0 0 0 12 12.5z" />
    </svg>
  );
}

export function NumPyIcon({ size = 18, className = '', ...props }: TechIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm0 2.24l6.54 3.85L12 12 5.46 8.09 12 4.24zM5.5 9.87L11 13.1v6.66L5.5 16.53V9.87zm13 0v6.66L13 19.76V13.1l5.5-3.23z" />
    </svg>
  );
}

export function ScikitLearnIcon({ size = 18, className = '', ...props }: TechIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <circle cx="7" cy="8" r="4" opacity="0.8" />
      <circle cx="17" cy="8" r="4" opacity="0.9" />
      <circle cx="12" cy="16" r="4.5" />
      <path d="M7 8l5 8 5-8" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function SQLIcon({ size = 18, className = '', ...props }: TechIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

export function GitIcon({ size = 18, className = '', ...props }: TechIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M21.62 10.66L13.34 2.38a1.9 1.9 0 0 0-2.69 0L8.74 4.3l3.41 3.41a2.26 2.26 0 0 1 2.85 2.87l3.28 3.28a2.25 2.25 0 0 1 2.11 3.49 2.25 2.25 0 0 1-3.19.26l-3.08-3.08v4.61a2.26 2.26 0 1 1-1.5 0V14.1a2.25 2.25 0 0 1-1.2-2.96L8.03 7.74 2.38 13.39a1.9 1.9 0 0 0 0 2.69l8.28 8.28a1.9 1.9 0 0 0 2.69 0l8.27-8.28a1.9 1.9 0 0 0 0-2.69z" />
    </svg>
  );
}

export function TalendIcon({ size = 18, className = '', ...props }: TechIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );
}

export function NextjsIcon({ size = 18, className = '', ...props }: TechIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M18.665 21.978C16.808 23.255 14.502 24 12 24 5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12c0 3.584-1.574 6.801-4.067 9.001L9.22 7.5H7.5v9h1.5V9.45l9.665 12.528zM15 7.5h1.5v6.75H15V7.5z" />
    </svg>
  );
}

export function SupabaseIcon({ size = 18, className = '', ...props }: TechIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M21.362 9.354H12V.3a.3.3 0 0 0-.535-.187L.727 12.3a.3.3 0 0 0 .227.483H12v9.054a.3.3 0 0 0 .535.187l10.738-12.183a.3.3 0 0 0-.227-.487h-1.684z" />
    </svg>
  );
}

/**
 * Universal Tech & Concept Icon Resolver.
 */
export function TechIcon({
  name,
  size = 18,
  className = '',
}: {
  name: string;
  size?: number | string;
  className?: string;
}) {
  const norm = name.toLowerCase().trim();

  // Tech brands
  if (norm.includes('python')) return <PythonIcon size={size} className={className} />;
  if (norm.includes('power bi') || norm === 'powerbi' || norm === 'dax')
    return <PowerBIIcon size={size} className={className} />;
  if (norm.includes('streamlit')) return <StreamlitIcon size={size} className={className} />;
  if (norm.includes('excel')) return <ExcelIcon size={size} className={className} />;
  if (norm.includes('pandas')) return <PandasIcon size={size} className={className} />;
  if (norm.includes('numpy')) return <NumPyIcon size={size} className={className} />;
  if (norm.includes('scikit') || norm.includes('sklearn'))
    return <ScikitLearnIcon size={size} className={className} />;
  if (norm.includes('sql') || norm.includes('postgres') || norm.includes('database'))
    return <SQLIcon size={size} className={className} />;
  if (norm.includes('git')) return <GitIcon size={size} className={className} />;
  if (norm.includes('talend') || norm.includes('etl')) return <TalendIcon size={size} className={className} />;
  if (norm.includes('next') || norm.includes('react')) return <NextjsIcon size={size} className={className} />;
  if (norm.includes('supabase')) return <SupabaseIcon size={size} className={className} />;

  // Analytical concepts — consistent Lucide line icons with stroke 1.5
  if (norm.includes('clean') || norm.includes('nettoyage'))
    return <Filter size={size} strokeWidth={1.5} className={className} />;
  if (norm.includes('eda') || norm.includes('explorat'))
    return <Search size={size} strokeWidth={1.5} className={className} />;
  if (norm.includes('kpi') || norm.includes('target') || norm.includes('décision'))
    return <Target size={size} strokeWidth={1.5} className={className} />;
  if (norm.includes('model') || norm.includes('schéma') || norm.includes('étoile'))
    return <Boxes size={size} strokeWidth={1.5} className={className} />;
  if (norm.includes('stat'))
    return <Percent size={size} strokeWidth={1.5} className={className} />;
  if (norm.includes('machine learning') || norm.includes('ia') || norm.includes('ai'))
    return <Brain size={size} strokeWidth={1.5} className={className} />;
  if (norm.includes('deep') || norm.includes('neural') || norm.includes('keras'))
    return <Network size={size} strokeWidth={1.5} className={className} />;
  if (norm.includes('regex'))
    return <Binary size={size} strokeWidth={1.5} className={className} />;
  if (norm.includes('scrap') || norm.includes('web'))
    return <Globe size={size} strokeWidth={1.5} className={className} />;
  if (norm.includes('ocr'))
    return <ScanText size={size} strokeWidth={1.5} className={className} />;
  if (norm.includes('plot') || norm.includes('seaborn') || norm.includes('matplotlib') || norm.includes('viz'))
    return <LineChart size={size} strokeWidth={1.5} className={className} />;

  // Default fallback
  return <BarChart3 size={size} strokeWidth={1.5} className={className} />;
}
