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
  kind: "rect" | "dot" | "ribbon";
};

const COLORS = ["#e08a7a", "#d4b56a", "#9eb6c8", "#fff8f3", "#f3d9c8", "#7fa090"];

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
      className={`absolute ${className}`}
      style={{
        width: size,
        animation: `balloon ${6 + size / 40}s ease-in-out ${delay} infinite`,
      }}
    >
      <div
        className="relative mx-auto"
        style={{
          width: size,
          height: size * 1.2,
          borderRadius: "50% 50% 50% 50% / 45% 45% 55% 55%",
          background: `radial-gradient(circle at 35% 28%, rgba(255,255,255,0.55), transparent 28%), linear-gradient(160deg, ${color}, ${color}cc)`,
          boxShadow: `inset -12px -18px 30px rgba(0,0,0,0.18), 0 20px 40px ${color}33`,
        }}
      />
      <div
        className="mx-auto"
        style={{
          width: 2,
          height: size * 0.9,
          background: "linear-gradient(180deg, rgba(255,248,243,0.35), transparent)",
        }}
      />
    </div>
  );
}

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

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      bits = Array.from({ length: 55 }, () => spawn(true));
    };

    const spawn = (anywhere = false): Bit => {
      const kindRoll = Math.random();
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : -20 - Math.random() * 80,
        w: 3 + Math.random() * 7,
        h: 5 + Math.random() * 10,
        vx: (Math.random() - 0.5) * 0.45,
        vy: 0.55 + Math.random() * 1.1,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.04,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        kind: kindRoll > 0.7 ? "dot" : kindRoll > 0.4 ? "ribbon" : "rect",
      };
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // soft vignette light spots
      const g1 = ctx.createRadialGradient(w * 0.2, h * 0.15, 0, w * 0.2, h * 0.15, w * 0.45);
      g1.addColorStop(0, "rgba(224,138,122,0.16)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.85, h * 0.2, 0, w * 0.85, h * 0.2, w * 0.4);
      g2.addColorStop(0, "rgba(212,181,106,0.18)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      for (const b of bits) {
        if (!reduced) {
          b.x += b.vx + Math.sin(b.y * 0.01) * 0.2;
          b.y += b.vy;
          b.rot += b.vr;
        }

        if (b.y > h + 30) Object.assign(b, spawn(false));

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = b.color;

        if (b.kind === "dot") {
          ctx.beginPath();
          ctx.arc(0, 0, b.w * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else if (b.kind === "ribbon") {
          ctx.fillRect(-b.w / 2, -b.h / 2, b.w * 0.45, b.h * 1.4);
        } else {
          ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
        }
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

  const lights = Array.from({ length: 28 }, (_, i) => ({
    left: `${(i / 27) * 100}%`,
    delay: `${(i % 7) * 0.25}s`,
    color: i % 3 === 0 ? "#d4b56a" : i % 3 === 1 ? "#e08a7a" : "#f3d9c8",
  }));

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Premium party hall base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 50% -10%, rgba(212,181,106,0.28), transparent 55%),
            radial-gradient(ellipse 70% 50% at 0% 30%, rgba(224,138,122,0.22), transparent 50%),
            radial-gradient(ellipse 70% 50% at 100% 40%, rgba(158,182,200,0.18), transparent 50%),
            radial-gradient(ellipse 80% 55% at 50% 100%, rgba(80,50,70,0.55), transparent 60%),
            linear-gradient(165deg, #2a2030 0%, #1a1520 42%, #141018 100%)
          `,
        }}
      />

      {/* Stage spotlight */}
      <div
        className="absolute left-1/2 top-0 h-[70vh] w-[min(900px,100%)] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,248,243,0.14), rgba(212,181,106,0.06) 40%, transparent 75%)",
          animation: "glow-pulse 7s ease-in-out infinite",
          clipPath: "polygon(32% 0, 68% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* String lights */}
      <div
        className="absolute inset-x-0 top-0 h-24"
        style={{ animation: "string-glow 4s ease-in-out infinite" }}
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path
            d="M0,30 Q150,70 300,30 T600,30 T900,30 T1200,30"
            fill="none"
            stroke="rgba(255,248,243,0.18)"
            strokeWidth="1.2"
          />
        </svg>
        {lights.map((l, i) => (
          <span
            key={i}
            className="absolute top-7 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
            style={{
              left: l.left,
              background: l.color,
              boxShadow: `0 0 10px 3px ${l.color}88`,
              animation: `twinkle ${2 + (i % 4) * 0.4}s ease-in-out ${l.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Premium balloons */}
      <Balloon className="left-[-2%] top-[18%] opacity-80" color="#e08a7a" delay="0s" size={92} />
      <Balloon className="left-[6%] top-[42%] opacity-70" color="#d4b56a" delay="1.2s" size={68} />
      <Balloon className="left-[2%] top-[62%] opacity-55" color="#9eb6c8" delay="0.6s" size={54} />
      <Balloon className="right-[-2%] top-[14%] opacity-80" color="#d4b56a" delay="0.4s" size={100} />
      <Balloon className="right-[5%] top-[38%] opacity-70" color="#e08a7a" delay="1.5s" size={72} />
      <Balloon className="right-[1%] top-[58%] opacity-55" color="#9eb6c8" delay="0.9s" size={58} />

      {/* Soft floor glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-[35%]"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(212,181,106,0.16), transparent 70%)",
        }}
      />

      {/* Falling party confetti */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
