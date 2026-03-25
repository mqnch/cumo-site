"use client";

import { ReactLenis } from 'lenis/react';
// import 'lenis/dist/lenis.css'; // Optional, but often not required in Next.js

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      className="h-dvh max-h-dvh w-full overflow-x-hidden overflow-y-auto overscroll-y-contain"
      style={{ scrollbarGutter: "stable both-edges" }}
      options={{
        lerp: 0.08,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
