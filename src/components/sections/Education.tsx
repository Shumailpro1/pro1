"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { education, certifications } from "@/data/education";
import EducationCard from "@/components/ui/EducationCard";
import LazyThreeBackdrop from "@/components/three/LazyThreeBackdrop";
import { easeOut } from "@/lib/motion";

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="education"
      ref={ref}
      className="relative w-full scroll-mt-6 overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
    >
      <LazyThreeBackdrop opacity={0.38} />
      {/* Soft navy atmosphere — same family as hero/skills */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-[10%] left-[-8%] h-64 w-64 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(15,76,138,0.45) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[-6%] bottom-[5%] h-72 w-72 rounded-full opacity-30 blur-3xl"
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
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.45, ease: easeOut }}
          >
            My Journey
          </motion.p>
          <motion.h2
            className="text-[28px] leading-none font-normal tracking-[-0.02em] text-white uppercase sm:text-[36px] lg:text-[40px]"
            style={{ fontFamily: "var(--font-about-display), Impact, sans-serif" }}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.08, duration: 0.55, ease: easeOut }}
          >
            Education
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {education.map((item, index) => (
            <EducationCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-10 sm:mt-12"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <h3
            className="mb-4 text-[18px] font-normal tracking-[-0.01em] text-white uppercase sm:text-[20px]"
            style={{ fontFamily: "var(--font-about-display), Impact, sans-serif" }}
          >
            Certifications
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {certifications.map((cert, i) => (
              <motion.article
                key={cert.id}
                className="rounded-[16px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                style={{
                  backgroundImage:
                    "linear-gradient(145deg, rgba(15,76,138,0.35) 0%, rgba(10,18,48,0.85) 100%)",
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: easeOut }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -4,
                        borderColor: "rgba(59,140,255,0.45)",
                        transition: { duration: 0.25 },
                      }
                }
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-[11px] font-semibold text-white">
                    {cert.year}
                  </span>
                  <span
                    className="text-[12px] text-[var(--muted)]"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                  >
                    {cert.issuer}
                  </span>
                </div>
                <h4
                  className="text-[15px] font-semibold text-white"
                  style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
                >
                  {cert.title}
                </h4>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
