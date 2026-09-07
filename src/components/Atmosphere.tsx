"use client";

import { useEffect, useRef } from "react";

function Balloon({
  className,
  color,
  delay,
  size,
}: {
  className: string;
  color: string;
  delay: string;
  size: number;
}) {
  return (
    <div
      className={`absolute opacity-50 ${className}`}
      style={{
        width: size,
        animation: `float-balloon ${8 + size / 30}s ease-in-out ${delay} infinite`,
      }}
    >
      <div
        style={{
          width: size,
          height: size * 1.22,
          borderRadius: "50% 50% 48% 48%",
          background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35), ${color} 55%)`,
        }}
      />
      <div
        className="mx-auto"
        style={{
          width: 1,
          height: 28,
          background: "linear-gradient(180deg, rgba(250,246,239,0.3), transparent)",
        }}
      />
    </div>
  );
}

export function Atmosphere() {
  const starsRef = useRef<HTMLCanvasElement>(null);
  const bokehRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stars = starsRef.current;
    const bokeh = bokehRef.current;
    if (!stars || !bokeh) return;

    const sCtx = stars.getContext("2d");
    const bCtx = bokeh.getContext("2d");
    if (!sCtx || !bCtx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    const starPts = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 1.4,
      a: 0.2 + Math.random() * 0.7,
      s: 0.4 + Math.random() * 1.2,
    }));

    const orbs = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 20 + Math.random() * 60,
      a: 0.04 + Math.random() * 0.08,
      vx: (Math.random() - 0.5) * 0.00015,
      vy: (Math.random() - 0.5) * 0.00012,
      color:
        Math.random() > 0.5
          ? "232,196,122"
          : Math.random() > 0.5
            ? "232,164,184"
            : "120,150,220",
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      for (const c of [stars, bokeh]) {
        c.width = w * dpr;
        c.height = h * dpr;
        c.style.width = `${w}px`;
        c.style.height = `${h}px`;
      }
      sCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = () => {
      t += 0.016;
      sCtx.clearRect(0, 0, w, h);
      bCtx.clearRect(0, 0, w, h);

      for (const p of starPts) {
        const twinkle = 0.45 + Math.sin(t * p.s + p.x * 10) * 0.45;
        sCtx.beginPath();
        sCtx.fillStyle = `rgba(250,246,239,${p.a * twinkle})`;
        sCtx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        sCtx.fill();
      }

      for (const o of orbs) {
        if (!reduced) {
          o.x += o.vx;
          o.y += o.vy;
          if (o.x < -0.1) o.x = 1.1;
          if (o.x > 1.1) o.x = -0.1;
          if (o.y < -0.1) o.y = 1.1;
          if (o.y > 1.1) o.y = -0.1;
        }
        const g = bCtx.createRadialGradient(
          o.x * w,
          o.y * h,
          0,
          o.x * w,
          o.y * h,
          o.r,
        );
        g.addColorStop(0, `rgba(${o.color},${o.a})`);
        g.addColorStop(1, "transparent");
        bCtx.fillStyle = g;
        bCtx.beginPath();
        bCtx.arc(o.x * w, o.y * h, o.r, 0, Math.PI * 2);
        bCtx.fill();
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
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 55% at 50% -5%, rgba(232,196,122,0.14), transparent 58%),
            radial-gradient(ellipse 55% 45% at 85% 75%, rgba(232,164,184,0.12), transparent 52%),
            radial-gradient(ellipse 45% 35% at 10% 60%, rgba(120,150,220,0.1), transparent 50%),
            linear-gradient(168deg, #04060f 0%, #0a1020 42%, #120e1a 100%)
          `,
        }}
      />
      <canvas ref={starsRef} className="absolute inset-0" />
      <canvas ref={bokehRef} className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 30% at 20% 20%, rgba(120,180,255,0.06), transparent 60%),
            radial-gradient(ellipse 40% 25% at 75% 30%, rgba(232,196,122,0.07), transparent 55%),
            radial-gradient(ellipse 35% 20% at 50% 70%, rgba(232,164,184,0.06), transparent 50%)
          `,
          animation: "aurora-shift 18s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute left-[6%] top-[10%] h-[320px] w-[320px] rounded-full opacity-50 blur-[70px]"
        style={{ background: "rgba(232,196,122,0.2)", animation: "drift 16s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[15%] right-[4%] h-[360px] w-[360px] rounded-full opacity-50 blur-[70px]"
        style={{
          background: "rgba(232,164,184,0.16)",
          animation: "drift 16s ease-in-out -5s infinite",
        }}
      />
      <Balloon className="left-[8%] top-[18%]" color="#e8c47a" delay="0s" size={52} />
      <Balloon className="right-[10%] top-[12%]" color="#e8a4b8" delay="-2.5s" size={44} />
      <Balloon className="bottom-[22%] left-[4%]" color="#9bb7e8" delay="-4.5s" size={38} />
      <Balloon className="bottom-[28%] right-[6%]" color="#f3d9a4" delay="-1.5s" size={46} />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
