"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER = 300;

/**
 * Floating scroll-to-top control — appears after 300px scroll.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollTop}
          aria-label="Back to top"
          className="fixed right-5 bottom-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-[0_8px_24px_rgba(59,140,255,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-bright)] sm:right-7 sm:bottom-7"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25 }}
          whileHover={
            reduceMotion
              ? undefined
              : { y: -4, scale: 1.08, boxShadow: "0 12px 28px rgba(59,140,255,0.55)" }
          }
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        >
          <ArrowUp size={18} strokeWidth={2.4} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
