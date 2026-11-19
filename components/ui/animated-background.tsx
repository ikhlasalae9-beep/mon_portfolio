'use client';

import dynamic from 'next/dynamic';

export const AnimatedBackground = dynamic(
  () => import('./halftone-nebula').then((mod) => mod.HalftoneNebula),
  {
    ssr: false,
    loading: () => null,
  }
);
