'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const subscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  if (!mounted) {
    return (
      <div
        className="w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)]"
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => {
        const next = isDark ? 'light' : 'dark';
        setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
      }}
      className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--surface)] hover:border-[#FF5A4E] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4E] text-[var(--text)] hover:text-[#FF5A4E]"
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
