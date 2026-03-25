"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Deterministic pseudo-random fraction
function random(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const maskBase =
  "radial-gradient(ellipse at top, rgba(0,0,0,0.2) 40%, transparent 80%)";

function maskImageForVars(): string {
  return `${maskBase}, radial-gradient(200px circle at var(--grid-mx, 50vw) var(--grid-my, 35vh), rgba(0,0,0,0.7), transparent 80%)`;
}

export function BackgroundGrid() {
  const [mounted, setMounted] = useState(false);
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = maskLayerRef.current;
    if (!el) return;

    const setSpot = (x: string, y: string) => {
      el.style.setProperty("--grid-mx", x);
      el.style.setProperty("--grid-my", y);
    };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const applyReduced = () => {
      setSpot("50vw", "35vh");
    };

    const flush = () => {
      rafRef.current = 0;
      const { x, y } = posRef.current;
      setSpot(`${x}px`, `${y}px`);
    };

    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(flush);
    };

    const syncMode = () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }

      if (prefersReduced.matches) {
        applyReduced();
      } else {
        posRef.current.x = window.innerWidth / 2;
        posRef.current.y = window.innerHeight * 0.35;
        flush();
        window.addEventListener("mousemove", onMove);
      }
    };

    syncMode();
    prefersReduced.addEventListener("change", syncMode);

    return () => {
      prefersReduced.removeEventListener("change", syncMode);
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  // Generate uniform coordinate points that cover a vast screen area
  const MAX_SIZE = 3000;

  const verticalLines: number[] = [];
  let x = 0;
  while (x < MAX_SIZE) {
    verticalLines.push(Math.floor(x) + 0.5); // .5 for ultra-sharp SVG strokes
    x += 100; // Uniform 100px gaps
  }

  const horizontalLines: number[] = [];
  let y = 0;
  while (y < MAX_SIZE) {
    horizontalLines.push(Math.floor(y) + 0.5);
    y += 100; // Uniform 100px gaps
  }

  // Precompute segment existence logic to create merged rectangles
  const hSegments: boolean[][] = [];
  let seedH = 1000;
  for (let vi = 0; vi < verticalLines.length - 1; vi++) {
    hSegments[vi] = [];
    for (let hj = 0; hj < horizontalLines.length; hj++) {
      hSegments[vi][hj] = random(seedH++) > 0.6; // 60% chance to drop segment
    }
  }

  const vSegments: boolean[][] = [];
  let seedV = 2000;
  for (let vi = 0; vi < verticalLines.length; vi++) {
    vSegments[vi] = [];
    for (let hj = 0; hj < horizontalLines.length - 1; hj++) {
      vSegments[vi][hj] = random(seedV++) > 0.1; // 10% chance to drop segment
    }
  }

  const maskImage = maskImageForVars();

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#030303]">
      <div
        ref={maskLayerRef}
        className="relative h-full w-full"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          WebkitMaskComposite: "source-over",
          maskComposite: "add",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[3000px] h-[3000px]"
        >
          {/* Slightly brighter background grid while keeping foreground contrast readable */}
          <div className="h-full w-full text-white opacity-[0.46]">
            <svg width="100%" height="100%" overflow="visible">
              {/* Draw horizontal segments */}
              {verticalLines.map((v, vi) => {
                if (vi >= verticalLines.length - 1) return null;
                return horizontalLines.map((h, hj) => {
                  if (!hSegments[vi][hj]) return null;
                  return (
                    <line
                      key={`h-${vi}-${hj}`}
                      x1={v}
                      x2={verticalLines[vi + 1]}
                      y1={h}
                      y2={h}
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  );
                });
              })}

              {/* Draw vertical segments */}
              {verticalLines.map((v, vi) => {
                return horizontalLines.map((h, hj) => {
                  if (hj >= horizontalLines.length - 1) return null;
                  if (!vSegments[vi][hj]) return null;
                  return (
                    <line
                      key={`v-${vi}-${hj}`}
                      x1={v}
                      x2={v}
                      y1={h}
                      y2={horizontalLines[hj + 1]}
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  );
                });
              })}

              {/* Draw curve intersections only where both arms are present */}
              {verticalLines.map((v, vi) =>
                horizontalLines.map((h, hj) => {
                  const hasTop = hj > 0 && vSegments[vi][hj - 1];
                  const hasRight =
                    vi < verticalLines.length - 1 && hSegments[vi][hj];

                  if (hasTop && hasRight) {
                    return (
                      <path
                        key={`int-${vi}-${hj}`}
                        d={`M ${v} ${h} L ${v} ${h - 26} A 26 26 0 0 0 ${v + 26} ${h} Z`}
                        fill="currentColor"
                      />
                    );
                  }
                  return null;
                }),
              )}
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
