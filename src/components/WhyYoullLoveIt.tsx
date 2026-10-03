"use client";

/**
 * WhyYoullLoveIt — pixel-accurate recreation of the feature / project banner.
 * TODO: Replace CSS art with /public/reference-hero.png and card thumbnails when available.
 */

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { IconButton } from "@/components/ui";

const easeOut = [0.22, 1, 0.36, 1] as const;

function TypewriterHeading({
  text,
  active,
  className,
  style,
}: {
  text: string;
  active: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      setDone(false);
      return;
    }

    let i = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, 75);
    }, 280);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [active, text]);

  return (
    <h2 className={className} style={style} aria-label={text}>
      <span>{displayed}</span>
      <motion.span
        className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.06em] bg-[var(--accent-bright)]"
        animate={{ opacity: done ? [1, 0, 1] : [1, 0] }}
        transition={{
          duration: done ? 1 : 0.45,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
      />
    </h2>
  );
}

const features = [
  {
    title: "Vibrant World",
    text: "A living, breathing world full of life, stories and unforgettable moments.",
    art: "sunset",
  },
  {
    title: "Epic Action",
    text: "High-speed chases, intense shootouts and limitless ways to play your way.",
    art: "action",
  },
  {
    title: "New Era",
    text: "Next-gen gameplay, stunning visuals and a bold new story.",
    art: "neon",
  },
] as const;

function ThumbArt({ kind }: { kind: (typeof features)[number]["art"] }) {
  if (kind === "sunset") {
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #0f4c8a 0%, #1a1550 50%, #0a1230 100%)",
        }}
        aria-hidden="true"
      >
        <div
          className="absolute -top-4 -right-4 h-16 w-16 rounded-full opacity-50 blur-xl"
          style={{ background: "#3b8cff" }}
        />
        <div
          className="absolute bottom-2 left-2 h-10 w-10 rounded-full opacity-40 blur-lg"
          style={{ background: "#2f7de1" }}
        />
      </div>
    );
  }

  if (kind === "action") {
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, #0c2a5a 0%, #2f7de1 55%, #3b9bff 100%)",
        }}
        aria-hidden="true"
      >
        <div className="absolute top-[30%] left-[20%] h-2 w-8 -rotate-12 rounded-full bg-white/35 blur-[1px]" />
        <div className="absolute top-[42%] right-[18%] h-1.5 w-10 rotate-6 rounded-full bg-[#8fd3ff]/45 blur-[1px]" />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, #0a1230 0%, #0f4c8a 45%, #1a1550 100%)",
      }}
      aria-hidden="true"
    >
      <div className="absolute bottom-[18%] left-[12%] h-[42%] w-[14%] rounded-sm bg-[#3b8cff]/40" />
      <div className="absolute bottom-[10%] left-[30%] h-[55%] w-[18%] rounded-sm bg-[#5eb0ff]/35" />
      <div className="absolute bottom-[14%] left-[52%] h-[48%] w-[16%] rounded-sm bg-[#2f7de1]/45" />
      <div className="absolute bottom-[8%] right-[12%] h-[38%] w-[12%] rounded-sm bg-[#8fd3ff]/30" />
    </div>
  );
}

function HeroSceneArt() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/*
        TODO: Replace with real asset when available:
        <Image src="/reference-hero.png" alt="Helicopter over coastal city" fill className="object-cover" />
      */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #0c2a5a 0%, #0a1230 40%, #0f4c8a 70%, #1a1550 100%)",
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-[28%] h-[40%]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(59,140,255,0.35) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        className="absolute bottom-0 left-0 h-[55%] w-full"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="whyTowerA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b9bff" />
            <stop offset="100%" stopColor="#0f4c8a" />
          </linearGradient>
          <linearGradient id="whyTowerB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5eb0ff" />
            <stop offset="100%" stopColor="#1a1550" />
          </linearGradient>
          <linearGradient id="whyWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f4c8a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0a1230" />
          </linearGradient>
        </defs>
        <rect x="20" y="70" width="28" height="90" fill="url(#whyTowerB)" />
        <rect x="55" y="40" width="40" height="120" fill="url(#whyTowerA)" />
        <rect x="105" y="55" width="32" height="105" fill="url(#whyTowerB)" />
        <rect x="145" y="25" width="48" height="135" fill="url(#whyTowerA)" />
        <rect x="205" y="45" width="36" height="115" fill="url(#whyTowerB)" />
        <rect x="250" y="30" width="44" height="130" fill="url(#whyTowerA)" />
        <rect x="305" y="60" width="30" height="100" fill="url(#whyTowerB)" />
        <rect x="345" y="48" width="38" height="112" fill="url(#whyTowerA)" />
        {[60, 110, 160, 220, 270, 320].map((x) => (
          <g key={x} opacity="0.55">
            <rect x={x} y="50" width="4" height="5" fill="#8fd3ff" />
            <rect x={x + 10} y="65" width="4" height="5" fill="#3b9bff" />
            <rect x={x} y="80" width="4" height="5" fill="#5eb0ff" />
          </g>
        ))}
        <rect x="0" y="160" width="400" height="40" fill="url(#whyWater)" />
        <path
          d="M0 168 Q100 162 200 170 T400 165"
          stroke="rgba(59,155,255,0.35)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <motion.svg
        className="absolute top-[22%] left-[28%] h-[18%] w-[28%]"
        viewBox="0 0 120 48"
        animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="60" cy="6" rx="48" ry="2.5" fill="#060b1c" opacity="0.85" />
        <path
          d="M28 28 C32 18 48 14 62 16 C78 18 92 24 96 30 L88 32 C82 26 70 24 58 24 C46 24 36 28 32 32Z"
          fill="#060b1c"
        />
        <path d="M96 28 L112 22 L114 26 L98 32Z" fill="#060b1c" />
        <path d="M40 32 L36 40 H48 L46 32Z" fill="#060b1c" />
        <path d="M70 32 L68 40 H82 L78 32Z" fill="#060b1c" />
        <circle cx="58" cy="22" r="3" fill="#3b8cff" />
      </motion.svg>

      <div
        className="absolute inset-x-0 bottom-0 h-[45%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}

