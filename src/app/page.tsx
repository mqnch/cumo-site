"use client";

import { BackgroundGrid } from "@/components/BackgroundGrid";
import { FluidBlob } from "@/components/FluidBlob";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main 
      className="relative min-h-screen flex flex-col items-center justify-start px-6 sm:px-24 overflow-x-hidden font-mono"
      style={{ paddingTop: '18vh', paddingBottom: '30vh' }}
    >
      <BackgroundGrid />
      <FluidBlob />

      {/* Hero / Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 flex flex-col items-center justify-center text-center max-w-4xl gap-6 sm:gap-8 w-full mt-20"
      >
        <div className="flex items-center justify-center gap-6 sm:gap-8">
          <Image 
            src="/cumo.svg" 
            alt="Cumo Logo" 
            width={72} 
            height={72} 
            className="rounded-[1.5rem] shadow-xl shadow-black/10 dark:shadow-white/5 w-16 h-16 sm:w-20 sm:h-20"
          />
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-black/90 to-black/50 dark:from-white dark:to-white/50 leading-tight">
            Cumo
          </h1>
        </div>
        
        <p className="text-lg sm:text-xl text-black/60 dark:text-white/60 max-w-2xl text-center mt-2 tracking-wide leading-relaxed font-light">
          Natural language to your calendar in 50ms. <br /> No friction, just pure speed for high-velocity builders.
        </p>
      </motion.div>

      {/* Demo Video Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 w-full max-w-[1000px] flex flex-col items-center sm:gap-8"
        style={{ marginTop: '6vh', gap: '1.5rem' }}
      >
        <motion.a
          href="https://github.com/mqnch/Cumo"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-md shadow-sm hover:bg-black/5 dark:hover:bg-white/5 transition-all group"
          style={{ padding: '0.25rem 1rem', gap: '0.75rem' }}
        >
          <svg className="w-4 h-4 text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="text-xs font-medium text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors tracking-wide">
            mqnch/Cumo
          </span>
        </motion.a>

        <div 
          className="flex items-center rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-md shadow-sm"
          style={{ padding: '0.25rem 1rem', gap: '0.75rem' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40 dark:bg-white/40 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black/60 dark:bg-white/60"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-black/60 dark:text-white/60 mt-[1px]">
            Release Build Coming Soon
          </span>
        </div>

        <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-2xl sm:rounded-[2rem] p-[1px] bg-gradient-to-b from-black/10 to-transparent dark:from-white/20 dark:to-transparent overflow-hidden shadow-2xl shadow-black/5 dark:shadow-white/[0.03]">
          <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-[#fdfdfd] dark:bg-[#080808] flex items-center justify-center overflow-hidden">
            {/* Inner subtle glow */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/20" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/[0.02] dark:to-white/[0.02]" />
            
            <div className="relative flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg">
                <svg className="w-6 h-6 ml-1 text-black/40 dark:text-white/60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-black/30 dark:text-white/30 font-mono text-xs tracking-[0.2em] uppercase">
                Demo Video
              </p>
            </div>
          </div>
        </div>
      </motion.div>

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
          <div className="w-12 h-12 rounded-full border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/10 shadow-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-black/60 dark:text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-col items-center" style={{ gap: '0.5rem' }}>
            <h3 className="text-xl font-bold tracking-tight text-black/90 dark:text-white/90">Sub 50ms Latency</h3>
            <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed max-w-[260px]">
              Instant NLP. From natural language to calendar event in a single keystroke.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center" style={{ gap: '1.25rem' }}>
          <div className="w-12 h-12 rounded-full border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/10 shadow-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-black/60 dark:text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <div className="flex flex-col items-center" style={{ gap: '0.5rem' }}>
            <h3 className="text-xl font-bold tracking-tight text-black/90 dark:text-white/90">Local-First</h3>
            <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed max-w-[260px]">
              Zero network bottlenecks. On-device processing keeps your data private and your workflow fast.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center" style={{ gap: '1.25rem' }}>
          <div className="w-12 h-12 rounded-full border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/10 shadow-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-black/60 dark:text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div className="flex flex-col items-center" style={{ gap: '0.5rem' }}>
            <h3 className="text-xl font-bold tracking-tight text-black/90 dark:text-white/90">Radically Minimal</h3>
            <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed max-w-[260px]">
              No forms or cluttered UIs. Hit the shortcut, type, and return to building.
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}



