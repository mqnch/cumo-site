"use client";

import Image from "next/image";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main 
      className="relative min-h-screen flex flex-col items-center justify-start px-6 sm:px-24 overflow-x-hidden"
      style={{ paddingTop: '20vh', paddingBottom: '20vh' }}
    >
      <BackgroundGrid />

      {/* Hero / Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 flex flex-col items-center justify-center text-center max-w-3xl gap-8 sm:gap-12"
      >
        <div className="relative flex items-center justify-center mb-4 sm:mb-6">
          <div className="absolute inset-0 bg-white/50 dark:bg-white/20 blur-3xl rounded-full scale-150 opacity-0 dark:opacity-50"></div>
          <span className="sr-only">Cumo</span>
          <Image
            src="/cumo.svg"
            alt="Cumo Logo"
            width={140}
            height={56}
            priority
            className="relative z-10 rounded-[24px] sm:rounded-[28px] overflow-hidden dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          />
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-black/90 to-black/60 dark:from-white dark:to-white/70 leading-[1.1]">
          2 seconds and it's in your calendar.
        </h1>
        <p className="text-lg sm:text-xl font-light tracking-wide text-black/50 dark:text-white/40 max-w-xl">
          A seamless and frictionless workflow connecting natural language directly to your Google Calendar.
        </p>
      </motion.div>

      {/* Demo Video Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 w-full max-w-[1000px]"
        style={{ marginTop: '18vh' }}
      >
        <div className="relative aspect-[16/10] sm:aspect-video rounded-2xl sm:rounded-[2rem] p-[1px] bg-gradient-to-b from-black/10 to-transparent dark:from-white/20 dark:to-transparent overflow-hidden shadow-2xl shadow-black/5 dark:shadow-white/[0.03]">
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

      {/* Footer / Coming Soon */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="z-10 mt-32 sm:mt-40"
      >
        <div className="group relative flex items-center gap-3 px-6 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl shadow-sm transition-all hover:bg-black/5 dark:hover:bg-white/[0.04]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40 dark:bg-white/40 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black/60 dark:bg-white/60"></span>
          </span>
          <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-black/60 dark:text-white/60">
            Coming Soon
          </span>
        </div>
      </motion.div>
    </main>
  );
}



