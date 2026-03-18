"use client";

import { ReactLenis } from 'lenis/react';
// import 'lenis/dist/lenis.css'; // Optional, but often not required in Next.js

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, 
        duration: 1.5, 
        smoothWheel: true 
      }}
    >
      {children}
    </ReactLenis>
  );
}
