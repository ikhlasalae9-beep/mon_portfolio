'use client';

import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  active?: boolean;
}

export function Magnet({
  children,
  strength = 30,
  className = '',
  active = true,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!active || isReducedMotion || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: (distanceX / width) * strength,
      y: (distanceY / height) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform: isReducedMotion ? 'none' : `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {children}
    </div>
  );
}
