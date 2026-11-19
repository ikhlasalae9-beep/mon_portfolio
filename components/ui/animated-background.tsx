'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { gsap } from 'gsap';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseVx: number;
  baseVy: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);
  const blob3Ref = useRef<HTMLDivElement | null>(null);
  const blob4Ref = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  // GSAP Blob drift animations
  useEffect(() => {
    if (!mounted || reducedMotion) return;
    const ctx = gsap.context(() => {
      if (blob1Ref.current) {
        gsap.to(blob1Ref.current, {
          x: 60, y: -50, scale: 1.15, borderRadius: '62% 38% 55% 45% / 48% 52% 60% 40%',
          duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut',
        });
        gsap.to(blob1Ref.current, {
          rotate: 25, duration: 32, repeat: -1, yoyo: true, ease: 'none',
        });
      }
      if (blob2Ref.current) {
        gsap.to(blob2Ref.current, {
          x: -70, y: 40, scale: 1.1, borderRadius: '55% 45% 40% 60% / 60% 40% 55% 45%',
          duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut',
        });
        gsap.to(blob2Ref.current, {
          rotate: -20, duration: 28, repeat: -1, yoyo: true, ease: 'none',
        });
      }
      if (blob3Ref.current) {
        gsap.to(blob3Ref.current, {
          x: -40, y: 60, scale: 1.08, borderRadius: '45% 55% 60% 40% / 55% 45% 42% 58%',
          duration: 15, repeat: -1, yoyo: true, ease: 'sine.inOut',
        });
      }
      if (blob4Ref.current) {
        gsap.to(blob4Ref.current, {
          x: 30, y: -30, scale: 1.2,
          duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut',
        });
      }
    });
    return () => ctx.revert();
  }, [mounted, reducedMotion]);

  // Cursor spotlight
  useEffect(() => {
    if (!mounted || reducedMotion || typeof window === 'undefined') return;
    const spotlight = spotlightRef.current;
    if (!spotlight) return;
    const xTo = gsap.quickTo(spotlight, 'x', { duration: 0.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(spotlight, 'y', { duration: 0.5, ease: 'power2.out' });
    const handleMouseMove = (e: MouseEvent) => { xTo(e.clientX - 200); yTo(e.clientY - 200); };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted, reducedMotion]);

  // Canvas particle network
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2 = canvas.getContext('2d');
    if (!ctx2) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animId: number;
    let running = true;

    const setSize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx2.scale(dpr, dpr);
    };
    setSize();
    let W = window.innerWidth, H = window.innerHeight;

    const mouse = { x: -1000, y: -1000, active: false };
    const count = isMobile ? 30 : 90;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const vx = (Math.random() - 0.5) * 0.4;
      const vy = (Math.random() - 0.5) * 0.4;
      particles.push({ x: Math.random() * W, y: Math.random() * H, vx, vy, baseVx: vx, baseVy: vy, radius: Math.random() * 1.8 + 0.8, alpha: Math.random() * 0.4 + 0.2 });
    }

    const isDark = resolvedTheme !== 'light';
    const coral = '255, 90, 78';
    const lineC = isDark ? '244, 241, 234' : '20, 27, 45';
    const maxDist = 140;
    const mRad = 160;
    let time = 0;

    const handleClick = (e: MouseEvent) => {
      const cx = e.clientX, cy = e.clientY;
      particles.forEach(p => {
        const dx = p.x - cx, dy = p.y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200 && d > 0) { p.vx += (dx / d) * ((200 - d) / 200) * 3; p.vy += (dy / d) * ((200 - d) / 200) * 3; }
      });
    };
    const handleResize = () => { W = window.innerWidth; H = window.innerHeight; setSize(); };
    const handleMM = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const handleML = () => { mouse.active = false; mouse.x = -1000; mouse.y = -1000; };
    const handleVis = () => { running = !document.hidden; if (running) render(); };

    window.addEventListener('resize', handleResize, { passive: true });
    if (!isMobile) { window.addEventListener('mousemove', handleMM, { passive: true }); document.addEventListener('mouseleave', handleML); window.addEventListener('click', handleClick); }
    document.addEventListener('visibilitychange', handleVis);

    const render = () => {
      if (!running) return;
      time++;
      ctx2.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reducedMotion) {
          p.vx += Math.sin(time * 0.008 + p.y * 0.015) * 0.012;
          p.vy += Math.cos(time * 0.006 + p.x * 0.015) * 0.012;
          p.vx += (p.baseVx - p.vx) * 0.015;
          p.vy += (p.baseVy - p.vy) * 0.015;
          const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (spd > 1.5) { p.vx *= 1.5 / spd; p.vy *= 1.5 / spd; }
          if (!isMobile && mouse.active) {
            const dx = p.x - mouse.x, dy = p.y - mouse.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < mRad && d > 0) { const f = ((mRad - d) / mRad) * 0.6; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
          }
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0;
        }
        ctx2.beginPath(); ctx2.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx2.fillStyle = `rgba(${coral}, ${p.alpha * (isDark ? 0.7 : 0.5)})`; ctx2.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            ctx2.beginPath(); ctx2.moveTo(p.x, p.y); ctx2.lineTo(p2.x, p2.y);
            ctx2.strokeStyle = `rgba(${lineC}, ${(1 - d / maxDist) * (isDark ? 0.1 : 0.06)})`; ctx2.lineWidth = 0.75; ctx2.stroke();
          }
        }
        if (!isMobile && mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < mRad) {
            ctx2.beginPath(); ctx2.moveTo(p.x, p.y); ctx2.lineTo(mouse.x, mouse.y);
            ctx2.strokeStyle = `rgba(${coral}, ${(1 - d / mRad) * (isDark ? 0.25 : 0.18)})`; ctx2.lineWidth = 0.9; ctx2.stroke();
          }
        }
      }
      animId = requestAnimationFrame(render);
    };

    if (!reducedMotion) render();
    return () => {
      running = false; cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (!isMobile) { window.removeEventListener('mousemove', handleMM); document.removeEventListener('mouseleave', handleML); window.removeEventListener('click', handleClick); }
      document.removeEventListener('visibilitychange', handleVis);
    };
  }, [mounted, resolvedTheme, reducedMotion]);

  if (!mounted) return null;
  const isDark = resolvedTheme !== 'light';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {!reducedMotion ? (
        <>
          <div ref={blob1Ref} style={{ position: 'absolute', top: '-18%', left: '-12%', width: '580px', height: '580px', borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%', background: isDark ? 'radial-gradient(circle at 35% 35%, rgba(255,90,78,0.22), rgba(255,90,78,0.08) 60%, transparent 80%)' : 'radial-gradient(circle at 35% 35%, rgba(255,90,78,0.14), rgba(255,140,80,0.06) 60%, transparent 80%)', filter: 'blur(100px)', willChange: 'transform' }} />
          <div ref={blob2Ref} style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '640px', height: '640px', borderRadius: '50% 60% 40% 55% / 55% 45% 60% 40%', background: isDark ? 'radial-gradient(circle at 65% 65%, rgba(255,90,78,0.18), rgba(255,90,78,0.06) 60%, transparent 80%)' : 'radial-gradient(circle at 65% 65%, rgba(255,90,78,0.10), rgba(255,165,100,0.05) 60%, transparent 80%)', filter: 'blur(120px)', willChange: 'transform' }} />
          <div ref={blob3Ref} style={{ position: 'absolute', top: '30%', right: '-18%', width: '420px', height: '420px', borderRadius: '48% 52% 55% 45% / 52% 48% 44% 56%', background: isDark ? 'radial-gradient(circle, rgba(27,36,64,0.6), rgba(34,46,82,0.3) 60%, transparent 80%)' : 'radial-gradient(circle, rgba(255,160,100,0.08), rgba(255,200,150,0.04) 60%, transparent 80%)', filter: 'blur(90px)', willChange: 'transform' }} />
          <div ref={blob4Ref} style={{ position: 'absolute', top: '10%', right: '30%', width: '220px', height: '220px', borderRadius: '55% 45% 60% 40% / 48% 52% 50% 50%', background: isDark ? 'radial-gradient(circle, rgba(255,90,78,0.14), transparent 70%)' : 'radial-gradient(circle, rgba(255,90,78,0.08), transparent 70%)', filter: 'blur(60px)', willChange: 'transform' }} />
        </>
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: isDark ? 'radial-gradient(ellipse 60% 50% at 20% 20%, rgba(255,90,78,0.14) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 80%, rgba(255,90,78,0.10) 0%, transparent 70%)' : 'radial-gradient(ellipse 60% 50% at 20% 20%, rgba(255,90,78,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 80%, rgba(255,90,78,0.06) 0%, transparent 70%)' }} />
      )}
      <div className="architectural-grid absolute inset-0 opacity-100" />
      {!reducedMotion && (
        <div ref={spotlightRef} style={{ position: 'fixed', top: 0, left: 0, width: '400px', height: '400px', borderRadius: '50%', background: isDark ? 'radial-gradient(circle, rgba(255,90,78,0.06) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255,90,78,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1, willChange: 'transform' }} />
      )}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: reducedMotion ? 0 : 0.95 }} />
    </div>
  );
}
