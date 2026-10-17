'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';

const subscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-surface border border-border" aria-hidden="true" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9 rounded-full flex items-center justify-center border border-border bg-surface hover:bg-accent/10 hover:border-accent transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      {theme === 'dark' ? (
        <Sun size={16} className="text-text-secondary" />
      ) : (
        <Moon size={16} className="text-text-secondary" />
      )}
    </button>
  );
}
