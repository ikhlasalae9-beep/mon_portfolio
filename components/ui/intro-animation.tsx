'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function IntroAnimation() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Check if already shown in this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('intro-shown')) {
      setVisible(false);
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            try {
              sessionStorage.setItem('intro-shown', 'true');
            } catch {}
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 8;
      });
    }, 45);

    const timer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem('intro-shown', 'true');
      } catch {}
    }, 1500);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        setVisible(false);
        try {
          sessionStorage.setItem('intro-shown', 'true');
        } catch {}
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const skip = () => {
    setVisible(false);
    try {
      sessionStorage.setItem('intro-shown', 'true');
    } catch {}
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={skip}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center cursor-pointer select-none bg-[#141B2D]"
          aria-label="Animation de chargement (cliquer pour passer)"
        >
          {/* Subtle coral ambient glow */}
          <div className="absolute w-72 h-72 rounded-full bg-[#FF5A4E]/15 blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            {/* Monogram Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 rounded-2xl bg-[#FF5A4E] text-[#141B2D] flex items-center justify-center font-display font-extrabold text-xl shadow-[0_0_30px_rgba(255,90,78,0.4)]"
            >
              AI
            </motion.div>

            {/* Candidate Name & Title */}
            <div>
              <p className="font-display font-extrabold text-xl tracking-tight text-[#F4F1EA]">
                Alae Ikhlas
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#FF5A4E] font-semibold mt-0.5">
                Data Analyst
              </p>
            </div>

            {/* Quick Numeric Counter */}
            <div className="mt-2 flex items-baseline gap-1 text-3xl font-display font-black text-[#F4F1EA] tracking-tighter">
              <span>{Math.min(count, 100)}</span>
              <span className="text-sm font-semibold text-[#FF5A4E]">%</span>
            </div>

            <span className="text-[11px] text-[#F4F1EA]/50 mt-1">
              Cliquer pour passer
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
