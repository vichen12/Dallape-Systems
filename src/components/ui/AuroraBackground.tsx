"use client";

export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ background: "#040911" }}
    >
      {/* Grid de líneas finas teñidas de cyan */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Puntos en intersecciones */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(34,211,238,0.20) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Grain / ruido — textura orgánica de profundidad */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0.045, mixBlendMode: "overlay" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Glow cyan — arriba derecha */}
      <div
        className="absolute"
        style={{
          top: "-10%",
          right: "-5%",
          width: "70vw",
          height: "70vw",
          maxWidth: "900px",
          maxHeight: "900px",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.20) 0%, rgba(34,211,238,0.06) 40%, transparent 68%)",
          filter: "blur(2px)",
        }}
      />

      {/* Glow azul — abajo izquierda */}
      <div
        className="absolute"
        style={{
          bottom: "0%",
          left: "-8%",
          width: "60vw",
          height: "60vw",
          maxWidth: "750px",
          maxHeight: "750px",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.16) 0%, transparent 65%)",
        }}
      />

      {/* Glow sutil centro */}
      <div
        className="absolute"
        style={{
          top: "40%",
          left: "30%",
          width: "40vw",
          height: "40vw",
          maxWidth: "500px",
          maxHeight: "500px",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Fade inferior */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 60%, rgba(4,9,17,0.80) 100%)",
        }}
      />

      {/* Vignette perimetral */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(4,9,17,0.65) 100%)",
        }}
      />
    </div>
  );
}
