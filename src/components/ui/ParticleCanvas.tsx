"use client";

/* eslint-disable react-hooks/purity */

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react";

// Menos partículas en mobile para no lagear
function getCount() {
  if (typeof window === "undefined") return 400;
  return window.innerWidth < 768 ? 200 : 500;
}

function Particles({
  mouseX,
  mouseY,
  count,
}: {
  mouseX: number;
  mouseY: number;
  count: number;
}) {
  const mesh = useRef<THREE.Points>(null!);

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      [0.388, 0.4, 0.945],
      [0.063, 0.725, 0.506],
      [0.545, 0.361, 0.965],
      [0.024, 0.714, 0.804],
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      const [r, g, b] = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }
    return { positions, velocities, colors };
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    const t = clock.elapsedTime;
    const mx = (mouseX / (window.innerWidth || 1) - 0.5) * 10;
    const my = -(mouseY / (window.innerHeight || 1) - 0.5) * 7;

    for (let i = 0; i < count; i++) {
      const ix = i * 3,
        iy = ix + 1;
      pos[ix] += velocities[ix] + Math.sin(t * 0.2 + pos[iy]) * 0.0006;
      pos[iy] += velocities[iy] + Math.cos(t * 0.15 + pos[ix]) * 0.0006;
      const dx = pos[ix] - mx * 0.2;
      const dy = pos[iy] - my * 0.2;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 2.5) {
        pos[ix] += (dx / d) * 0.01;
        pos[iy] += (dy / d) * 0.01;
      }
      if (pos[ix] > 16) pos[ix] = -16;
      if (pos[ix] < -16) pos[ix] = 16;
      if (pos[iy] > 11) pos[iy] = -11;
      if (pos[iy] < -11) pos[iy] = 11;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.z = t * 0.005;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleCanvas() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [paused, setPaused] = useState(false);
  const [count] = useState(getCount);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Throttle: actualiza mouse state a 30fps máximo
    const h = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setMouse({ ...mouseRef.current });
        rafRef.current = null;
      });
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => {
      window.removeEventListener("mousemove", h);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    // Pausar animación cuando el tab está en segundo plano
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 70 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent", pointerEvents: "none" }}
        frameloop={paused ? "never" : "always"}
      >
        <Particles mouseX={mouse.x} mouseY={mouse.y} count={count} />
      </Canvas>
    </div>
  );
}
