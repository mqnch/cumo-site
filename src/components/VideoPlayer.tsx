"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (err) {
          console.warn("Video autoplay failed:", err);
          // Auto-play might fail due to browser policies if not muted correctly
          // or if the source is broken
        }
      };
      
      playVideo();
    }
  }, [src]);

  const handleVideoError = () => {
    const video = videoRef.current;
    if (video && video.error) {
      let message = "Unknown error loading video";
      switch (video.error.code) {
        case 1: message = "Video loading aborted"; break;
        case 2: message = "Network error while loading video"; break;
        case 3: message = "Video decoding failed"; break;
        case 4: message = "Video format not supported or URL inaccessible"; break;
      }
      console.error(`Video Error (Code ${video.error.code}): ${message}`, src);
      setError(message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: isLoaded ? 1 : 0.5, scale: isLoaded ? 1 : 0.98 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => {
          console.log("Video can play:", src);
          setIsLoaded(true);
          setError(null);
        }}
        onError={handleVideoError}
        className="w-full h-full object-cover"
        aria-label="Cumo product demo"
      />
      
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md p-6 text-center">
          <div className="text-red-400 mb-2 font-mono text-sm uppercase tracking-widest">Load Error</div>
          <p className="text-white/60 text-xs max-w-[200px] leading-relaxed">
            {error}
          </p>
          <p className="mt-4 text-[10px] text-white/30 truncate max-w-full italic">
            {src}
          </p>
        </div>
      )}

      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}
    </motion.div>
  );
}
