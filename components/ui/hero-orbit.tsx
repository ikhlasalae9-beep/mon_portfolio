'use client';

import React, { useRef, useEffect, useState, useCallback, useSyncExternalStore } from 'react';
import { motion } from 'motion/react';

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

interface HeroOrbitProps {
  parallaxX?: number; // Normalized -1 to 1
  parallaxY?: number; // Normalized -1 to 1
  children: React.ReactNode; // Subject photo placed between back and front arcs
}

/**
 * Ultra-thin 3D Orbit Line around Head & Shoulders
 *
 * SVG Coordinate Box: 500 x 620
 * Ellipse Center: (250, 240)
 * Semi-major axis: Rx = 175, Semi-minor axis: Ry = 52
 * Tilted by -20 degrees around (250, 240)
 *
 * Back Arc (passes behind neck/head):
 *   theta from pi clockwise to 0 (top half of ellipse)
 * Front Arc (passes in front of shoulders/chest):
 *   theta from 0 clockwise to pi (bottom half of ellipse)
 *
 * Layer 1 (z-10): Back orbit line (+ dot when on back half)
 * Layer 2 (z-20): High-resolution subject photo with smooth bottom gradient fade
 * Layer 3 (z-30): Front orbit line (+ dot when on front half)
 */

export function HeroOrbit({ parallaxX = 0, parallaxY = 0, children }: HeroOrbitProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Track progress of the dot: 0 to 1 along the closed ellipse
  const [dotProgress, setDotProgress] = useState(0.15);
  const progressRef = useRef(0.15);
  const speedRef = useRef(0.00012); // radians / progress per ms
  const lastTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Geometry constants
  const cx = 250;
  const cy = 240;
  const rx = 175;
  const ry = 52;
  const tiltDeg = -20;
  const tiltRad = (tiltDeg * Math.PI) / 180;

  // Listen for tab visibility to pause animation
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Continuous animation loop for glowing dot
  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const dt = Math.min(time - lastTimeRef.current, 60);
      lastTimeRef.current = time;

      if (!prefersReducedMotion && isTabVisible) {
        // Slow down smoothly when hovered
        const targetSpeed = isHovered ? 0.000035 : 0.00011;
        speedRef.current += (targetSpeed - speedRef.current) * 0.06;

        progressRef.current = (progressRef.current + speedRef.current * dt) % 1;
        setDotProgress(progressRef.current);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    },
    [isHovered, isTabVisible, prefersReducedMotion]
  );

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [animate]);

  // Compute position of dot on the tilted ellipse
  // angle theta: 0 = right seam, 0.25 = bottom (front), 0.5 = left seam, 0.75 = top (back)
  const theta = dotProgress * 2 * Math.PI;
  // Untransformed relative to (cx, cy)
  const unX = rx * Math.cos(theta);
  const unY = ry * Math.sin(theta);
  // Rotated by tiltDeg (-20 deg)
  const cosT = Math.cos(tiltRad);
  const sinT = Math.sin(tiltRad);
  const dotX = cx + (unX * cosT - unY * sinT);
  const dotY = cy + (unX * sinT + unY * cosT);

  // Back arc: sin(theta) < 0 (i.e. theta between pi and 2*pi, top half)
  // Front arc: sin(theta) >= 0 (i.e. theta between 0 and pi, bottom half)
  const isFront = Math.sin(theta) >= 0;

  // Parallax transform styles
  const orbitTransform = prefersReducedMotion
    ? undefined
    : {
        transform: `translate3d(${parallaxX * 12}px, ${parallaxY * 8}px, 0)`,
        transition: 'transform 0.12s ease-out',
      };

  const photoTransform = prefersReducedMotion
    ? undefined
    : {
        transform: `translate3d(${parallaxX * 4}px, ${parallaxY * 3}px, 0)`,
        transition: 'transform 0.12s ease-out',
      };

  // SVG Paths in local untransformed coordinates inside <g transform="rotate(-20 250 240)">
  // Back arc: from (cx - rx, cy) clockwise over the top to (cx + rx, cy)
  // i.e. M (75, 240) A 175 52 0 0 1 425,240
  const backArcD = `M ${cx - rx},${cy} A ${rx} ${ry} 0 0 1 ${cx + rx},${cy}`;
  // Front arc: from (cx + rx, cy) clockwise over the bottom to (cx - rx, cy)
  // i.e. M (425, 240) A 175 52 0 0 1 75,240
  const frontArcD = `M ${cx + rx},${cy} A ${rx} ${ry} 0 0 1 ${cx - rx},${cy}`;

  return (
    <div
      className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px] aspect-[500/620] mx-auto select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── LAYER 0: Soft Warm Orange Radial Glow behind her ─── */}
      <div
        className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(242, 92, 5, 0.18) 0%, rgba(251, 146, 60, 0.08) 45%, transparent 70%)',
          filter: 'blur(55px)',
          transform: prefersReducedMotion
            ? 'translate(-50%, -50%)'
            : `translate(calc(-50% + ${-parallaxX * 8}px), calc(-50% + ${-parallaxY * 6}px))`,
          transition: 'transform 0.15s ease-out',
        }}
        aria-hidden="true"
      />

      {/* ─── LAYER 1: BACK ORBIT LINE (Behind photo, z-10) ─── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={orbitTransform}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 500 620"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform={`rotate(${tiltDeg} ${cx} ${cy})`}>
            {/* Back line path */}
            <motion.path
              d={backArcD}
              fill="none"
              stroke="#F25C05"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeOpacity={isHovered ? 1 : 0.75}
              style={{
                filter: isHovered
                  ? 'drop-shadow(0 0 4px rgba(242, 92, 5, 0.6))'
                  : 'drop-shadow(0 0 2px rgba(242, 92, 5, 0.35))',
                transition: 'stroke-opacity 0.3s, filter 0.3s',
              }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />
          </g>

          {/* Glowing dot when traveling on back half */}
          {!isFront && !prefersReducedMotion && (
            <g transform={`translate(${dotX}, ${dotY})`}>
              {/* Outer soft glow halo */}
              <circle r="7" fill="#F25C05" opacity="0.3" filter="blur(2px)" />
              {/* Core dot */}
              <circle r="3.2" fill="#FFFFFF" stroke="#F25C05" strokeWidth="1.5" />
            </g>
          )}
        </svg>
      </div>

      {/* ─── LAYER 2: SUBJECT PHOTO (In middle, z-20) ─── */}
      <div
        className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none pb-0"
        style={photoTransform}
      >
        {children}
      </div>

      {/* ─── LAYER 3: FRONT ORBIT LINE (In front of photo, z-30) ─── */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={orbitTransform}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 500 620"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform={`rotate(${tiltDeg} ${cx} ${cy})`}>
            {/* Front line path passing over shoulders/collarbone */}
            <motion.path
              d={frontArcD}
              fill="none"
              stroke="#F25C05"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeOpacity={isHovered ? 1 : 0.85}
              style={{
                filter: isHovered
                  ? 'drop-shadow(0 0 4px rgba(242, 92, 5, 0.7))'
                  : 'drop-shadow(0 0 2.5px rgba(242, 92, 5, 0.45))',
                transition: 'stroke-opacity 0.3s, filter 0.3s',
              }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
            />
          </g>

          {/* Glowing dot when traveling on front half */}
          {isFront && !prefersReducedMotion && (
            <g transform={`translate(${dotX}, ${dotY})`}>
              {/* Outer soft glow halo */}
              <circle r="8" fill="#F25C05" opacity="0.35" filter="blur(2.5px)" />
              {/* Core dot */}
              <circle r="3.5" fill="#FFFFFF" stroke="#F25C05" strokeWidth="1.6" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
