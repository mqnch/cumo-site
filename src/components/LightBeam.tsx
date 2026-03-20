"use client";

/**
 * LightBeam — Huly-style volumetric beam using only soft radial gradients.
 * No clip-path. The taper comes from radial-gradient ellipses positioned
 * high, so the glow naturally widens as it extends downward.
 * 5 layers total, all GPU-composited.
 */
export function LightBeam() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "visible",
        zIndex: 0,
      }}
    >
      {/* ── 1. Wide ambient glow (radial, positioned high → fans outward) ── */}
      <div
        className="lb-gpu"
        style={{
          position: "absolute",
          right: "25%",
          top: "-800px",
          width: "1400px",
          height: "2800px",
          transform: "translateX(50%)",
          background:
            "radial-gradient(ellipse 25% 45% at 50% 25%, rgba(60,140,255,0.16) 0%, rgba(45,115,235,0.06) 50%, transparent 100%)",
          mixBlendMode: "screen",
          animation: "lb-pulse 4s ease-in-out infinite",
        }}
      />

      {/* ── 2. Bloom body (radial, tight → naturally widens with blur) ───── */}
      <div
        className="lb-gpu lb-flow-el"
        style={{
          position: "absolute",
          right: "25%",
          top: "-800px",
          width: "800px",
          height: "2800px",
          transform: "translateX(50%)",
          background:
            "radial-gradient(ellipse 12% 42% at 50% 30%, rgba(160,215,255,0.45) 0%, rgba(120,190,255,0.20) 40%, rgba(80,160,255,0.05) 70%, transparent 100%)",
          filter: "blur(40px)",
          opacity: 0.7,
          mixBlendMode: "screen",
        }}
      />

      {/* ── 3. Bright core (narrow, intense white) ─────────────────────────── */}
      <div
        className="lb-gpu"
        style={{
          position: "absolute",
          right: "25%",
          top: "-800px",
          width: "20px",
          height: "2800px",
          transform: "translateX(50%)",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.10) 5%, rgba(255,255,255,0.45) 15%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.50) 80%, rgba(255,255,255,0.08) 95%, transparent 100%)",
          filter: "blur(6px)",
          opacity: 0.55,
          mixBlendMode: "screen",
        }}
      />

      {/* ── 4. Massive flare splash at demo container top ──────────────────── */}
      <div
        className="lb-gpu"
        style={{
          position: "absolute",
          left: "-90%",
          top: "-270px",
          width: "225%",
          height: "300px",
          background:
            "radial-gradient(ellipse 40% 100% at 63% 100%, rgba(90,165,255,0.32) 0%, rgba(120,195,255,0.15) 30%, rgba(60,130,255,0.05) 55%, transparent 70%)",
          filter: "blur(30px)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
