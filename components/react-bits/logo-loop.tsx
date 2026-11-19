'use client';

import React, { useEffect, useRef } from 'react';

interface LogoLoopProps {
  children: React.ReactNode;
  speed?: number; // base pixels per second
  direction?: 'left' | 'right';
  className?: string;
  pauseOnHover?: boolean;
}

export function LogoLoop({
  children,
  speed = 40,
  direction = 'left',
  className = '',
  pauseOnHover = true,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const velocityRef = useRef(1);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;
      // Scroll velocity boost
      velocityRef.current = Math.min(4.5, 1 + delta * 0.05);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = (currentTime: number) => {
      const deltaMs = currentTime - lastTime;
      lastTime = currentTime;

      // Decay velocity back to 1
      velocityRef.current += (1 - velocityRef.current) * 0.05;

      if (!isHoveredRef.current || !pauseOnHover) {
        const step = (speed * (deltaMs / 1000) * velocityRef.current);
        if (direction === 'left') {
          offsetRef.current -= step;
        } else {
          offsetRef.current += step;
        }

        if (trackRef.current) {
          const halfWidth = trackRef.current.scrollWidth / 2;
          if (halfWidth > 0) {
            if (Math.abs(offsetRef.current) >= halfWidth) {
              offsetRef.current = 0;
            }
            trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
