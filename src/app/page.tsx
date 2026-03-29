"use client";

import { BackgroundGrid } from "@/components/BackgroundGrid";
import { FeatureHighlightSection } from "@/components/FeatureHighlightBoxes";
import { LightBeam } from "@/components/LightBeam";
import { VideoPlayer } from "@/components/VideoPlayer";

// Static noise data-URI — tiled as a cached bitmap, renders instantly.
// Uses feColorMatrix to map the turbulence strictly to white dots with varying alpha.
const NOISE_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1, 0 0 0 0 1, 0 0 0 0 1, 1 0 0 0 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_HEADLINE_LINES = ["natural language to", "your calendar in <2s"];

function InteractiveHeroHeadline() {
  return (
    <p
      className="text-3xl sm:text-5xl lg:text-6xl text-white max-w-4xl text-left tracking-tight leading-[1.1] font-bold"
      aria-label="natural language to your calendar in <2s."
    >
      {HERO_HEADLINE_LINES.map((line, lineIndex) => (
        <span key={`line-${lineIndex}`} aria-hidden="true">
          {line.split("").map((char, charIndex) => {
            if (char === " ") {
              return <span key={`space-${lineIndex}-${charIndex}`} className="inline-block">&nbsp;</span>;
            }

            return (
              <motion.span
                key={`char-${lineIndex}-${charIndex}`}
                className="inline-block text-white transition-colors duration-[7000ms] ease-out hover:text-[#6b7f98] hover:duration-150 motion-reduce:transition-none motion-reduce:hover:text-white"
              >
                {char}
              </motion.span>
            );
          })}
          {lineIndex < HERO_HEADLINE_LINES.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  );
}

export default function Home() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/mqnch/Cumo")
      .then(res => res.json())
      .then(data => setStars(data.stargazers_count))
      .catch(() => {});
  }, []);

  return (
    <main
      className="relative flex min-h-screen w-full flex-col"
      style={{ paddingTop: "3vh", paddingBottom: "4vh" }}
    >
      <BackgroundGrid />

      {/* Full-screen grain — renders immediately at page level */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 5, // Lower than content (10) but higher than grid (-1)
          pointerEvents: "none",
          contain: "paint",
          backgroundImage: `url("${NOISE_URI}")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "screen",
          opacity: 0.095,
        }}
      />

      {/*
        Grid-aligned column: same centering as BackgroundGrid (do not use items-center on main —
        that stacks with left-1/2 and shifts everything right). 1000px ≈ verticals at SVG x 1000–2000.
      */}
      <div className="z-10 box-border mx-auto flex w-full max-w-[1000px] flex-col items-stretch gap-y-20 px-4 sm:gap-y-28 sm:px-0">
        {/* Header Section */}
        <div className="flex flex-col items-start w-full gap-y-24 sm:gap-y-32">
          <header className="w-full flex items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <Image 
                src="/cumo.svg" 
                alt="Cumo Logo" 
                width={40} 
                height={40} 
                className="rounded-xl shadow-xl shadow-white/5 w-8 h-8 sm:w-10 sm:h-10"
              />
              <h1 className="text-xl sm:text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 leading-tight">
                Cumo
              </h1>
            </motion.div>
          </header>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-y-2 sm:gap-y-4"
          >
            <InteractiveHeroHeadline />
            <p className="text-lg sm:text-xl text-white/60 font-medium tracking-wide max-w-2xl leading-relaxed">
              Cumo lets you schedule events in a blink of an eye. Don&apos;t break your workflow. Use Cumo.
            </p>
            
            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com/mqnch/Cumo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-sm hover:bg-white/5 transition-all group"
                style={{ padding: '0.35rem 0.75rem', gap: '0.65rem' }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-xs font-semibold text-white/60 group-hover:text-white transition-colors tracking-wide">
                    Star
                  </span>
                </div>
                
                <div className="w-px h-3.5 bg-white/10" />
                
                <div className="flex items-center gap-0.5">
                  <svg className="w-3.5 h-3.5 text-white/40 group-hover:text-yellow-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="text-xs font-bold text-white/80 tabular-nums">
                    {stars !== null ? stars.toLocaleString() : "-"}
                  </span>
                </div>
              </motion.a>

              <div 
                className="flex items-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-sm"
                style={{ padding: '0.25rem 0.75rem', gap: '0.75rem' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white/60"></span>
                </span>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60 mt-[1px]">
                  Release Build Coming Soon
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Demo Video Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-col items-start sm:gap-8"
          style={{ gap: '0.75rem' }}
        >

        {/* Wrapper: demo container + light beam */}
        <div className="relative w-full" style={{ overflow: "visible" }}>
          <LightBeam />

          {/* Demo video container - z-index high enough to sit above global grain (50) */}
          <div className="relative w-full aspect-video rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl shadow-white/[0.03]" style={{ zIndex: 60 }}>
            <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
              <VideoPlayer 
                src="https://fl3z9qisrqmcielb.public.blob.vercel-storage.com/demo.mp4" 
                poster="/demo-poster.png" 
                className="w-full h-full object-cover scale-[1.01]" 
              />
            </div>
          </div>
        </div>
        </motion.div>

        <FeatureHighlightSection />

        <div className="w-full text-left mt-8 sm:mt-12">
          <p className="text-sm font-medium text-white/40">
            2026 &copy; Cumo
          </p>
        </div>
      </div>
    </main>
  );
}



