"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { EducationItem } from "@/data/education";

type EducationCardProps = {
  item: EducationItem;
  index: number;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const gradients = [
  "linear-gradient(145deg, #0f4c8a 0%, #0a1230 55%, #1a1550 100%)",
  "linear-gradient(145deg, #0c2a5a 0%, #1a1550 50%, #0a1230 100%)",
  "linear-gradient(160deg, #1a1550 0%, #0f4c8a 45%, #0a1230 100%)",
];

export default function EducationCard({ item, index }: EducationCardProps) {
  const reduceMotion = useReducedMotion();
  const years = `${item.startYear} — ${item.endYear}`;

  return (
    <motion.article
      className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[20px] border border-white/10 shadow-[0_10px_32px_rgba(0,0,0,0.3)]"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.55,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: easeOut,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
              borderColor: "rgba(59,140,255,0.55)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.4)",
              transition: { duration: 0.28 },
            }
      }
      tabIndex={0}
      aria-label={`${item.degree} at ${item.institution}`}
    >
      <div className="absolute inset-0" style={{ background: gradients[index % 3] }} />
      <div
        className="pointer-events-none absolute -top-10 -right-8 h-36 w-36 rounded-full opacity-30 blur-3xl"
        style={{ background: "#3b8cff" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 h-full w-[3px] bg-[var(--accent)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-white">
            {years}
          </span>
          {item.status === "ongoing" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(59,140,255,0.4)] bg-[rgba(59,140,255,0.12)] px-2.5 py-1 text-[11px] font-medium text-[var(--accent-bright)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-bright)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-bright)]" />
              </span>
              In Progress
            </span>
          )}
        </div>

        <h3
          className="text-[20px] leading-[1.15] font-normal tracking-[-0.01em] text-white uppercase sm:text-[22px]"
          style={{ fontFamily: "var(--font-about-display), Impact, sans-serif" }}
        >
          {item.degree}
        </h3>

        <p
          className="mt-2 text-[13px] font-medium text-white/75"
          style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
        >
          {item.institution}
        </p>
        <p
          className="mt-0.5 text-[12px] text-[var(--muted)]"
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
        >
          {item.location}
        </p>

        <p
          className="mt-3 flex-1 text-[13px] leading-[1.55] text-[var(--body-gray)]"
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
        >
          {item.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <span
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] font-semibold text-white"
            style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
          >
            {item.grade}
          </span>
          <div className="flex flex-wrap justify-end gap-1.5">
            {item.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/70"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
