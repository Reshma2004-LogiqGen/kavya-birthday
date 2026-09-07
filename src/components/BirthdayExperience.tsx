"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Atmosphere } from "@/components/Atmosphere";
import { ConfettiCanvas, useConfetti } from "@/components/Confetti";
import { wishes } from "@/data/wishes";

const ease = [0.22, 1, 0.36, 1] as const;

export function BirthdayExperience() {
  const { canvasRef, burst } = useConfetti();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = window.setTimeout(() => burst(80), 800);
    return () => window.clearTimeout(t);
  }, [burst]);

  const celebrate = () => {
    burst(220);
    document.getElementById("wishes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Atmosphere />
      <ConfettiCanvas canvasRef={canvasRef} />

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-14">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ink-mute">
          For <span className="text-ink">Kavya Reddy</span>
        </p>
        <button
          type="button"
          onClick={celebrate}
          className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink-mute transition hover:text-rose"
        >
          Celebrate
        </button>
      </header>

      <main>
        {/* HERO — one composition */}
        <section className="relative flex min-h-[100dvh] items-end overflow-hidden px-6 pb-16 pt-28 sm:px-10 sm:pb-20 lg:px-14">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(26,21,32,0.15) 45%, rgba(26,21,32,0.78) 78%, #1a1520 100%)",
            }}
            aria-hidden
          />

          <div
            className="pointer-events-none absolute right-[-10%] top-[2%] h-[min(720px,98vw)] w-[min(720px,98vw)]"
            aria-hidden
          >
            {[0, 10, 20, 32].map((inset, i) => (
              <motion.span
                key={inset}
                className="absolute rounded-full border border-gold/20"
                style={{ inset: `${inset}%` }}
                animate={{ scale: [1, 1.02, 1], opacity: [0.25, 0.7, 0.25] }}
                transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
            <motion.span
              className="absolute rounded-full"
              style={{
                inset: "36%",
                background:
                  "radial-gradient(circle at 40% 30%, rgba(255,248,243,0.35), transparent 50%), radial-gradient(circle at 60% 70%, rgba(224,138,122,0.45), rgba(212,181,106,0.28) 70%, transparent)",
              }}
              animate={{ x: [0, 16, 0], y: [0, -14, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <motion.p
              className="mb-6 text-[0.7rem] font-medium uppercase tracking-[0.36em] text-gold"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              Happy Birthday
            </motion.p>

            <motion.h1
              className="font-display text-[clamp(3.6rem,12vw,8.5rem)] leading-[0.9] tracking-[-0.035em] text-ink"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.08, ease }}
            >
              Kavya
              <br />
              <span className="italic text-ink-soft">Reddy</span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-lg text-[1.05rem] font-light leading-relaxed text-ink-soft sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease }}
            >
              Teammate. Developer. Keenest observer. One of the finest humans
              we know — today is entirely yours.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              <button
                type="button"
                onClick={celebrate}
                className="bg-gold px-8 py-3.5 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-deep transition hover:-translate-y-0.5 hover:bg-[#e0c47a]"
              >
                Send wishes
              </button>
              <a
                href="#wishes"
                className="border border-line px-8 py-3.5 text-[0.76rem] font-medium uppercase tracking-[0.18em] text-ink transition hover:border-gold/50 hover:text-gold"
              >
                Read on
              </a>
            </motion.div>
          </div>
        </section>

        {/* WISHES — one page flow */}
        <section id="wishes" className="px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
          <div className="mx-auto max-w-4xl">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="mb-3 text-[0.66rem] font-medium uppercase tracking-[0.3em] text-ink-mute">
                A dedication
              </p>
              <h2 className="font-display text-[clamp(2.4rem,6vw,3.8rem)] leading-[1] tracking-[-0.02em] text-ink">
                Wishes for you,
                <span className="italic text-rose"> Kavya</span>
              </h2>
            </motion.div>

            <div>
              {wishes.map((wish, i) => (
                <motion.article
                  key={wish.id}
                  className="border-t border-line py-12 sm:py-14"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.85,
                    delay: Math.min(i * 0.04, 0.16),
                    ease,
                  }}
                >
                  <div className="mb-5 flex items-baseline gap-4">
                    <span className="font-display text-xl text-gold">{wish.index}</span>
                    <span className="text-[0.62rem] font-medium uppercase tracking-[0.26em] text-ink-mute">
                      {wish.label}
                    </span>
                  </div>

                  <h3 className="max-w-3xl font-display text-[clamp(1.55rem,3.6vw,2.35rem)] leading-[1.2] tracking-[-0.015em] text-ink">
                    “{wish.quote}”
                  </h3>

                  <p className="mt-5 max-w-2xl text-[1.02rem] font-light leading-relaxed text-ink-soft">
                    {wish.note}
                  </p>
                </motion.article>
              ))}
              <div className="border-t border-line" />
            </div>
          </div>
        </section>

        {/* FINALE */}
        <section className="px-6 pb-24 pt-4 sm:px-10 lg:px-14">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="mb-9 flex items-center justify-center gap-4" aria-hidden>
              <span className="h-px w-12 bg-gold/45" />
              <span className="h-1.5 w-1.5 rounded-full bg-rose" />
              <span className="h-px w-12 bg-gold/45" />
            </div>

            <p className="font-display text-[clamp(1.7rem,4.5vw,2.6rem)] italic leading-[1.3] text-ink">
              May this year be soft on your spirit,
              <br />
              bright on your path,
              <br />
              and endlessly kind to you.
            </p>

            <p className="mt-10 text-[0.66rem] font-medium uppercase tracking-[0.28em] text-ink-mute">
              With love & respect
            </p>
            <p className="mt-3 font-display text-[2rem] tracking-wide text-ink">
              Dev Team
            </p>
            <p className="mt-2 text-base font-light text-ink-soft">
              Happy Birthday, Kavya Reddy
            </p>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-line px-6 py-5 text-center text-[0.58rem] uppercase tracking-[0.22em] text-ink-mute">
        Happy Birthday · Kavya Reddy
      </footer>
    </>
  );
}
