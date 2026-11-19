'use client';

import { motion } from 'motion/react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-8 sm:mb-12 ${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-2.5 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A4E]" />
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF5A4E] font-display">
            {eyebrow}
          </p>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold leading-[1.08] tracking-[-0.03em] text-[var(--text)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 text-sm sm:text-base max-w-xl leading-relaxed text-[var(--text-muted)] font-normal">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
