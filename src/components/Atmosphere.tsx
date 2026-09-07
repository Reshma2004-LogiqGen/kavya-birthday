"use client";

import { useEffect, useRef } from "react";

const BALLOONS = [
  { left: "4%", top: "16%", size: 58, color: "#ff8fab", delay: "0s" },
  { left: "10%", top: "48%", size: 44, color: "#ffd37a", delay: "-2s" },
  { left: "2%", top: "72%", size: 36, color: "#7ec8ff", delay: "-4s" },
  { left: "88%", top: "12%", size: 62, color: "#ffd37a", delay: "-1s" },
  { left: "92%", top: "42%", size: 48, color: "#ff6b6b", delay: "-3s" },
  { left: "86%", top: "68%", size: 40, color: "#ff8fab", delay: "-5s" },
];

const CONFETTI = Array.from({ length: 24 }, (_, i) => ({
  left: `${4 + ((i * 17) % 92)}%`,
  delay: `${(i % 9) * 0.55}s`,
  dur: `${7 + (i % 6)}s`,
  color: ["#ff8fab", "#ffd37a", "#7ec8ff", "#ff6b6b", "#fff7f2", "#ffb4a2"][i % 6],
  w: 4 + (i % 5),
  h: 8 + (i % 7),
}));

const LIGHTS = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i / 21) * 100}%`,
  delay: `${(i % 5) * 0.3}s`,
  color: i % 3 === 0 ? "#ffd37a" : i % 3 === 1 ? "#ff8fab" : "#7ec8ff",
}));

function Balloon({
  left,
  top,
  size,
  color,
  delay,
}: {
  left: string;
  top: string;
  size: number;
  color: string;
  delay: string;
}) {
  return (
    <div
      className="absolute opacity-70"
      style={{
        left,
        top,
        width: size,
        animation: `float-balloon ${7 + size / 20}s ease-in-out ${delay} infinite`,
      }}
    >
      <div
        style={{
          width: size,
          height: size * 1.22,
          borderRadius: "50% 50% 48% 48%",
          background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.55), ${color} 52%, ${color}cc)`,
          boxShadow: `0 16px 30px ${color}44`,
        }}
      />
      <div
        className="mx-auto"
        style={{
          width: 1.5,
          height: size * 0.7,
          background: "linear-gradient(180deg, rgba(255,247,242,0.45), transparent)",
        }}
      />
    </div>
  );
}

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

    const sparks = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      a: 0.2 + Math.random() * 0.55,
      s: 0.6 + Math.random() * 1.6,
      c: ["255,211,122", "255,143,171", "126,200,255", "255,107,107"][
        (Math.random() * 4) | 0
      ],
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
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      const g = ctx.createRadialGradient(w * 0.5, h * 0.15, 0, w * 0.5, h * 0.15, w * 0.55);
      g.addColorStop(0, "rgba(255,211,122,0.14)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (const s of sparks) {
        const tw = 0.4 + Math.sin(t * s.s + s.x * 12) * 0.6;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.c},${s.a * tw})`;
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduced) {
          s.y -= 0.00035 * s.s;
          if (s.y < -0.02) s.y = 1.02;
        }
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
      {/* Party base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 55% at 50% -8%, rgba(255,211,122,0.28), transparent 55%),
            radial-gradient(ellipse 60% 45% at 0% 40%, rgba(255,143,171,0.28), transparent 50%),
            radial-gradient(ellipse 55% 40% at 100% 35%, rgba(126,200,255,0.2), transparent 50%),
            radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,107,107,0.16), transparent 55%),
            linear-gradient(168deg, #2a1524 0%, #1a0f18 45%, #120a14 100%)
          `,
        }}
      />

      {/* Spotlight */}
      <div
        className="absolute left-1/2 top-0 h-[65vh] w-[min(820px,100%)] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,247,242,0.12), rgba(255,211,122,0.06) 40%, transparent 75%)",
          clipPath: "polygon(28% 0, 72% 0, 100% 100%, 0 100%)",
          animation: "glow-pulse 6s ease-in-out infinite",
        }}
      />

      <div
        className="absolute -left-[8%] top-[8%] h-[420px] w-[420px] rounded-full blur-[90px]"
        style={{ background: "rgba(255,143,171,0.35)", animation: "mesh-a 14s ease-in-out infinite alternate" }}
      />
      <div
        className="absolute -right-[6%] top-[4%] h-[460px] w-[460px] rounded-full blur-[100px]"
        style={{ background: "rgba(255,211,122,0.28)", animation: "mesh-b 18s ease-in-out infinite alternate" }}
      />
      <div
        className="absolute bottom-[-8%] left-[30%] h-[380px] w-[380px] rounded-full blur-[90px]"
        style={{
          background: "rgba(126,200,255,0.2)",
          animation: "mesh-a 16s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* String lights */}
      <div className="absolute inset-x-0 top-0 h-20">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path
            d="M0,24 Q150,58 300,24 T600,24 T900,24 T1200,24"
            fill="none"
            stroke="rgba(255,247,242,0.2)"
            strokeWidth="1.2"
          />
        </svg>
        {LIGHTS.map((l, i) => (
          <span
            key={i}
            className="absolute top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
            style={{
              left: l.left,
              background: l.color,
              boxShadow: `0 0 12px 3px ${l.color}99`,
              animation: `twinkle ${2 + (i % 4) * 0.35}s ease-in-out ${l.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Balloons */}
      {BALLOONS.map((b, i) => (
        <Balloon key={i} {...b} />
      ))}

      {/* Falling party confetti */}
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          className="absolute top-[-20px] rounded-[1px]"
          style={{
            left: c.left,
            width: c.w,
            height: c.h,
            background: c.color,
            animation: `fall ${c.dur} linear ${c.delay} infinite`,
          }}
        />
      ))}

      <canvas ref={ref} className="absolute inset-0" />

      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
