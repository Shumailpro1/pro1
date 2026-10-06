"use client";

/**
 * About Me — portrait panel styled to match the navy portfolio theme.
 */

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui";
import LazyThreeBackdrop from "@/components/three/LazyThreeBackdrop";
import { easeOut } from "@/lib/motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.12, duration: 0.6, ease: easeOut },
  }),
};

function AboutVisual({ inView }: { inView: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Theme base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, #0c2a5a 0%, #0a1230 45%, #1a1550 100%)",
        }}
        aria-hidden="true"
      />

      {/* Soft orbs */}
      <motion.div
        className="absolute -top-16 -right-10 h-52 w-52 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(59,140,255,0.4) 0%, transparent 70%)",
        }}
        animate={
          reduceMotion || !inView
            ? undefined
            : { opacity: [0.3, 0.65, 0.3], scale: [1, 1.12, 1], x: [0, -12, 0] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[-25%] left-[-12%] h-60 w-60 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(15,76,138,0.55) 0%, transparent 70%)",
        }}
        animate={
          reduceMotion || !inView
            ? { opacity: 0.4 }
            : { opacity: [0.3, 0.55, 0.3], scale: [1, 1.1, 1], y: [0, -16, 0] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        aria-hidden="true"
      />

      {/* Image — entrance + slow ken-burns pan */}
      <motion.div
        className="absolute inset-[-8%]"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={
          inView
            ? reduceMotion
              ? { scale: 1.05, opacity: 1 }
              : {
                  opacity: 1,
                  scale: [1.12, 1.2, 1.12],
                  x: ["0%", "-2%", "0%"],
                  y: ["0%", "1.5%", "0%"],
                }
            : undefined
        }
        transition={
          reduceMotion
            ? { duration: 0.6, ease: easeOut }
            : {
                opacity: { duration: 0.9, ease: easeOut },
                scale: { duration: 18, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 18, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        <Image
          src="/assets/about-theme.jpg"
          alt="Developer workspace with code editor"
          fill
          className="object-cover object-[center_30%]"
          sizes="(max-width: 768px) 100vw, 700px"
          priority
        />
      </motion.div>

      {/* Navy color wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(125deg, rgba(10,18,48,0.55) 0%, rgba(15,76,138,0.22) 40%, rgba(10,18,48,0.15) 65%, rgba(26,21,80,0.45) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 80% at 55% 40%, transparent 35%, rgba(6,11,28,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-[42%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(6,11,28,0.55) 45%, rgba(6,11,28,0.88) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Sweeping light shimmer */}
      {!reduceMotion && inView && (
        <motion.div
          className="pointer-events-none absolute inset-y-0 w-[35%] skew-x-[-18deg]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
          initial={{ left: "-40%", opacity: 0 }}
          animate={{ left: ["-40%", "120%"], opacity: [0, 1, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            repeatDelay: 3.5,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      )}

      {/* Accent frame — soft pulse */}
      <motion.div
        className="pointer-events-none absolute inset-3 rounded-[18px] border border-white/15"
        animate={
          reduceMotion || !inView
            ? undefined
            : { borderColor: ["rgba(255,255,255,0.12)", "rgba(59,155,255,0.35)", "rgba(255,255,255,0.12)"] }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute inset-[14px] rounded-[14px] border border-[rgba(59,140,255,0.25)]"
        animate={
          reduceMotion || !inView
            ? undefined
            : {
                borderColor: [
                  "rgba(59,140,255,0.2)",
                  "rgba(59,155,255,0.55)",
                  "rgba(59,140,255,0.2)",
                ],
                boxShadow: [
                  "inset 0 0 0 rgba(59,140,255,0)",
                  "inset 0 0 24px rgba(59,140,255,0.15)",
                  "inset 0 0 0 rgba(59,140,255,0)",
                ],
              }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        aria-hidden="true"
      />

      {/* Floating badge */}
      <motion.div
        className="absolute top-4 left-4 z-[2] rounded-full border border-[rgba(59,140,255,0.45)] bg-[rgba(10,18,48,0.65)] px-3 py-1 backdrop-blur-md"
        initial={{ opacity: 0, y: -10, scale: 0.9 }}
        animate={
          inView
            ? reduceMotion
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 1, y: [0, -4, 0], scale: 1 }
            : undefined
        }
        transition={
          reduceMotion
            ? { delay: 0.3, duration: 0.4 }
            : {
                opacity: { delay: 0.35, duration: 0.45, ease: easeOut },
                scale: { delay: 0.35, duration: 0.45, ease: easeOut },
                y: { delay: 0.8, duration: 3.2, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        <span
          className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-bright)] uppercase"
          style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
        >
          Creative work
        </span>
      </motion.div>

      {/* Soft glow accent corner */}
      <motion.div
        className="pointer-events-none absolute top-0 right-0 h-28 w-28"
        style={{
          background:
            "radial-gradient(circle at 100% 0%, rgba(59,155,255,0.4) 0%, transparent 70%)",
        }}
        animate={
          reduceMotion || !inView
            ? undefined
            : { opacity: [0.4, 0.85, 0.4] }
        }
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </div>
  );
}

export default function AboutMe() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full scroll-mt-6 overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
    >
      <LazyThreeBackdrop opacity={0.4} />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-[12%] left-[-6%] h-64 w-64 rounded-full opacity-35 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(15,76,138,0.45) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-5%] bottom-[8%] h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(26,21,80,0.55) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1100px]">
        <div className="mb-8 sm:mb-10">
          <motion.p
            className="mb-2 text-[11px] font-semibold tracking-[0.22em] text-[var(--accent-bright)] uppercase"
            style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.45, ease: easeOut }}
          >
            Get to know me
          </motion.p>
          <motion.h2
            className="text-[28px] leading-none font-normal tracking-[-0.02em] text-white uppercase sm:text-[36px] lg:text-[40px]"
            style={{ fontFamily: "var(--font-about-display), Impact, sans-serif" }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.08, duration: 0.55, ease: easeOut }}
          >
            About me
          </motion.h2>
        </div>

        <motion.div
          className="flex w-full flex-col overflow-hidden rounded-[24px] border border-white/10 p-3 shadow-[0_8px_28px_rgba(0,0,0,0.3)] sm:p-4 md:aspect-[3.1/1] md:flex-row md:items-stretch"
          style={{
            background: `
              radial-gradient(ellipse 70% 80% at 10% 20%, #0f4c8a 0%, transparent 55%),
              radial-gradient(ellipse 50% 60% at 90% 90%, #1a1550 0%, transparent 50%),
              linear-gradient(145deg, #0c2a5a 0%, #0a1230 45%, #0d1538 75%, #1a1550 100%)
            `,
          }}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <div className="flex w-full flex-col justify-center px-2 py-6 md:w-[34%] md:py-4 md:pr-6 md:pl-4">
            <motion.h3
              className="text-[22px] leading-[1.15] font-normal tracking-[-0.02em] text-white uppercase sm:text-[24px]"
              style={{ fontFamily: "var(--font-about-display), Impact, sans-serif" }}
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              Designer &amp; developer
            </motion.h3>

            <motion.p
              className="mt-3 max-w-[300px] text-[13px] leading-[1.65] font-medium text-[var(--body-gray)] sm:text-[14px]"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              I&apos;m Shumail Rizwan — a visual designer and frontend developer
              from Gujranwala, Pakistan. I craft clean interfaces, thoughtful
              systems, and experiences that feel intentional and polished.
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mt-5"
            >
              <Button href="#portfolio" variant="primary" showArrow>
                See my work
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative w-full md:w-[66%]"
            initial={{ opacity: 0, scale: 0.96, x: 24 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : undefined}
            transition={{ delay: 0.2, duration: 0.75, ease: easeOut }}
          >
            <motion.div
              className="relative h-[220px] w-full overflow-hidden rounded-[22px] border border-white/10 sm:h-[280px] md:h-full md:min-h-0"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(59,140,255,0.2), 0 16px 40px rgba(0,0,0,0.35), inset 0 0 40px rgba(59,140,255,0.08)",
              }}
              whileHover={{
                boxShadow:
                  "0 0 0 1px rgba(59,155,255,0.45), 0 20px 48px rgba(0,0,0,0.4), 0 0 40px rgba(59,140,255,0.2)",
              }}
              transition={{ duration: 0.35 }}
            >
              <AboutVisual inView={inView} />

              <motion.div
                className="absolute right-4 bottom-4 z-10"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.45, duration: 0.55, ease: easeOut }}
              >
                <Button href="#top" variant="primary" showArrow>
                  Welcome to portfolio
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
