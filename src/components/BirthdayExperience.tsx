"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Atmosphere } from "@/components/Atmosphere";
import { ConfettiCanvas, useConfetti } from "@/components/Confetti";
import { wishes } from "@/data/wishes";

const ease = [0.22, 1, 0.36, 1] as const;
const STEPS = ["intro", "reveal", "wishes", "finale"] as const;
type Step = (typeof STEPS)[number];

function Cake() {
  return (
    <div className="relative mx-auto mt-8 h-36 w-40" aria-hidden>
      <div className="absolute bottom-2 left-1/2 h-3 w-36 -translate-x-1/2 rounded-full bg-gold/20 blur-[2px]" />
      <div className="absolute bottom-4 left-1/2 h-10 w-32 -translate-x-1/2 rounded-md bg-gradient-to-b from-[#f3d9a4] to-[#c9a060]" />
      <div className="absolute bottom-12 left-1/2 h-9 w-24 -translate-x-1/2 rounded-md bg-gradient-to-b from-[#e8a4b8] to-[#b87088]" />
      <div className="absolute bottom-[4.75rem] left-1/2 h-8 w-16 -translate-x-1/2 rounded-md bg-gradient-to-b from-[#faf6ef] to-[#e8c47a]" />
      <div className="absolute bottom-[7.1rem] left-1/2 h-7 w-1.5 -translate-x-1/2 rounded-sm bg-[#f5d98a]" />
      <div
        className="absolute bottom-[8.6rem] left-1/2 h-4 w-3 -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle at 40% 30%, #fff6c8, #ff9a3c 55%, #ff5a1f)",
          animation: "flicker 1.2s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export function BirthdayExperience() {
  const [step, setStep] = useState<Step>("intro");
  const { canvasRef, burst } = useConfetti();
  const stepIndex = STEPS.indexOf(step);

  useEffect(() => {
    if (step === "reveal" || step === "finale") {
      const t = window.setTimeout(() => burst(step === "finale" ? 180 : 100), 350);
      return () => window.clearTimeout(t);
    }
  }, [step, burst]);

  const go = (next: Step) => setStep(next);

  return (
    <>
      <Atmosphere />
      <ConfettiCanvas canvasRef={canvasRef} />

      {/* Progress */}
      <nav
        className="fixed left-1/2 top-5 z-20 flex -translate-x-1/2 items-center gap-0 sm:top-7"
        aria-label="Celebration progress"
      >
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <button
              type="button"
              aria-label={`Step ${i + 1}`}
              onClick={() => {
                if (i <= stepIndex) go(s);
              }}
              className={`h-2.5 w-2.5 rounded-full border transition ${
                i === stepIndex
                  ? "scale-125 border-gold bg-gold"
                  : i < stepIndex
                    ? "border-gold/70 bg-gold/50"
                    : "border-gold/30 bg-transparent"
              }`}
            />
            {i < STEPS.length - 1 && (
              <span
                className={`mx-1.5 h-px w-6 sm:w-9 ${
                  i < stepIndex ? "bg-gold/60" : "bg-gold/20"
                }`}
              />
            )}
          </div>
        ))}
      </nav>

      <main className="relative z-10 flex min-h-[100dvh] items-center justify-center px-5 py-20 sm:px-8">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.section
              key="intro"
              className="mx-auto w-full max-w-xl text-center"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease }}
            >
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ink-mute">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Logiqgen · Dev Team
              </div>

              <p className="mb-6 text-2xl text-gold" aria-hidden>
                ✦
              </p>

              <h1 className="font-display shimmer-text text-[clamp(2.7rem,8vw,4.6rem)] font-medium leading-[1.08] tracking-[-0.02em]">
                A wish is waiting
                <br />
                <span className="italic text-rose">for you</span>
              </h1>

              <p className="mx-auto mt-6 max-w-md text-base font-light leading-relaxed text-ink-soft sm:text-lg">
                Your Logiqgen dev team put this together — because today is all
                about you, Kavya Reddy.
              </p>

              <button
                type="button"
                onClick={() => {
                  burst(80);
                  go("reveal");
                }}
                className="relative mt-10 overflow-hidden rounded-full bg-gradient-to-r from-gold to-gold-bright px-9 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-deep shadow-[0_10px_40px_rgba(232,196,122,0.25)] transition hover:-translate-y-0.5"
              >
                <span className="relative z-10">Open your wish</span>
                <span className="btn-shine" aria-hidden />
              </button>
            </motion.section>
          )}

          {step === "reveal" && (
            <motion.section
              key="reveal"
              className="mx-auto w-full max-w-2xl text-center"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease }}
            >
              <p className="mb-5 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-rose">
                Happy Birthday
              </p>

              <div className="relative mx-auto inline-block">
                <div
                  className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sm:h-64 sm:w-64"
                  style={{
                    background: "rgba(232,196,122,0.2)",
                    animation: "soft-pulse 4s ease-in-out infinite",
                  }}
                  aria-hidden
                />
                <h1 className="relative font-display text-[clamp(3.6rem,13vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-ink">
                  Kavya
                  <br />
                  <span className="italic text-gold">Reddy</span>
                </h1>
              </div>

              <p className="mt-5 text-base font-light text-ink-soft sm:text-lg">
                teammate · developer · keenest observer · best human
              </p>

              <Cake />

              <button
                type="button"
                onClick={() => go("wishes")}
                className="relative mt-10 overflow-hidden rounded-full border border-line px-8 py-3.5 text-[0.76rem] font-medium uppercase tracking-[0.16em] text-ink transition hover:border-gold/50 hover:text-gold"
              >
                <span className="relative z-10">See your wishes</span>
                <span className="btn-shine" aria-hidden />
              </button>
            </motion.section>
          )}

          {step === "wishes" && (
            <motion.section
              key="wishes"
              className="mx-auto w-full max-w-2xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease }}
            >
              <div className="mb-10 text-center">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ink-mute">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Logiqgen · Dev Team
                </div>
                <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.1] text-ink">
                  Wishes from your dev team
                </h2>
                <p className="mt-3 text-sm font-light text-ink-soft">
                  From the people you work with every day.
                </p>
              </div>

              <div className="space-y-4">
                {wishes.map((wish, i) => (
                  <motion.article
                    key={wish.id}
                    className={`flex gap-4 rounded-2xl border px-5 py-5 sm:gap-5 sm:px-6 sm:py-6 ${
                      wish.featured
                        ? "border-gold/35 bg-gold/10"
                        : "border-line bg-card"
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.55, ease }}
                  >
                    <span className="font-display text-xl text-gold sm:text-2xl">
                      {wish.index}
                    </span>
                    <div>
                      <p className="mb-1.5 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-ink-mute">
                        {wish.label}
                      </p>
                      <p className="font-display text-[1.05rem] leading-relaxed text-ink sm:text-[1.15rem]">
                        {wish.body}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    burst(160);
                    go("finale");
                  }}
                  className="relative overflow-hidden rounded-full bg-gradient-to-r from-gold to-gold-bright px-9 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-deep shadow-[0_10px_40px_rgba(232,196,122,0.25)] transition hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Celebrate</span>
                  <span className="btn-shine" aria-hidden />
                </button>
              </div>
            </motion.section>
          )}

          {step === "finale" && (
            <motion.section
              key="finale"
              className="relative mx-auto w-full max-w-xl text-center"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease }}
            >
              <div
                className="pointer-events-none absolute left-1/2 top-8 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl"
                style={{ background: "rgba(232,196,122,0.18)" }}
                aria-hidden
              />

              <div className="relative mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-card font-display text-lg tracking-wide text-gold">
                LG
              </div>

              <p className="mb-4 text-gold" aria-hidden>
                ✦ ✧ ✦
              </p>

              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-ink-mute">
                With warm wishes
              </p>

              <h2 className="mt-4 font-display text-[clamp(2.4rem,7vw,3.8rem)] font-medium leading-[1.08] text-ink">
                Happy Birthday,
                <br />
                <span className="italic text-gold">Kavya Reddy</span>
              </h2>

              <p className="mt-3 text-sm font-light text-rose">
                A day to celebrate your light
              </p>

              <p className="mx-auto mt-7 max-w-md text-base font-light leading-relaxed text-ink-soft">
                Wishing you joy, success, good health, and a year filled with
                moments you will always remember.
              </p>
              <p className="mt-3 text-base font-light text-ink-soft">
                Keep shining and keep smiling.
              </p>

              <div className="mx-auto my-8 h-px w-20 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

              <p className="font-display text-xl text-ink">— Logiqgen team</p>

              <button
                type="button"
                onClick={() => go("intro")}
                className="mt-10 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ink-mute transition hover:text-gold"
              >
                Replay the wish
              </button>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
