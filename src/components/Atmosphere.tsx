"use client";

import { useEffect, useRef } from "react";

type Bit = {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  color: string;
};

const COLORS = ["#c97b6f", "#b8955a", "#8fa3b5", "#14131a", "#fffcf8", "#d4b896"];

export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let bits: Bit[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;

    const spawn = (anywhere = false): Bit => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : -20,
      w: 3 + Math.random() * 6,
      h: 4 + Math.random() * 8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: 0.4 + Math.random() * 0.9,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.03,
      color: COLORS[(Math.random() * COLORS.length) | 0],
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bits = Array.from({ length: 36 }, () => spawn(true));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const b of bits) {
        if (!reduced) {
          b.x += b.vx + Math.sin(b.y * 0.012) * 0.15;
          b.y += b.vy;
          b.rot += b.vr;
        }
        if (b.y > h + 24) Object.assign(b, spawn(false));
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = b.color;
        ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const sparks = Array.from({ length: 16 }, (_, i) => ({
    top: `${8 + ((i * 17) % 80)}%`,
    left: `${6 + ((i * 23) % 88)}%`,
    delay: `${(i % 6) * 0.35}s`,
    size: 2 + (i % 3),
  }));

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 65% at 10% -5%, rgba(201,123,111,0.28), transparent 55%),
            radial-gradient(ellipse 80% 55% at 95% 5%, rgba(184,149,90,0.26), transparent 50%),
            radial-gradient(ellipse 70% 50% at 50% 100%, rgba(143,163,181,0.18), transparent 55%),
            linear-gradient(165deg, #fffcf8 0%, #f7f4f0 45%, #efe8e1 100%)
          `,
        }}
      />

      <div
        className="absolute -left-[8%] top-[8%] h-[420px] w-[420px] rounded-full blur-[90px]"
        style={{
          background: "rgba(201,123,111,0.28)",
          animation: "float-orb 16s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute -right-[6%] top-[0%] h-[480px] w-[480px] rounded-full blur-[100px]"
        style={{
          background: "rgba(184,149,90,0.22)",
          animation: "float-orb 20s ease-in-out infinite alternate-reverse",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[30%] h-[380px] w-[380px] rounded-full blur-[90px]"
        style={{
          background: "rgba(143,163,181,0.2)",
          animation: "float-orb 18s ease-in-out infinite alternate",
        }}
      />

      {sparks.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: i % 2 === 0 ? "#c97b6f" : "#b8955a",
            boxShadow: `0 0 ${s.size * 4}px ${s.size}px rgba(201,123,111,0.35)`,
            animation: `twinkle ${2.4 + (i % 4) * 0.4}s ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}

      <canvas ref={canvasRef} className="absolute inset-0 opacity-80" />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
