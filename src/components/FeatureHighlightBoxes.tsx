"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const mono =
  "font-[family-name:var(--font-geist-mono),ui-monospace,monospace]";

const cardClass = [
  "relative z-[1] flex h-full min-h-[300px] flex-col overflow-hidden rounded-2xl",
  "border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-transparent",
].join(" ");

/* Slower press ramp + slight delay so movement reads as a physical key press. */
const keycapOuterTransition =
  "transition-[transform,box-shadow] duration-[1200ms] delay-[40ms] ease-[cubic-bezier(0.32,0,0.15,1)]";
const keycapInnerTransition =
  "transition-[transform,box-shadow] duration-[1200ms] delay-[40ms] ease-[cubic-bezier(0.32,0,0.15,1)]";

/* ─── Keycap (MacBook Air–style: chassis rim + extruded face) ─ */

function Keycap({ children }: { children: ReactNode }) {
  return (
    <span
      className={[
        "relative inline-flex rounded-[13px] p-[3px]",
        "bg-gradient-to-b from-white/[0.07] to-black/55",
        keycapOuterTransition,
        "shadow-[0_3px_0_rgba(0,0,0,0.65),0_14px_28px_rgba(0,0,0,0.42)]",
        "group-hover/card:translate-y-[2px]",
        "group-hover/card:shadow-none",
        "group-hover/keys:translate-y-[2px]",
        "group-hover/keys:shadow-none",
        "motion-reduce:group-hover/card:translate-y-0",
        "motion-reduce:group-hover/card:shadow-[0_3px_0_rgba(0,0,0,0.65),0_14px_28px_rgba(0,0,0,0.42)]",
        "motion-reduce:group-hover/keys:translate-y-0",
        "motion-reduce:group-hover/keys:shadow-[0_3px_0_rgba(0,0,0,0.65),0_14px_28px_rgba(0,0,0,0.42)]",
      ].join(" ")}
    >
      <span
        className={[
          "relative inline-flex h-[4.85rem] min-w-[4.85rem] items-center justify-center rounded-[10px] px-6",
          "text-[19px] font-semibold tabular-nums text-white/[0.88]",
          "bg-gradient-to-b from-white/[0.18] via-white/[0.09] to-white/[0.035]",
          keycapInnerTransition,
          "shadow-[inset_0_2px_0_rgba(255,255,255,0.26),inset_0_-4px_8px_rgba(0,0,0,0.5),0_4px_0_rgba(0,0,0,0.55),0_8px_0_rgba(0,0,0,0.35),0_16px_32px_rgba(0,0,0,0.5)]",
          "group-hover/card:translate-y-[2px]",
          "group-hover/card:shadow-none",
          "group-hover/keys:translate-y-[2px]",
          "group-hover/keys:shadow-none",
          "motion-reduce:group-hover/card:translate-y-0",
          "motion-reduce:group-hover/card:shadow-[inset_0_2px_0_rgba(255,255,255,0.26),inset_0_-4px_8px_rgba(0,0,0,0.5),0_4px_0_rgba(0,0,0,0.55),0_8px_0_rgba(0,0,0,0.35),0_16px_32px_rgba(0,0,0,0.5)]",
          "motion-reduce:group-hover/keys:translate-y-0",
          "motion-reduce:group-hover/keys:shadow-[inset_0_2px_0_rgba(255,255,255,0.26),inset_0_-4px_8px_rgba(0,0,0,0.5),0_4px_0_rgba(0,0,0,0.55),0_8px_0_rgba(0,0,0,0.35),0_16px_32px_rgba(0,0,0,0.5)]",
          "ring-1 ring-inset ring-white/[0.1]",
        ].join(" ")}
      >
        {children}
      </span>
    </span>
  );
}

/* ─── Shortcut Visual ────────────────────────────────────── */

function ShortcutVisual() {
  return (
    <div
      className="relative flex min-h-[8rem] w-full items-center justify-center"
      aria-hidden="true"
    >
      <div className="group/keys relative inline-flex cursor-default items-center gap-4 rounded-xl p-2 -m-2 sm:gap-5">
        <Keycap>
          <span className="text-[2rem] leading-none">⌘</span>
        </Keycap>

        <span className="select-none text-base font-medium text-white/30">+</span>

        <Keycap>
          <span className="text-[1.75rem] font-bold leading-none">/</span>
        </Keycap>
      </div>
    </div>
  );
}

/* ─── Lock Visual (3D on the glyph only — no outer keycap box) ─ */

