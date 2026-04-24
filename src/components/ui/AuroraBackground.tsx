"use client";

export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ background: "#040911" }}
    >
      {/* Cyan glow — top right (matching logo bright cyan) */}
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
            "radial-gradient(circle, rgba(34,211,238,0.18) 0%, rgba(34,211,238,0.06) 40%, transparent 68%)",
          filter: "blur(1px)",
        }}
      />

      {/* Blue glow — bottom left (matching logo deep blue) */}
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
            "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 65%)",
        }}
      />

      {/* Subtle center cyan — mid page */}
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
            "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 60%, rgba(4,9,17,0.75) 100%)",
        }}
      />
    </div>
  );
}
