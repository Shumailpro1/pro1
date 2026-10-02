"use client";

/**
 * AboutGtaVI — pixel-accurate recreation of the GTA VI about banner.
 * TODO: Drop a Vice City sunset into /public/reference.png to replace the CSS art.
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.12, duration: 0.6, ease: easeOut },
  }),
};

function ArrowUpRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M3 9 9 3M4 3h5v5"
        stroke="black"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ViceCityArt() {
  return (
    <div className="about-gta-scene absolute inset-0" aria-hidden="true">
      {/* Sky gradient: purple → magenta → peach */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #3b1a6e 0%, #6b1f8a 22%, #d63fa0 52%, #ff7a6a 78%, #ff9a5a 100%)",
        }}
      />

      {/* Horizon haze */}
      <div
        className="absolute inset-x-0 bottom-[18%] h-[35%]"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(255,180,120,0.65) 0%, transparent 70%)",
        }}
      />

      {/* City skyline — pastel glass towers */}
      <svg
        className="absolute bottom-[12%] left-[18%] h-[58%] w-[64%]"
        viewBox="0 0 640 320"
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <linearGradient id="towerPink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4a4d0" />
            <stop offset="100%" stopColor="#c45a9a" />
          </linearGradient>
          <linearGradient id="towerBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9ec8f0" />
            <stop offset="100%" stopColor="#5a7fc0" />
          </linearGradient>
          <linearGradient id="towerPurple" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9a0e8" />
            <stop offset="100%" stopColor="#7a4aad" />
          </linearGradient>
          <linearGradient id="towerGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe0c0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ff9a5a" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <rect x="40" y="140" width="70" height="180" fill="url(#towerPurple)" rx="2" />
        <rect x="52" y="155" width="10" height="14" fill="#fff" opacity="0.35" />
        <rect x="70" y="155" width="10" height="14" fill="#fff" opacity="0.25" />
        <rect x="52" y="180" width="10" height="14" fill="#fff" opacity="0.3" />
        <rect x="70" y="180" width="10" height="14" fill="#fff" opacity="0.2" />

        <rect x="120" y="80" width="95" height="240" fill="url(#towerPink)" rx="2" />
        <rect x="135" y="100" width="14" height="18" fill="#fff" opacity="0.4" />
        <rect x="160" y="100" width="14" height="18" fill="#fff" opacity="0.3" />
        <rect x="185" y="100" width="14" height="18" fill="#fff" opacity="0.35" />
        <rect x="135" y="140" width="14" height="18" fill="#fff" opacity="0.35" />
        <rect x="160" y="140" width="14" height="18" fill="#fff" opacity="0.25" />
        <rect x="185" y="140" width="14" height="18" fill="#fff" opacity="0.3" />

        <rect x="230" y="50" width="110" height="270" fill="url(#towerBlue)" rx="2" />
        <rect x="248" y="70" width="16" height="20" fill="#fff" opacity="0.45" />
        <rect x="278" y="70" width="16" height="20" fill="#fff" opacity="0.35" />
        <rect x="308" y="70" width="16" height="20" fill="#fff" opacity="0.4" />
        <rect x="248" y="110" width="16" height="20" fill="#fff" opacity="0.35" />
        <rect x="278" y="110" width="16" height="20" fill="#fff" opacity="0.3" />
        <rect x="308" y="110" width="16" height="20" fill="#fff" opacity="0.35" />
        <rect x="248" y="150" width="16" height="20" fill="#fff" opacity="0.3" />
        <rect x="278" y="150" width="16" height="20" fill="#fff" opacity="0.25" />

        <rect x="355" y="100" width="80" height="220" fill="url(#towerPurple)" rx="2" />
        <rect x="370" y="120" width="12" height="16" fill="#fff" opacity="0.35" />
        <rect x="395" y="120" width="12" height="16" fill="#fff" opacity="0.28" />
        <rect x="370" y="155" width="12" height="16" fill="#fff" opacity="0.3" />

        <rect x="450" y="70" width="100" height="250" fill="url(#towerPink)" rx="2" />
        <rect x="468" y="90" width="14" height="18" fill="#fff" opacity="0.4" />
        <rect x="496" y="90" width="14" height="18" fill="#fff" opacity="0.32" />
        <rect x="524" y="90" width="14" height="18" fill="#fff" opacity="0.36" />
        <rect x="468" y="130" width="14" height="18" fill="#fff" opacity="0.32" />
        <rect x="496" y="130" width="14" height="18" fill="#fff" opacity="0.28" />

        <rect x="560" y="130" width="60" height="190" fill="url(#towerBlue)" rx="2" />
        <rect x="572" y="148" width="10" height="14" fill="#fff" opacity="0.35" />
        <rect x="590" y="148" width="10" height="14" fill="#fff" opacity="0.28" />

        <rect x="0" y="280" width="640" height="40" fill="url(#towerGlow)" />
      </svg>

      {/* Palm silhouettes */}
      <svg
        className="absolute bottom-0 left-0 h-[92%] w-[28%]"
        viewBox="0 0 200 400"
        preserveAspectRatio="xMinYMax meet"
      >
        <path
          d="M95 400 V170"
          stroke="#1a0a2e"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M95 175 C40 120 10 90 5 55 C55 85 80 130 95 175Z"
          fill="#1a0a2e"
        />
        <path
          d="M95 170 C70 100 55 55 70 15 C95 55 100 110 95 170Z"
          fill="#220e38"
        />
        <path
          d="M95 175 C150 115 185 85 198 50 C155 90 120 135 95 175Z"
          fill="#1a0a2e"
        />
        <path
          d="M95 178 C130 130 160 100 175 70 C140 105 115 145 95 178Z"
          fill="#2a1445"
        />
        <path
          d="M95 172 C50 140 20 130 8 115 C45 125 75 150 95 172Z"
          fill="#220e38"
        />
      </svg>

      <svg
        className="absolute bottom-0 right-[6%] h-[85%] w-[24%]"
        viewBox="0 0 180 380"
        preserveAspectRatio="xMaxYMax meet"
      >
        <path
          d="M90 380 V155"
          stroke="#1a0a2e"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M90 160 C40 110 15 80 8 45 C50 80 75 120 90 160Z"
          fill="#1a0a2e"
        />
        <path
          d="M90 155 C75 90 65 50 78 10 C95 50 98 105 90 155Z"
          fill="#220e38"
        />
        <path
          d="M90 160 C135 105 165 75 178 40 C140 80 110 125 90 160Z"
          fill="#1a0a2e"
        />
        <path
          d="M90 162 C120 120 145 95 160 65 C130 100 108 135 90 162Z"
          fill="#2a1445"
        />
      </svg>

      {/* Neon VICE sign */}
      <div className="absolute bottom-[16%] right-[14%] flex flex-col items-center">
        <div
          className="rounded-xl border-2 px-4 py-1.5"
          style={{
            borderColor: "#ff6ec7",
            boxShadow:
              "0 0 12px rgba(255,110,199,0.85), 0 0 28px rgba(214,63,160,0.55), inset 0 0 10px rgba(255,110,199,0.35)",
            background: "rgba(40,10,60,0.45)",
          }}
        >
          <span
            className="text-[22px] font-bold tracking-[0.28em] text-[#ff7ad4]"
            style={{
              fontFamily: "var(--font-about-display), Impact, sans-serif",
              textShadow:
                "0 0 8px #ff6ec7, 0 0 18px #d63fa0, 0 0 2px #fff",
            }}
          >
            VICE
          </span>
        </div>
      </div>

      {/* Bottom dark gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-[22%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(20,5,40,0.55) 100%)",
        }}
      />

      {/*
        TODO: Replace CSS art with the real asset when available:
        <Image src="/reference.png" alt="Vice City sunset" fill className="object-cover" priority />
      */}
    </div>
  );
}

