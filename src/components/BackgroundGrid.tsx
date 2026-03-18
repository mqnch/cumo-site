"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Deterministic pseudo-random fraction
function random(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function BackgroundGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      hSegments[vi][hj] = random(seedH++) > 0.60; // 60% chance to drop segment
    }
  }

  const vSegments: boolean[][] = []; 
  let seedV = 2000;
  for (let vi = 0; vi < verticalLines.length; vi++) {
    vSegments[vi] = [];
    for (let hj = 0; hj < horizontalLines.length - 1; hj++) {
      vSegments[vi][hj] = random(seedV++) > 0.60; // 60% chance to drop segment
    }
  }

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white dark:bg-[#030303]">
      <div 
        className="relative w-full h-full"
        style={{
          maskImage: "radial-gradient(ellipse at top, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at top, black 40%, transparent 80%)"
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[3000px] h-[3000px]"
        >
          {/* Wrapper dictates flat overlay opacity to prevent overlaps from darkening */}
          <div className="w-full h-full text-black dark:text-white opacity-[0.07] dark:opacity-[0.04]">
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
                      x2={verticalLines[vi+1]} 
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
                      y2={horizontalLines[hj+1]} 
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
                  const hasRight = vi < verticalLines.length - 1 && hSegments[vi][hj];

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
                })
              )}
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

