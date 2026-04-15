"use client";

import type { CSSProperties } from "react";

export default function AuroraBackground() {

  const orb = (style: CSSProperties) => (
    <div style={{ position: "absolute", pointerEvents: "none", ...style }} />
  );

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ background: "#030712" }}
    >

      {/* ── Orb 1: indigo top-center ── */}
      {orb({
        width: "100vw",
        height: "70vh",
        top: "-25vh",
        left: "50%",
        transform: "translateX(-50%)",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.35) 0%, transparent 65%)",
        filter: "blur(55px)",
        animation: "orb1 18s ease-in-out infinite alternate",
      })}

      {/* ── Orb 2: violet left ── */}
      {orb({
        width: "70vw",
        height: "80vh",
        top: "10vh",
        left: "-25vw",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.28) 0%, transparent 60%)",
        filter: "blur(60px)",
        animation: "orb2 22s ease-in-out infinite alternate",
      })}

      {/* ── Orb 3: emerald bottom-right ── */}
      {orb({
        width: "70vw",
        height: "65vh",
        bottom: "-15vh",
        right: "-20vw",
        background: "radial-gradient(ellipse, rgba(16,185,129,0.24) 0%, transparent 60%)",
        filter: "blur(55px)",
        animation: "orb3 26s ease-in-out infinite alternate",
      })}

      {/* ── Orb 4: indigo center-right ── */}
      {orb({
        width: "50vw",
        height: "50vh",
        top: "35%",
        right: "5%",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 60%)",
        filter: "blur(45px)",
        animation: "orb4 14s ease-in-out infinite alternate",
      })}

      {/* ── Orb 5: cyan accent mid-left ── */}
      {orb({
        width: "45vw",
        height: "45vh",
        top: "55%",
        left: "20%",
        background: "radial-gradient(ellipse, rgba(6,182,212,0.14) 0%, transparent 60%)",
        filter: "blur(50px)",
        animation: "orb5 30s ease-in-out infinite alternate",
      })}

      {/* ── Orb 6: rose accent bottom-left (extra depth) ── */}
      {orb({
        width: "40vw",
        height: "40vh",
        bottom: "5%",
        left: "-5vw",
        background: "radial-gradient(ellipse, rgba(244,63,94,0.10) 0%, transparent 60%)",
        filter: "blur(55px)",
        animation: "orb2 34s ease-in-out infinite alternate-reverse",
      })}

      {/* ── Dot grid overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.14) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          animation: "gridDrift 20s linear infinite",
        }}
      />
    </div>
  );
}