export default function AboutGtaVI() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      id="about"
      ref={ref}
      className="about-gta-section w-full scroll-mt-6 px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16"
    >
      <motion.div
        className="about-gta-banner mx-auto flex w-full max-w-[1200px] flex-col overflow-hidden rounded-[24px] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.35)] md:aspect-[3.3/1] md:flex-row md:items-stretch"
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
        {/* Left column — ~28% */}
        <div className="flex w-full flex-col justify-center px-2 py-6 md:w-[28%] md:py-4 md:pr-6 md:pl-4">
          <motion.h2
            className="text-[28px] leading-none font-normal tracking-[-0.02em] text-white uppercase sm:text-[30px] lg:text-[32px]"
            style={{ fontFamily: "var(--font-about-display), Impact, sans-serif" }}
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            About GTA VI
          </motion.h2>

          <motion.p
            className="mt-3 max-w-[260px] text-[11.5px] leading-[1.5] font-medium text-[var(--body-gray)]"
            style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            The biggest, most immersive evolution of the Grand Theft Auto series
            yet. A new story, new characters, and a world like never before.
          </motion.p>

          <motion.a
            href="#discover"
            className="about-gta-btn group mt-5 inline-flex h-9 min-w-[110px] items-center justify-center gap-1.5 rounded-full bg-[#d9f24a] px-5 text-[13px] font-medium text-black md:h-11 md:min-w-[132px] md:px-6 md:text-[15px]"
            style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{
              y: -3,
              scale: 1.04,
              boxShadow: "0 10px 28px rgba(217,242,74,0.55)",
            }}
            whileTap={{ scale: 0.96, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            Discover more
            <motion.span
              className="inline-block text-[13px] leading-none md:text-[15px]"
              aria-hidden="true"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>
        </div>

        {/* Right column — ~72% image card + vertical tab */}
        <motion.div
          className="relative w-full md:w-[72%]"
          initial={{ opacity: 0, scale: 0.94, x: 28 }}
          animate={inView ? { opacity: 1, scale: 1, x: 0 } : undefined}
          transition={{ delay: 0.2, duration: 0.75, ease: easeOut }}
        >
          <div className="relative h-[260px] w-full overflow-hidden rounded-[22px] md:h-full md:min-h-0">
            {/* Prefer /public/reference.png when present; CSS art is the fallback */}
            <ViceCityArt />

            {/* Desktop vertical tab — same cross-section as hero pill buttons */}
            <motion.aside
              className="absolute top-2 right-2 bottom-2 z-10 hidden w-9 flex-col items-center rounded-full bg-[#d9f24a] py-2.5 md:flex lg:w-11 lg:py-3"
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ delay: 0.45, duration: 0.55, ease: easeOut }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 lg:h-11 lg:w-11"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUpRight />
              </motion.span>
              <span
                className="mt-3 flex flex-1 items-center justify-center text-[11px] font-medium tracking-[0.18em] text-black uppercase lg:text-[13px]"
                style={{
                  fontFamily: "var(--font-poppins), system-ui, sans-serif",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                Welcome to Vice City
              </span>
            </motion.aside>

            {/* Mobile horizontal pill — same size as hero buttons */}
            <motion.aside
              className="absolute right-3 bottom-3 left-3 z-10 flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#d9f24a] px-5 text-[13px] font-medium text-black md:hidden"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.4, duration: 0.5, ease: easeOut }}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              Welcome to Vice City
              <span className="inline-block leading-none" aria-hidden="true">
                →
              </span>
            </motion.aside>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
