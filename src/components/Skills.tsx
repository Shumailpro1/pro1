"use client";

/**
 * Skills — professional spotlight carousel.
 * Featured skill + synced logo rail + arrows / dots / autoplay.
 */

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import LazyThreeBackdrop from "@/components/three/LazyThreeBackdrop";
import { easeOut } from "@/lib/motion";

type Skill = {
  name: string;
  blurb: string;
  image: string;
  level: string;
};

const skills: Skill[] = [
  {
    name: "HTML",
    blurb: "Semantic markup and accessible page structure for clean, solid layouts.",
    image: "/skills/html.svg",
    level: "Advanced",
  },
  {
    name: "CSS",
    blurb: "Responsive styling, layouts, and polish with modern CSS techniques.",
    image: "/skills/css.svg",
    level: "Advanced",
  },
  {
    name: "JavaScript",
    blurb: "Interactive UI logic, DOM work, and everyday product features.",
    image: "/skills/javascript.svg",
    level: "Advanced",
  },
  {
    name: "React",
    blurb: "Component-driven UIs with hooks, state, and reusable patterns.",
    image: "/skills/react.svg",
    level: "Advanced",
  },
  {
    name: "TypeScript",
    blurb: "Typed JavaScript for safer APIs, fewer bugs, and clearer code.",
    image: "/skills/typescript.svg",
    level: "Proficient",
  },
  {
    name: "Next.js",
    blurb: "App Router sites with fast routing, SSR, and production polish.",
    image: "/skills/nextjs.svg",
    level: "Proficient",
  },
  {
    name: "Tailwind",
    blurb: "Utility-first styling for fast, consistent, responsive interfaces.",
    image: "/skills/tailwind.svg",
    level: "Advanced",
  },
  {
    name: "MongoDB",
    blurb: "Document databases for flexible data models and scalable APIs.",
    image: "/skills/mongodb.svg",
    level: "Working",
  },
  {
    name: "Node.js",
    blurb: "Server-side JavaScript for APIs, tools, and backend services.",
    image: "/skills/nodejs.svg",
    level: "Working",
  },
  {
    name: "UI/UX",
    blurb: "Clear flows, usable screens, and interfaces people enjoy using.",
    image: "/skills/uiux.svg",
    level: "Advanced",
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: easeOut },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.35, ease: easeOut },
  }),
};

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const skillsActive = useInView(ref, { amount: 0.25 });
  const reduceMotion = useReducedMotion();

  const [[page, direction], setPage] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const index = ((page % skills.length) + skills.length) % skills.length;
  const skill = skills[index];

  const paginate = useCallback((dir: number) => {
    setPage(([p]) => [p + dir, dir]);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setPage(([p]) => {
        const current = ((p % skills.length) + skills.length) % skills.length;
        return [p + (i - current), i > current ? 1 : -1];
      });
    },
    [],
  );

  // Autoplay only while Skills is on screen
  useEffect(() => {
    if (!skillsActive || paused || reduceMotion) return;
    const id = window.setInterval(() => paginate(1), 3000);
    return () => window.clearInterval(id);
  }, [skillsActive, paused, reduceMotion, paginate]);

  // Keep active logo visible in the rail only (never scroll the page)
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !skillsActive) return;
    const active = rail.querySelector<HTMLElement>(`[data-skill-index="${index}"]`);
    if (!active) return;
    const left =
      active.offsetLeft - rail.clientWidth / 2 + active.clientWidth / 2;
    rail.scrollTo({
      left: Math.max(0, left),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [index, reduceMotion, skillsActive]);

  // Keyboard only while Skills is actually on screen (not after leaving)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!skillsActive) return;
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skillsActive, paginate]);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative w-full scroll-mt-6 overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <LazyThreeBackdrop opacity={0.38} />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-[10%] left-[-5%] h-64 w-64 rounded-full opacity-35 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(15,76,138,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-4%] bottom-[12%] h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(26,21,80,0.55) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.p
              className="mb-2 text-[11px] font-semibold tracking-[0.22em] text-[var(--accent-bright)] uppercase"
              style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              Expertise
            </motion.p>
            <motion.h2
              className="text-[28px] leading-none font-normal tracking-[-0.02em] text-white uppercase sm:text-[36px] lg:text-[40px]"
              style={{ fontFamily: "var(--font-about-display), Impact, sans-serif" }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.08, duration: 0.55, ease: easeOut }}
            >
              Skills
            </motion.h2>
            <motion.p
              className="mt-3 max-w-[440px] text-[13px] leading-[1.55] text-[var(--body-gray)] sm:text-[14px]"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.14, duration: 0.5, ease: easeOut }}
            >
              A focused look at the tools I use to design and ship polished products.
            </motion.p>
          </div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.18, duration: 0.45, ease: easeOut }}
          >
            <span
              className="hidden text-[12px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase sm:inline"
              style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
            >
              {String(index + 1).padStart(2, "0")}
              <span className="mx-1.5 text-white/25">/</span>
              {String(skills.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous skill"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md transition-colors hover:border-[rgba(59,155,255,0.55)] hover:bg-[rgba(59,140,255,0.18)]"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next skill"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md transition-colors hover:border-[rgba(59,155,255,0.55)] hover:bg-[rgba(59,140,255,0.18)]"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </motion.div>
        </div>

        {/* Main slider stage */}
        <motion.div
          className="relative overflow-hidden rounded-[24px] border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
          style={{
            background: `
              radial-gradient(ellipse 70% 80% at 15% 20%, #0f4c8a 0%, transparent 55%),
              radial-gradient(ellipse 55% 60% at 90% 85%, #1a1550 0%, transparent 50%),
              linear-gradient(145deg, #0c2a5a 0%, #0a1230 45%, #0d1538 75%, #1a1550 100%)
            `,
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.12, duration: 0.65, ease: easeOut }}
        >
          {/* Progress line */}
          <div className="absolute inset-x-0 top-0 z-20 h-[2px] overflow-hidden bg-white/10">
            <motion.div
              key={`progress-${index}-${paused ? "p" : "r"}`}
              className="h-full origin-left"
              style={{
                background: "linear-gradient(90deg, #2f7de1, #3b9bff)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={
                paused || reduceMotion
                  ? { duration: 0.25 }
                  : { duration: 3, ease: "linear" }
              }
            />
          </div>

          <div className="relative grid min-h-[320px] grid-cols-1 md:min-h-[360px] md:grid-cols-[1.05fr_0.95fr]">
            {/* Featured content */}
            <div className="relative flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={skill.name}
                  custom={direction}
                  variants={reduceMotion ? undefined : slideVariants}
                  initial={reduceMotion ? false : "enter"}
                  animate="center"
                  exit={reduceMotion ? undefined : "exit"}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60 || info.velocity.x < -400) paginate(1);
                    else if (info.offset.x > 60 || info.velocity.x > 400) paginate(-1);
                  }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <div className="mb-5 flex flex-wrap items-center gap-2.5">
                    <span
                      className="rounded-full border border-[rgba(59,140,255,0.4)] bg-[rgba(59,140,255,0.12)] px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-[var(--accent-bright)] uppercase"
                      style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
                    >
                      {skill.level}
                    </span>
                    <span
                      className="text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)] uppercase"
                      style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
                    >
                      Skill {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    className="text-[36px] leading-none font-normal tracking-[-0.03em] text-white uppercase sm:text-[44px] lg:text-[52px]"
                    style={{
                      fontFamily: "var(--font-about-display), Impact, sans-serif",
                    }}
                  >
                    {skill.name}
                  </h3>

                  <p
                    className="mt-4 max-w-[420px] text-[14px] leading-[1.65] text-[var(--body-gray)] sm:text-[15px]"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  >
                    {skill.blurb}
                  </p>

                  {/* Dot pagination */}
                  <div
                    className="mt-8 flex flex-wrap items-center gap-1.5"
                    role="tablist"
                    aria-label="Skill slides"
                  >
                    {skills.map((s, i) => {
                      const active = i === index;
                      return (
                        <button
                          key={s.name}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          aria-label={`Show ${s.name}`}
                          onClick={() => goTo(i)}
                          className="flex h-7 items-center justify-center px-0.5"
                        >
                          <motion.span
                            className="block rounded-full"
                            animate={{
                              width: active ? 28 : 8,
                              height: 8,
                              backgroundColor: active
                                ? "#3b9bff"
                                : "rgba(255,255,255,0.22)",
                            }}
                            transition={{ duration: 0.3, ease: easeOut }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Featured visual */}
            <div className="relative flex items-center justify-center overflow-hidden border-t border-white/10 px-6 py-10 md:border-t-0 md:border-l md:px-10 md:py-12">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 45%, rgba(59,140,255,0.22) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`visual-${skill.name}`}
                  custom={direction}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, scale: 0.85, y: direction > 0 ? 24 : -24 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, scale: 0.9, y: direction > 0 ? -20 : 20 }
                  }
                  transition={{ duration: 0.45, ease: easeOut }}
                  className="relative z-[1] flex h-[180px] w-[180px] items-center justify-center rounded-[28px] border border-white/15 bg-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:h-[210px] sm:w-[210px] lg:h-[230px] lg:w-[230px]"
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[28px]"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.12) 0%, transparent 45%)",
                    }}
                  />
                  <Image
                    src={skill.image}
                    alt={skill.name}
                    width={110}
                    height={110}
                    className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
                    priority={index < 3}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Side arrows on visual (desktop) */}
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous skill"
                className="absolute top-1/2 left-3 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[rgba(10,18,48,0.65)] text-white backdrop-blur-md transition-colors hover:border-[rgba(59,155,255,0.55)] hover:bg-[rgba(59,140,255,0.2)] md:flex"
              >
                <ChevronLeft size={18} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next skill"
                className="absolute top-1/2 right-3 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[rgba(10,18,48,0.65)] text-white backdrop-blur-md transition-colors hover:border-[rgba(59,155,255,0.55)] hover:bg-[rgba(59,140,255,0.2)] md:flex"
              >
                <ChevronRight size={18} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Logo rail */}
          <div className="border-t border-white/10 bg-black/20 px-3 py-3 sm:px-4 sm:py-4">
            <div
              ref={railRef}
              className="flex gap-2 overflow-x-auto scroll-smooth px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2.5 [&::-webkit-scrollbar]:hidden"
            >
              {skills.map((s, i) => {
                const active = i === index;
                return (
                  <button
                    key={s.name}
                    type="button"
                    data-skill-index={i}
                    onClick={() => goTo(i)}
                    aria-label={`Select ${s.name}`}
                    aria-current={active ? "true" : undefined}
                    className={`group relative flex shrink-0 items-center gap-2.5 rounded-[14px] border px-3 py-2.5 transition-all sm:px-3.5 ${
                      active
                        ? "border-[rgba(59,155,255,0.55)] bg-[rgba(59,140,255,0.18)] shadow-[0_0_24px_rgba(59,140,255,0.2)]"
                        : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
                    }`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/95 shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
                      <Image
                        src={s.image}
                        alt=""
                        width={22}
                        height={22}
                        className="object-contain"
                      />
                    </span>
                    <span
                      className={`hidden text-[12px] font-semibold tracking-[0.04em] uppercase sm:inline ${
                        active ? "text-white" : "text-[var(--muted)]"
                      }`}
                      style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
                    >
                      {s.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
