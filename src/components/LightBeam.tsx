"use client";

/**
 * LightBeam — Huly-style volumetric beam using soft radial gradients.
 * Top/bottom halos sit outside the card on Y; the right halo is anchored with
 * `left: 100%` so the strip lies entirely to the right of the frame (still
 * z-behind the card) and stays visible instead of sitting under the opaque fill.
 */

/** Beam center along width (matches right 25% + translateX(50%) column). */
const BEAM_AXIS_X = 0.75;
const FLARE_OVERFLOW_LEFT = 0.2;
const FLARE_OVERFLOW_RIGHT = 0.04;
const FLARE_ELLIPSE_X_PCT = 68;

const flareSpan = 1 + FLARE_OVERFLOW_LEFT + FLARE_OVERFLOW_RIGHT;
const flareWidthPct = flareSpan * 100;
const flareLeftPct = -FLARE_OVERFLOW_LEFT * 100;
const flareAtXPct =
  ((BEAM_AXIS_X + FLARE_OVERFLOW_LEFT) / flareSpan) * 100;

const HALO_GRADIENT_STOPS =
  "rgba(90,165,255,0.34) 0%, rgba(120,195,255,0.15) 28%, rgba(60,130,255,0.06) 52%, transparent 72%";

/** Outside the right edge only; vertical extent matches the video box (`inset: 0`). */
const RIGHT_HALO_WIDTH_PX = 340;
/** Pull strip left so the glow hugs the frame (px inward from `left: 100%`). */
const RIGHT_HALO_OFFSET_LEFT_PX = 72;
/** Bright at the card rim (left of strip), opening to the right — same stops as horizontal halos. */
const RIGHT_HALO_GRADIENT =
  "linear-gradient(90deg, rgba(90,165,255,0.34) 0%, rgba(120,195,255,0.15) 28%, rgba(60,130,255,0.06) 52%, transparent 78%)";

export function LightBeam() {
  const horizontalFlare = (y: "100%" | "0%") =>
    `radial-gradient(ellipse ${FLARE_ELLIPSE_X_PCT}% 100% at ${flareAtXPct}% ${y}, ${HALO_GRADIENT_STOPS})`;

  return (
    <div
      aria-hidden="true"
      className="lb-root"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "visible",
        zIndex: 0,
      }}
    >
      {/* Wide ambient + pulse — no blur */}
      <div
        className="lb-pulse-el"
        style={{
          position: "absolute",
          right: "25%",
          top: "-1000px",
          width: "1200px",
          height: "1700px",
          transform: "translateX(50%)",
          background:
            "radial-gradient(ellipse 22% 42% at 52% 25%, rgba(60,140,255,0.14) 0%, rgba(45,115,235,0.055) 50%, transparent 100%)",
          mixBlendMode: "screen",
          maskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 28%, black 52%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 28%, black 52%)",
        }}
      />

      {/* Bloom body — single animated layer with will-change: transform */}
      <div
        className="lb-flow-el"
        style={{
          position: "absolute",
          right: "27%",
          top: "-800px",
          width: "720px",
          height: "1900px",
          transform: "translateX(50%)",
          background:
            "radial-gradient(ellipse 11% 40% at 52% 30%, rgba(160,215,255,0.45) 0%, rgba(120,190,255,0.18) 40%, rgba(80,160,255,0.05) 70%, transparent 100%)",
          filter: "blur(26px)",
          opacity: 0.7,
          mixBlendMode: "screen",
          maskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.25) 32%, black 55%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.25) 32%, black 55%)",
        }}
      />

      {/* Core — narrow, light blur */}
      <div
        style={{
          position: "absolute",
          right: "25%",
          top: "-700px",
          width: "20px",
          height: "1700px",
          transform: "translateX(50%)",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.08) 5%, rgba(184, 183, 226, 0.39) 5%, rgba(255,255,255,0.06) 95%, transparent 100%)",
          filter: "blur(4px)",
          opacity: 0.6,
          mixBlendMode: "screen",
        }}
      />

      {/* Top horizontal halo — no clip/mask; extends freely past card width */}
      <div
        style={{
          position: "absolute",
          left: `${flareLeftPct}%`,
          width: `${flareWidthPct}%`,
          top: "-230px",
          height: "280px",
          background: horizontalFlare("100%"),
          filter: "blur(22px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Bottom horizontal halo */}
      <div
        style={{
          position: "absolute",
          left: `${flareLeftPct}%`,
          width: `${flareWidthPct}%`,
          bottom: "-230px",
          height: "280px",
          background: horizontalFlare("0%"),
          filter: "blur(22px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Right halo: flush with video top/bottom; opens right, nudged left toward the card */}
      <div
        style={{
          position: "absolute",
          left: `calc(100% - ${RIGHT_HALO_OFFSET_LEFT_PX}px)`,
          top: 0,
          height: "100%",
          width: `${RIGHT_HALO_WIDTH_PX}px`,
          overflow: "hidden",
          background: RIGHT_HALO_GRADIENT,
          filter: "blur(22px)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
