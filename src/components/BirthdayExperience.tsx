"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Atmosphere } from "@/components/Atmosphere";
import { ConfettiCanvas, useConfetti } from "@/components/Confetti";
import { traits, wishes } from "@/data/wishes";

const ease = [0.22, 1, 0.36, 1] as const;

export function BirthdayExperience() {
  const [started, setStarted] = useState(false);
  const [activeTrait, setActiveTrait] = useState(0);
  const { canvasRef, burst } = useConfetti();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = window.setTimeout(() => burst(90), 500);
    return () => window.clearTimeout(t);
  }, [started, burst]);

  useEffect(() => {
    if (!started) return;
    const id = window.setInterval(() => {
      setActiveTrait((i) => (i + 1) % traits.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [started]);

  const begin = () => {
    setStarted(true);
    burst(140);
  };

  if (!started) {
    return (
      <>
        <Atmosphere />
        <ConfettiCanvas canvasRef={canvasRef} />
        <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
          <motion.div
            className="mb-10 grid h-20 w-20 place-items-center rounded-full border border-line"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="font-display text-2xl tracking-wide text-teal">KR</span>
          </motion.div>

          <motion.p
            className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-ink-mute"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            Logiqgen · A private dedication
          </motion.p>

          <motion.h1
            className="max-w-2xl font-display text-[clamp(2.6rem,7vw,4.4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease }}
          >
            Today we celebrate
            <br />
            <span className="italic text-teal">quiet brilliance</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-md text-base font-normal leading-relaxed text-ink-soft"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.75 }}
          >
            A birthday dedication for Kavya Reddy — crafted by the people who
            build with her every day.
          </motion.p>

          <motion.button
            type="button"
            onClick={begin}
            className="mt-10 bg-deep px-10 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-snow transition hover:-translate-y-0.5 hover:bg-teal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.7 }}
          >
            Begin
          </motion.button>
        </section>
      </>
    );
  }

  return (
    <>
      <Atmosphere />
      <ConfettiCanvas canvasRef={canvasRef} />

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-ink-mute">
          For <span className="text-ink">Kavya Reddy</span>
        </p>
        <button
          type="button"
          onClick={() => burst(180)}
          className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink-mute transition hover:text-teal"
        >
          Celebrate
        </button>
      </header>

      <main>
        {/* Cinematic hero */}
        <section
          ref={heroRef}
          className="relative flex min-h-[100dvh] items-end overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:px-14"
        >
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full">
            <div className="mx-auto max-w-6xl">
              <p className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.34em] text-amber">
                Happy Birthday
              </p>
              <h1 className="font-display text-[clamp(4rem,14vw,9.5rem)] font-medium leading-[0.88] tracking-[-0.04em] text-ink">
                Kavya
                <br />
                <span className="italic text-teal">Reddy</span>
              </h1>

              <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-md text-lg font-normal leading-relaxed text-ink-soft">
                  Teammate. Developer. Keenest observer. One of the finest
                  humans at Logiqgen — this day is entirely yours.
                </p>
                <a
                  href="#chapters"
                  className="inline-flex border border-line px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-ink transition hover:border-teal hover:text-teal"
                >
                  Read dedication
                </a>
              </div>
            </div>
          </motion.div>

          {/* Orbit ring visual */}
          <div
            className="pointer-events-none absolute right-[-5%] top-[8%] hidden h-[min(520px,70vw)] w-[min(520px,70vw)] lg:block"
            aria-hidden
          >
            <div
              className="absolute inset-0 rounded-full border border-line"
              style={{ animation: "orbit 48s linear infinite" }}
            />
            <div className="absolute inset-[12%] rounded-full border border-teal/20" />
            <div className="absolute inset-[28%] rounded-full border border-amber/25" />
            <div
              className="absolute inset-[38%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.7), transparent 45%), radial-gradient(circle at 60% 65%, rgba(61,122,120,0.35), rgba(201,137,74,0.2) 70%, transparent)",
              }}
            />
          </div>
        </section>

        {/* Living traits */}
        <section className="border-y border-line bg-snow/50 px-6 py-16 sm:px-10 lg:px-14">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-[0.66rem] font-medium uppercase tracking-[0.28em] text-ink-mute">
                Who she is
              </p>
              <h2 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
                Four truths
                <br />
                about Kavya
              </h2>
            </div>

            <div className="space-y-3">
              {traits.map((trait, i) => (
                <button
                  key={trait.id}
                  type="button"
                  onClick={() => setActiveTrait(i)}
                  className={`w-full border-l-2 px-5 py-4 text-left transition ${
                    activeTrait === i
                      ? "border-teal bg-teal/5"
                      : "border-transparent hover:border-mist hover:bg-snow"
                  }`}
                >
                  <p
                    className={`text-[0.62rem] font-semibold uppercase tracking-[0.22em] ${
                      activeTrait === i ? "text-teal" : "text-ink-mute"
                    }`}
                  >
                    {trait.label}
                  </p>
                  <p className="mt-1 font-display text-xl text-ink sm:text-2xl">
                    {trait.line}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dedication chapters */}
        <section id="chapters" className="px-6 py-24 sm:px-10 sm:py-32 lg:px-14">
          <div className="mx-auto max-w-4xl">
            <motion.div
              className="mb-16 max-w-xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="mb-3 text-[0.66rem] font-medium uppercase tracking-[0.28em] text-amber">
                Dedication
              </p>
              <h2 className="font-display text-[clamp(2.4rem,6vw,3.8rem)] font-medium leading-[1] tracking-[-0.025em] text-ink">
                Five chapters
                <span className="italic text-teal"> for you</span>
              </h2>
            </motion.div>

            <div className="space-y-0">
              {wishes.map((wish, i) => (
                <motion.article
                  key={wish.id}
                  className="grid gap-4 border-t border-line py-12 sm:grid-cols-[140px_1fr] sm:gap-10 sm:py-14"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.85, delay: Math.min(i * 0.04, 0.16), ease }}
                >
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-mute">
                    {wish.chapter}
                  </p>
                  <div>
                    <h3 className="font-display text-[clamp(1.6rem,3.5vw,2.3rem)] font-medium leading-[1.15] tracking-[-0.02em] text-ink">
                      {wish.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
                      {wish.body}
                    </p>
                  </div>
                </motion.article>
              ))}
              <div className="border-t border-line" />
            </div>
          </div>
        </section>

        {/* Finale */}
        <section className="relative overflow-hidden px-6 pb-28 pt-8 sm:px-10 lg:px-14">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-full"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(61,122,120,0.12), transparent 70%)",
            }}
            aria-hidden
          />

          <motion.div
            className="relative mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-teal to-transparent" />

            <p className="text-[0.66rem] font-medium uppercase tracking-[0.28em] text-ink-mute">
              With respect & warmth
            </p>

            <h2 className="mt-5 font-display text-[clamp(2.5rem,6.5vw,4rem)] font-medium leading-[1.08] tracking-[-0.025em] text-ink">
              Happy Birthday,
              <br />
              <span className="italic text-teal">Kavya Reddy</span>
            </h2>

            <p className="mx-auto mt-7 max-w-md text-base leading-relaxed text-ink-soft">
              May this year be soft on your spirit, bright on your path, and
              generous with joy you will always remember.
            </p>

            <button
              type="button"
              onClick={() => burst(220)}
              className="mt-10 bg-teal px-9 py-3.5 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-snow transition hover:-translate-y-0.5 hover:bg-[#326663]"
            >
              Send celebration
            </button>

            <p className="mt-12 font-display text-xl text-ink">— Logiqgen Dev Team</p>

            <button
              type="button"
              onClick={() => {
                setStarted(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mt-8 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-ink-mute transition hover:text-teal"
            >
              Start again
            </button>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-line px-6 py-5 text-center text-[0.58rem] uppercase tracking-[0.2em] text-ink-mute">
        Happy Birthday · Kavya Reddy · Logiqgen
      </footer>
    </>
  );
}
