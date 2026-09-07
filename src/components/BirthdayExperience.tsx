"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Atmosphere } from "@/components/Atmosphere";
import { ConfettiCanvas, useConfetti } from "@/components/Confetti";
import { wishes } from "@/data/wishes";

const ease = [0.22, 1, 0.36, 1] as const;

export function BirthdayExperience() {
  const [opened, setOpened] = useState(false);
  const { canvasRef, burst } = useConfetti();

  useEffect(() => {
    if (!opened) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = window.setTimeout(() => burst(90), 400);
    return () => window.clearTimeout(t);
  }, [opened, burst]);

  const openWish = () => {
    setOpened(true);
    burst(140);
  };

  const celebrate = () => {
    burst(200);
    document.getElementById("wishes")?.scrollIntoView({ behavior: "smooth" });
  };

  const replay = () => {
    setOpened(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Atmosphere />
      <ConfettiCanvas canvasRef={canvasRef} />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.section
            key="gate"
            className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="mb-8 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-ink-mute">
              Logiqgen · Dev Team
            </p>

            <motion.span
              className="mb-8 text-gold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              aria-hidden
            >
              ✦
            </motion.span>

            <h1 className="max-w-xl font-display text-[clamp(2.8rem,8vw,4.8rem)] leading-[1.05] tracking-[-0.03em] text-ink">
              A wish is waiting
              <br />
              <span className="italic text-rose">for you</span>
            </h1>

            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-ink-soft sm:text-lg">
              Your Logiqgen dev team put this together — because today is all
              about you, Kavya Reddy.
            </p>

            <button
              type="button"
              onClick={openWish}
              className="mt-10 bg-deep px-9 py-4 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-snow transition hover:-translate-y-0.5 hover:bg-[#2a2733]"
            >
              Open your wish
            </button>
          </motion.section>
        ) : (
          <motion.div
            key="wish"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-14">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ink-mute">
                Logiqgen · Dev Team
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
              <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-16 pt-28 text-center sm:px-10">
                <motion.p
                  className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.34em] text-rose"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease }}
                >
                  Happy Birthday
                </motion.p>

                <motion.h1
                  className="font-display text-[clamp(3.8rem,14vw,9rem)] leading-[0.9] tracking-[-0.035em] text-ink"
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.95, delay: 0.08, ease }}
                >
                  Kavya
                  <br />
                  <span className="italic text-ink-soft">Reddy</span>
                </motion.h1>

                <motion.p
                  className="mt-5 text-base font-light text-ink-soft sm:text-lg"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25, ease }}
                >
                  teammate · developer · keenest observer · best human
                </motion.p>

                <motion.a
                  href="#wishes"
                  className="mt-10 border border-line px-8 py-3.5 text-[0.76rem] font-medium uppercase tracking-[0.16em] text-ink transition hover:border-rose/45 hover:text-rose"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.38, ease }}
                >
                  See your wishes
                </motion.a>
              </section>

              <section id="wishes" className="px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
                <div className="mx-auto max-w-3xl">
                  <motion.div
                    className="mb-14 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease }}
                  >
                    <p className="mb-3 text-[0.66rem] font-medium uppercase tracking-[0.28em] text-ink-mute">
                      Logiqgen · Dev Team
                    </p>
                    <h2 className="font-display text-[clamp(2.2rem,5.5vw,3.4rem)] leading-[1.05] tracking-[-0.02em] text-ink">
                      Wishes from your
                      <span className="italic text-rose"> dev team</span>
                    </h2>
                    <p className="mt-4 text-base font-light text-ink-soft">
                      From the people you work with every day.
                    </p>
                  </motion.div>

                  <div>
                    {wishes.map((wish, i) => (
                      <motion.article
                        key={wish.id}
                        className="border-t border-line py-11 sm:py-12"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{
                          duration: 0.8,
                          delay: Math.min(i * 0.05, 0.2),
                          ease,
                        }}
                      >
                        <div className="mb-4 flex items-baseline gap-4">
                          <span className="font-display text-xl text-gold">
                            {wish.index}
                          </span>
                          <span className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-ink-mute">
                            {wish.label}
                          </span>
                        </div>
                        <p className="max-w-2xl font-display text-[clamp(1.35rem,3.2vw,1.85rem)] leading-[1.35] tracking-[-0.01em] text-ink">
                          {wish.body}
                        </p>
                      </motion.article>
                    ))}
                    <div className="border-t border-line" />
                  </div>

                  <div className="mt-12 flex justify-center">
                    <button
                      type="button"
                      onClick={() => burst(220)}
                      className="bg-deep px-9 py-4 text-[0.76rem] font-medium uppercase tracking-[0.18em] text-snow transition hover:-translate-y-0.5 hover:bg-[#2a2733]"
                    >
                      Celebrate
                    </button>
                  </div>
                </div>
              </section>

              <section className="px-6 pb-24 pt-8 sm:px-10 lg:px-14">
                <motion.div
                  className="mx-auto max-w-2xl text-center"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, ease }}
                >
                  <div
                    className="mb-8 flex items-center justify-center gap-3 text-gold"
                    aria-hidden
                  >
                    <span>✦</span>
                    <span className="text-rose/70">✧</span>
                    <span>✦</span>
                  </div>

                  <p className="text-[0.66rem] font-medium uppercase tracking-[0.28em] text-ink-mute">
                    With warm wishes
                  </p>

                  <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,3.8rem)] leading-[1.05] tracking-[-0.02em] text-ink">
                    Happy Birthday,
                    <br />
                    <span className="italic text-rose">Kavya Reddy</span>
                  </h2>

                  <p className="mt-3 text-sm font-light text-ink-mute">
                    A day to celebrate your light
                  </p>

                  <p className="mx-auto mt-8 max-w-md text-base font-light leading-relaxed text-ink-soft">
                    Wishing you joy, success, good health, and a year filled
                    with moments you will always remember.
                    <br />
                    Keep shining and keep smiling.
                  </p>

                  <p className="mt-10 font-display text-xl text-ink">
                    — Logiqgen team
                  </p>

                  <button
                    type="button"
                    onClick={replay}
                    className="mt-10 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ink-mute transition hover:text-rose"
                  >
                    Replay the wish
                  </button>
                </motion.div>
              </section>
            </main>

            <footer className="border-t border-line px-6 py-5 text-center text-[0.58rem] uppercase tracking-[0.2em] text-ink-mute">
              Happy Birthday · Kavya Reddy · Logiqgen
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