function FeatureCard({
  feature,
}: {
  feature: (typeof features)[number];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.65, ease: easeOut },
        },
      }}
      className="h-full"
    >
      <motion.article
        className="relative flex h-full min-h-[168px] cursor-pointer flex-col overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04] p-3"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onTap={() => setHovered((v) => !v)}
        whileHover={{
          y: -4,
          borderColor: "rgba(59,140,255,0.45)",
          boxShadow: "0 14px 32px rgba(0,0,0,0.35)",
        }}
        transition={{ duration: 0.3, ease: easeOut }}
      >
        {/* Default small thumbnail */}
        <motion.div
          className="relative z-0 h-14 w-14 overflow-hidden rounded-xl sm:h-16 sm:w-16"
          animate={
            hovered
              ? { opacity: 0, scale: 0.8 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.3, ease: easeOut }}
        >
          <ThumbArt kind={feature.art} />
        </motion.div>

        {/* Expanded picture — grows to fill the card */}
        <motion.div
          className="absolute inset-0 z-[1] overflow-hidden rounded-[18px]"
          animate={
            hovered
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.55 }
          }
          transition={{ duration: 0.45, ease: easeOut }}
          style={{ pointerEvents: "none" }}
        >
          <motion.div
            className="absolute inset-0"
            animate={hovered ? { scale: 1 } : { scale: 1.2 }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            <ThumbArt kind={feature.art} />
          </motion.div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.5) 100%)",
            }}
          />
          <motion.p
            className="absolute bottom-3 left-3 right-3 text-[12px] font-bold tracking-[0.08em] text-white uppercase"
            style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
            animate={
              hovered
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 12 }
            }
            transition={{ duration: 0.3, delay: hovered ? 0.12 : 0, ease: easeOut }}
          >
            {feature.title}
          </motion.p>
        </motion.div>

        {/* Text — hides when picture expands */}
        <motion.div
          className="relative z-[2] mt-3"
          animate={
            hovered
              ? { opacity: 0, y: 14, height: 0, marginTop: 0 }
              : { opacity: 1, y: 0, height: "auto", marginTop: 12 }
          }
          transition={{ duration: 0.28, ease: easeOut }}
        >
          <h3
            className="text-[13px] font-bold tracking-[0.06em] text-white uppercase"
            style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
          >
            {feature.title}
          </h3>
          <p
            className="mt-1.5 text-[10.5px] leading-[1.5] font-medium text-[var(--body-gray)]"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          >
            {feature.text}
          </p>
        </motion.div>
      </motion.article>
    </motion.div>
  );
}

export default function WhyYoullLoveIt() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.22 });

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative w-full scroll-mt-6 overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-[10%] left-[-6%] h-64 w-64 rounded-full opacity-35 blur-3xl"
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

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col gap-3.5 overflow-hidden rounded-[24px] border border-white/10 p-4 shadow-[0_8px_28px_rgba(0,0,0,0.3)] md:aspect-[3.4/1] md:flex-row"
        style={{
          background: `
            radial-gradient(ellipse 70% 80% at 10% 20%, #0f4c8a 0%, transparent 55%),
            radial-gradient(ellipse 50% 60% at 90% 90%, #1a1550 0%, transparent 50%),
            linear-gradient(145deg, #0c2a5a 0%, #0a1230 45%, #0d1538 75%, #1a1550 100%)
          `,
        }}
        initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
        animate={
          inView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : undefined
        }
        transition={{ duration: 0.8, ease: easeOut }}
      >
        {/* Left ~68% */}
        <div className="flex w-full flex-col md:w-[68%]">
          <TypewriterHeading
            text="PROJECTS"
            active={inView}
            className="mb-3.5 text-[26px] leading-none font-normal tracking-[-0.02em] text-white uppercase sm:text-[28px] lg:text-[30px]"
            style={{ fontFamily: "var(--font-about-display), Impact, sans-serif" }}
          />

          <motion.div
            className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.14, delayChildren: 0.55 },
              },
            }}
          >
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </motion.div>
        </div>

        {/* Right ~32% hero image card */}
        <motion.div
          className="group relative h-[280px] w-full overflow-hidden rounded-[22px] md:h-auto md:w-[32%] md:min-h-0"
          initial={{ opacity: 0, x: 36, scale: 0.96 }}
          animate={inView ? { opacity: 1, x: 0, scale: 1 } : undefined}
          transition={{ delay: 0.35, duration: 0.85, ease: easeOut }}
          whileHover={{ scale: 1.01 }}
        >
          <HeroSceneArt />

          <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-[18px]">
            <motion.h3
              className="max-w-[70%] text-[22px] leading-[1.05] font-normal tracking-[-0.01em] text-white uppercase sm:text-[24px] lg:text-[26px]"
              style={{ fontFamily: "var(--font-about-display), Impact, sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.75, duration: 0.6, ease: easeOut }}
            >
              A new legacy
              <br />
              Begins
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: 0.9, type: "spring", stiffness: 280, damping: 18 }}
            >
              <IconButton
                href="#portfolio"
                variant="primary"
                size="md"
                ariaLabel="Discover more"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