function LockVisual() {
  const shackleD =
    "M 24 34 V 26 C 24 21 30 16 36 16 C 42 16 48 21 48 26 V 34";

  return (
    <div
      className="relative flex min-h-[8rem] w-full items-center justify-center"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 72 72"
        className="relative h-[8.5rem] w-[8.5rem] shrink-0 sm:h-[9rem] sm:w-[9rem]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Opaque base so shackle strokes drawn underneath don’t show through */}
          <linearGradient id="lock-body-fill" x1="36" y1="34" x2="36" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5c5c62" />
            <stop offset="0.45" stopColor="#3d3d42" />
            <stop offset="1" stopColor="#1c1c20" />
          </linearGradient>
          <linearGradient id="lock-body-rim" x1="36" y1="34" x2="36" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(255,255,255,0.38)" />
            <stop offset="0.35" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="1" stopColor="rgba(0,0,0,0.5)" />
          </linearGradient>
          <linearGradient id="lock-face-gleam" x1="36" y1="34" x2="36" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(255,255,255,0.35)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="lock-shackle" x1="27" y1="15" x2="45" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(255,255,255,0.95)" />
            <stop offset="0.55" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.28)" />
          </linearGradient>
          <clipPath id="lock-body-clip">
            <rect x="19" y="34" width="34" height="26" rx="5" />
          </clipPath>
          <filter id="lock-icon-float" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow
              in="SourceAlpha"
              dx="0"
              dy="3"
              stdDeviation="1.5"
              floodColor="#000"
              floodOpacity="0.58"
              result="d1"
            />
            <feDropShadow
              in="SourceAlpha"
              dx="0"
              dy="7"
              stdDeviation="4"
              floodColor="#000"
              floodOpacity="0.32"
              result="d2"
            />
            <feMerge>
              <feMergeNode in="d2" />
              <feMergeNode in="d1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#lock-icon-float)">
          {/* Shackle first; body drawn on top occludes legs “inside” the metal */}
          <g
            className="origin-[48px_34px] rotate-[18deg] transition-transform duration-[820ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:rotate-0 motion-reduce:rotate-0 motion-reduce:transition-none"
          >
            <path
              d={shackleD}
              transform="translate(0,1.25)"
              stroke="rgba(0,0,0,0.55)"
              strokeWidth="3.15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={shackleD}
              stroke="url(#lock-shackle)"
              strokeWidth="2.85"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          <g clipPath="url(#lock-body-clip)">
            <rect x="19" y="34" width="34" height="26" rx="5" fill="url(#lock-body-fill)" />
            <rect x="19" y="34" width="34" height="15" rx="5" fill="url(#lock-face-gleam)" />
          </g>

          <rect
            x="19"
            y="34"
            width="34"
            height="26"
            rx="5"
            fill="none"
            stroke="url(#lock-body-rim)"
            strokeWidth="1.5"
          />

          <circle cx="36" cy="45" r="2.35" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.14)" strokeWidth="0.5" />
          <path
            d="M 36 47.15 V 51.35"
            stroke="rgba(0,0,0,0.55)"
            strokeWidth="1.85"
            strokeLinecap="round"
          />
          <path
            d="M 36 46.95 V 51.15"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

/* ─── Feature Column ─────────────────────────────────────── */

function FeatureColumn({
  title,
  description,
  children,
  index,
}: {
  title: string;
  description: string;
  children: ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <div className="group/card relative h-full">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 ease-out group-hover/card:opacity-100 motion-reduce:transition-none"
          style={{
            boxShadow:
              "0 0 0 1px rgba(90,165,255,0.24), 0 0 20px 2px rgba(90,165,255,0.2), 0 0 38px 6px rgba(60,130,255,0.1)",
          }}
        />
        <div className={cardClass}>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

        <div className="flex min-h-0 flex-1 flex-col p-8 sm:p-10">
          <div className="flex shrink-0 flex-col gap-2.5">
            <h3 className="text-xl font-bold tracking-tight text-white/90 sm:text-2xl">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-white/45 sm:text-[15px] sm:leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex min-h-[8rem] flex-1 flex-col items-center justify-center pt-4">
            {children}
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────── */

export function FeatureHighlightSection() {
  return (
    <section
      className={`relative z-[12] grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:items-stretch md:gap-10 ${mono}`}
      aria-label="Product highlights"
    >
      <FeatureColumn
        title="Just hit the shortcut."
        description="The bar opens instantly—type in plain language and slip back into your flow."
        index={0}
      >
        <ShortcutVisual />
      </FeatureColumn>

      <FeatureColumn
        title="Fast local NLP."
        description="Processing stays on your machine, and there's no LLM API calls to slow you down."
        index={1}
      >
        <LockVisual />
      </FeatureColumn>
    </section>
  );
}
