"use client";

import { useCallback, useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  g: number;
  w: number;
  h: number;
  color: string;
  life: number;
  rot: number;
  vr: number;
};

const COLORS = ["#3d7a78", "#c9894a", "#10151c", "#f8fbfc", "#7aa3a1", "#d4a574"];

export function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const partsRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);

  const size = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    partsRef.current = partsRef.current.filter((p) => p.life > 0);
    for (const p of partsRef.current) {
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.986;
      p.rot += p.vr;
      p.life -= 1;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.life / 90);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (partsRef.current.length) rafRef.current = requestAnimationFrame(tick);
    else {
      rafRef.current = null;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }, []);

  const burst = useCallback(
    (count = 130) => {
      const ox = window.innerWidth / 2;
      const oy = window.innerHeight * 0.35;
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 2.8 + Math.random() * 11;
        partsRef.current.push({
          x: ox,
          y: oy,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 3.2,
          g: 0.12 + Math.random() * 0.1,
          w: 3 + Math.random() * 7,
          h: 2 + Math.random() * 4,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          life: 85 + ((Math.random() * 50) | 0),
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.24,
        });
      }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    },
    [tick],
  );

  useEffect(() => {
    size();
    window.addEventListener("resize", size);
    return () => {
      window.removeEventListener("resize", size);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [size]);

  return { canvasRef, burst };
}

export function ConfettiCanvas({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden
    />
  );
}
