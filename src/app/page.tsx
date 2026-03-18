"use client";

import { BackgroundGrid } from "@/components/BackgroundGrid";
import { FluidBlob } from "@/components/FluidBlob";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main 
      className="relative min-h-screen flex flex-col items-center justify-start px-6 sm:px-24 overflow-x-hidden font-mono"
      style={{ paddingTop: '18vh', paddingBottom: '20vh' }}
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
        
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-black/90 to-black/50 dark:from-white dark:to-white/50 leading-tight pb-2">
          Cumo
        </h1>
        
        <p className="text-lg sm:text-xl text-black/60 dark:text-white/60 max-w-xl text-center mt-2 tracking-wide leading-relaxed font-light">
          Your focused productivity companion.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium tracking-wide shadow-lg shadow-black/20 dark:shadow-white/10 hover:shadow-xl transition-shadow"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Demo Video Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 w-full max-w-[1000px]"
        style={{ marginTop: '12vh' }}
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
        className="z-10 mt-32 sm:mt-40 mb-64 sm:mb-96"
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



