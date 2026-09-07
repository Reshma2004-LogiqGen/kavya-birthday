"use client";

import { useEffect, useRef } from "react";

export function Atmosphere() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    const dots = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + Math.random() * 2.2,
      s: 0.15 + Math.random() * 0.35,
      a: 0.15 + Math.random() * 0.35,
      hue: Math.random() > 0.5 ? "61,122,120" : "201,137,74",
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        if (!reduced) d.y -= d.s * 0.0015;
        if (d.y < -0.05) d.y = 1.05;
        const pulse = 0.55 + Math.sin(t * 2 + d.x * 8) * 0.45;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${d.hue},${d.a * pulse})`;
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
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

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 0% 0%, rgba(61,122,120,0.22), transparent 55%),
            radial-gradient(ellipse 70% 50% at 100% 10%, rgba(201,137,74,0.18), transparent 50%),
            radial-gradient(ellipse 60% 45% at 50% 100%, rgba(61,122,120,0.12), transparent 55%),
            linear-gradient(165deg, #f8fbfc 0%, #eef3f6 48%, #e4ebf0 100%)
          `,
        }}
      />
      <div
        className="absolute -left-[10%] top-[5%] h-[480px] w-[480px] rounded-full blur-[100px]"
        style={{
          background: "rgba(61,122,120,0.28)",
          animation: "mesh-a 18s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute -right-[8%] top-[0%] h-[520px] w-[520px] rounded-full blur-[110px]"
        style={{
          background: "rgba(201,137,74,0.2)",
          animation: "mesh-b 22s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute bottom-[-12%] left-[25%] h-[420px] w-[420px] rounded-full blur-[100px]"
        style={{
          background: "rgba(120,160,170,0.2)",
          animation: "mesh-a 20s ease-in-out infinite alternate-reverse",
        }}
      />
      <canvas ref={ref} className="absolute inset-0" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
