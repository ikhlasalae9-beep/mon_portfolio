'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: React.ElementType;
}

export function SplitText({
  text,
  className = '',
  wordClassName = '',
  charClassName = '',
  delay = 0,
  duration = 0.6,
  stagger = 0.02,
  as: Component = 'span',
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const chars = containerRef.current.querySelectorAll('.split-char');
      if (chars.length === 0) return;

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 24,
          rotateX: -40,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
        }
      );
    },
    { scope: containerRef, dependencies: [text, delay] }
  );

  const words = text.split(' ');

  return (
    <Component ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span
          key={`word-${wordIndex}`}
          className={`inline-block whitespace-nowrap mr-[0.25em] ${wordClassName}`}
        >
          {word.split('').map((char, charIndex) => (
            <span
              key={`char-${wordIndex}-${charIndex}`}
              className={`split-char inline-block will-change-transform ${charClassName}`}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Component>
  );
}
