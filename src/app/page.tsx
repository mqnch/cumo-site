"use client";

import { BackgroundGrid } from "@/components/BackgroundGrid";
import { LightBeam } from "@/components/LightBeam";

// Static noise data-URI — tiled as a cached bitmap, renders instantly.
// Uses feColorMatrix to map the turbulence strictly to white dots with varying alpha.
const NOISE_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1, 0 0 0 0 1, 0 0 0 0 1, 1 0 0 0 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

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
      className="min-h-screen flex flex-col items-center relative overflow-hidden px-4"
      style={{ paddingTop: '3vh', paddingBottom: '30vh' }}
    >
      <BackgroundGrid />

      {/* Full-screen grain — renders immediately at page level */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          pointerEvents: "none",
          backgroundImage: `url("${NOISE_URI}")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "screen",
          opacity: 0.12, // Increased slightly since it's purely white noise now
        }}
      />

      <div className="z-10 w-full max-w-[1000px] flex flex-col items-start px-4 sm:px-0 gap-y-20 sm:gap-y-28">
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
            <p className="text-3xl sm:text-5xl lg:text-6xl text-white max-w-4xl text-left tracking-tight leading-[1.1] font-bold">
              natural language to<br />your calendar in &lt;2s.
            </p>
            <p className="text-lg sm:text-xl text-white/60 font-medium tracking-wide max-w-2xl leading-relaxed">
              Cumo lets you schedule events in a blink of an eye. Don't break your workflow, use Cumo.
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
        <div className="relative w-full" style={{ overflow: 'visible' }}>
          <LightBeam />

          {/* Demo video container */}
          <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-2xl sm:rounded-[2rem] p-[1px] bg-gradient-to-b from-white/20 to-transparent overflow-hidden shadow-2xl shadow-white/[0.03]" style={{ zIndex: 2 }}>
            <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-[#080808] flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.02]" />
              
              <div className="relative flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10 shadow-lg">
                  <svg className="w-6 h-6 ml-1 text-white/60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/30 font-mono text-xs tracking-[0.2em] uppercase">
                  Demo Video
                </p>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </div>

      {/* Core Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8 px-6 mb-24 md:mb-40"
        style={{ marginTop: '12vh' }}
      >
        <div className="flex flex-col items-center text-center" style={{ gap: '1.25rem' }}>
          <div className="w-12 h-12 rounded-full border border-white/10 bg-white/10 shadow-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-col items-center" style={{ gap: '0.5rem' }}>
            <h3 className="text-xl font-bold tracking-tight text-white/90">sub 50ms latency</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-[260px]">
              instant nlp. from natural language to calendar event in a single keystroke.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center" style={{ gap: '1.25rem' }}>
          <div className="w-12 h-12 rounded-full border border-white/10 bg-white/10 shadow-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <div className="flex flex-col items-center" style={{ gap: '0.5rem' }}>
            <h3 className="text-xl font-bold tracking-tight text-white/90">local-first</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-[270px]">
              zero network bottlenecks. local processing keeps your data private and your workflow fast.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center" style={{ gap: '1.25rem' }}>
          <div className="w-12 h-12 rounded-full border border-white/10 bg-white/10 shadow-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div className="flex flex-col items-center" style={{ gap: '0.5rem' }}>
            <h3 className="text-xl font-bold tracking-tight text-white/90">minimal as hell</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-[260px]">
              no messy forms or cluttered uis. hit the shortcut, type, and return to building.
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}



