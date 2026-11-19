'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[#FF5A4E] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(255,90,78,0.7)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
