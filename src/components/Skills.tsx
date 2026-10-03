"use client";

/**
 * Skills — 5 per row. Hover one: it zooms, shows brand logo + short blurb.
 */

import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const navyGradients = [
  "linear-gradient(145deg, #0f4c8a 0%, #0a1230 55%, #1a1550 100%)",
  "linear-gradient(145deg, #0c2a5a 0%, #1a1550 50%, #0a1230 100%)",
  "linear-gradient(160deg, #1a1550 0%, #0f4c8a 45%, #0a1230 100%)",
] as const;

type Skill = {
  name: string;
  blurb: string;
  image: string;
};

const skills: Skill[] = [
  {
    name: "HTML",
    blurb: "Semantic markup and accessible page structure for clean, solid layouts.",
    image: "/skills/html.svg",
  },
  {
    name: "CSS",
    blurb: "Responsive styling, layouts, and polish with modern CSS techniques.",
    image: "/skills/css.svg",
  },
  {
    name: "JavaScript",
    blurb: "Interactive UI logic, DOM work, and everyday product features.",
    image: "/skills/javascript.svg",
  },
  {
    name: "React",
    blurb: "Component-driven UIs with hooks, state, and reusable patterns.",
    image: "/skills/react.svg",
  },
  {
    name: "TypeScript",
    blurb: "Typed JavaScript for safer APIs, fewer bugs, and clearer code.",
    image: "/skills/typescript.svg",
  },
  {
    name: "Next.js",
    blurb: "App Router sites with fast routing, SSR, and production polish.",
    image: "/skills/nextjs.svg",
  },
  {
    name: "Tailwind",
    blurb: "Utility-first styling for fast, consistent, responsive interfaces.",
    image: "/skills/tailwind.svg",
  },
  {
    name: "MongoDB",
    blurb: "Document databases for flexible data models and scalable APIs.",
    image: "/skills/mongodb.svg",
  },
  {
    name: "Node.js",
    blurb: "Server-side JavaScript for APIs, tools, and backend services.",
    image: "/skills/nodejs.svg",
  },
  {
    name: "UI/UX",
    blurb: "Clear flows, usable screens, and interfaces people enjoy using.",
    image: "/skills/uiux.svg",
  },
];

const rows = [skills.slice(0, 5), skills.slice(5, 10)] as const;

function CardDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-8 -right-8 h-28 w-28 rounded-full opacity-30 blur-2xl"
        style={{ background: "#3b8cff" }}
      />
      <div
        className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full opacity-20 blur-2xl"
        style={{ background: "#1a1550" }}
      />
    </div>
  );
}

function SkillLogo({
  src,
  alt,
  size,
}: {
  src: string;
  alt: string;
  size: number;
}) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-[12px] bg-white/95 p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.28)]"
      style={{ width: size + 12, height: size + 12 }}
    >
      <Image src={src} alt={alt} width={size} height={size} className="object-contain" />
    </span>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="skills"
      ref={ref}
      className="w-full scroll-mt-6 px-4 py-12 sm:px-6 sm:py-16 lg:px-10"
    >
      <div className="mx-auto mb-8 max-w-[1100px] sm:mb-10">
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
          className="text-[32px] leading-none font-normal tracking-[-0.02em] text-white uppercase sm:text-[40px]"
          style={{ fontFamily: "var(--font-about-display), Impact, sans-serif" }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.08, duration: 0.55, ease: easeOut }}
        >
          Skills
        </motion.h2>
      </div>

      <div
        className="mx-auto flex w-full max-w-[1100px] flex-col gap-3"
        onMouseLeave={() => setActive(null)}
      >
        {rows.map((row, rowIndex) => {
          const rowStart = rowIndex * 5;
          const activeInThisRow =
            active !== null && active >= rowStart && active < rowStart + 5;

          return (
            <div key={rowIndex} className="flex h-[170px] w-full gap-3 sm:h-[190px]">
              {row.map((skill, colIndex) => {
                const i = rowStart + colIndex;
                const isActive = active === i;
                const isSibling = activeInThisRow && !isActive;
                const flex = isActive ? 2.6 : isSibling ? 0.6 : 1;

                return (
                  <motion.article
                    key={skill.name}
                    className="relative h-full min-w-0 cursor-pointer overflow-hidden rounded-[16px] border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-[flex-grow,border-color] duration-300 ease-out"
                    onMouseEnter={() => setActive(i)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: inView ? 1 : 0,
                      y: inView ? 0 : 20,
                      scale: isActive ? 1.03 : 1,
                    }}
                    transition={{
                      opacity: {
                        duration: 0.4,
                        delay: active === null && inView ? i * 0.04 : 0,
                      },
                      y: { duration: 0.4 },
                      scale: { duration: 0.3, ease: easeOut },
                    }}
                    style={{
                      flexGrow: flex,
                      flexShrink: 1,
                      flexBasis: 0,
                      zIndex: isActive ? 5 : 1,
                      borderColor: isActive
                        ? "rgba(59,140,255,0.55)"
                        : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{ background: navyGradients[i % navyGradients.length] }}
                    />
                    <CardDecor />

                    {/* Picture fills the block */}
                    <motion.div
                      className="absolute inset-0 z-[1]"
                      animate={{
                        scale: isActive ? 1.06 : isSibling ? 0.95 : 1,
                        opacity: isSibling ? 0.5 : 0.95,
                      }}
                      transition={{ duration: 0.3, ease: easeOut }}
                    >
                      <Image
                        src={skill.image}
                        alt={skill.name}
                        fill
                        sizes="220px"
                        className="object-contain p-5 drop-shadow-[0_10px_24px_rgba(0,0,0,0.4)] sm:p-6"
                      />
                    </motion.div>

                    <div
                      className="absolute inset-0 z-[2]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.72) 100%)",
                      }}
                    />

                    <div className="relative z-10 flex h-full flex-col justify-between p-3 sm:p-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className="text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)] uppercase"
                          style={{
                            fontFamily: "var(--font-poppins), system-ui, sans-serif",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Extra clear icon on hover */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.7, y: -6 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.7, y: -6 }}
                              transition={{ duration: 0.25, ease: easeOut }}
                            >
                              <SkillLogo
                                src={skill.image}
                                alt={skill.name}
                                size={32}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Name + blurb always visible — theme colors */}
                      <div className="min-w-0">
                        <h3
                          className={`leading-[1.15] font-normal tracking-[-0.01em] text-white uppercase ${
                            isSibling
                              ? "text-[11px] sm:text-[12px]"
                              : isActive
                                ? "text-[16px] sm:text-[18px]"
                                : "text-[13px] sm:text-[15px]"
                          }`}
                          style={{
                            fontFamily:
                              "var(--font-about-display), Impact, sans-serif",
                          }}
                        >
                          {skill.name}
                        </h3>
                        <p
                          className={`mt-1 text-[var(--body-gray)] ${
                            isSibling
                              ? "hidden"
                              : isActive
                                ? "text-[11px] leading-[1.45] sm:text-[12px]"
                                : "line-clamp-2 text-[10px] leading-[1.4] sm:text-[11px]"
                          }`}
                          style={{
                            fontFamily:
                              "var(--font-dm-sans), system-ui, sans-serif",
                          }}
                        >
                          {skill.blurb}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
