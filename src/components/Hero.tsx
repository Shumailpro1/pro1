"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui";
import LazyThreeBackdrop from "@/components/three/LazyThreeBackdrop";
import { easeOut } from "@/lib/motion";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Project", href: "#portfolio" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
];
const DESIGN_W = 1280;
const DESIGN_H = 800;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.65, ease: easeOut },
  }),
};

const navContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.35 },
  },
};

const navItem = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

function TypewriterName({ text, startDelay = 1000 }: { text: string; startDelay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
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
      }, 120);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, startDelay]);

  return (
    <span className="heading-accent inline-flex items-baseline">
      <span>{displayed}</span>
      <motion.span
        className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] rounded-sm bg-[var(--accent-deep)]"
        animate={{ opacity: done ? [1, 0, 1] : [1, 0] }}
        transition={{
          duration: done ? 1 : 0.5,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
      />
    </span>
  );
}

function LogoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C9.5 6 7 8.5 7 12.5C7 16.5 9.5 19.5 12 22C14.5 19.5 17 16.5 17 12.5C17 8.5 14.5 6 12 2Z"
        fill="url(#leafGrad)"
      />
      <path
        d="M12 6C11 9 10.2 11 10.2 13.2C10.2 15.4 11 17 12 18.5"
        stroke="#0a1230"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="leafGrad" x1="7" y1="2" x2="17" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5eb0ff" />
          <stop offset="1" stopColor="#1a4a8a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Pyramid3D() {
  return (
    <svg width="56" height="56" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="pyrFace" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8fd3ff" />
          <stop offset="0.55" stopColor="#4aa8f0" />
          <stop offset="1" stopColor="#2a7fe0" />
        </linearGradient>
        <linearGradient id="pyrSide" x1="32" y1="4" x2="58" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6ec0ff" />
          <stop offset="1" stopColor="#1f5fc0" />
        </linearGradient>
        <linearGradient id="pyrShine" x1="18" y1="10" x2="30" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="32,6 8,52 32,44" fill="url(#pyrFace)" />
      <polygon points="32,6 56,52 32,44" fill="url(#pyrSide)" />
      <polygon points="8,52 32,44 56,52 32,58" fill="#1a5cb0" opacity="0.85" />
      <polygon points="22,16 28,40 18,42" fill="url(#pyrShine)" />
    </svg>
  );
}

function Spiral3D() {
  return (
    <svg width="72" height="72" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="coilGrad" x1="10" y1="10" x2="70" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7fd0ff" />
          <stop offset="0.5" stopColor="#3a8fe8" />
          <stop offset="1" stopColor="#1f6fe0" />
        </linearGradient>
        <linearGradient id="coilHighlight" x1="20" y1="15" x2="50" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M40 12 C58 12 68 24 68 36 C68 50 54 58 40 58 C28 58 20 50 20 40 C20 32 26 26 34 26 C40 26 44 30 44 36 C44 41 40 44 36 44"
        stroke="url(#coilGrad)"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M40 12 C55 12 64 23 64 35 C64 47 52 55 40 55"
        stroke="url(#coilHighlight)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="36" cy="44" rx="4" ry="3" fill="#a8e0ff" opacity="0.9" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MouseIcon() {
  return (
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="12" height="18" rx="6" stroke="#aab3c5" strokeWidth="1.2" />
      <motion.circle
        cx="7"
        cy="6"
        r="1.4"
        fill="#aab3c5"
        animate={{ y: [0, 4, 0], opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function Hero() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const updateScale = () => {
      // Desktop scale-to-fit only (lg+)
      if (window.innerWidth < 1024) return;
      const s = Math.max(window.innerWidth / DESIGN_W, 0.01);
      setScale(s);
      setOffset({ x: 0, y: 0 });
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    window.addEventListener("orientationchange", updateScale);
    return () => {
      window.removeEventListener("resize", updateScale);
      window.removeEventListener("orientationchange", updateScale);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", href);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ——— Mobile / tablet fluid hero ——— */}
      <section
        className="relative overflow-hidden lg:hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 12% 8%, #0f4c8a 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 85% 90%, #1a1550 0%, transparent 50%),
            linear-gradient(145deg, #0c2a5a 0%, #0a1230 45%, #0d1538 75%, #1a1550 100%)
          `,
        }}
      >
        <LazyThreeBackdrop opacity={0.55} />
        <header className="relative z-30 flex items-center justify-between px-4 pt-5 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <LogoIcon />
            <span
              className="text-[18px] font-semibold tracking-[-0.01em] text-white sm:text-[20px]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Shumail Rizwan
            </span>
          </a>
          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </header>

        {/* Side drawer — overlays content, does not push the picture */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.button
                type="button"
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden"
                aria-label="Close menu overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMenuOpen(false)}
              />
              <motion.nav
                className="fixed top-0 right-0 z-50 flex h-dvh w-[min(78vw,300px)] flex-col border-l border-white/10 bg-[rgba(10,18,48,0.97)] px-5 pt-6 pb-8 shadow-[-12px_0_40px_rgba(0,0,0,0.45)] backdrop-blur-md lg:hidden"
                aria-label="Mobile"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
              >
                <div className="mb-8 flex items-center justify-between">
                  <span
                    className="text-[12px] font-semibold tracking-[0.2em] text-[var(--accent-bright)] uppercase"
                    style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
                  >
                    Menu
                  </span>
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
                    aria-label="Close menu"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  {navLinks.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="rounded-xl px-3 py-3 text-[15px] font-medium text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-white"
                      style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(href);
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col items-center px-4 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-14">
          <motion.div
            className="frame-glow relative mb-8 h-[240px] w-[160px] overflow-hidden rounded-full sm:h-[280px] sm:w-[185px]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <Image
              src="/assets/profile-window.jpg"
              alt="Shumail Rizwan"
              fill
              priority
              className="object-cover object-[center_8%]"
              sizes="185px"
            />
          </motion.div>

          <motion.p
            className="welcome-line mb-2 text-center text-[16px] font-medium italic tracking-[0.04em]"
            style={{
              fontFamily: "var(--font-welcome)",
              color: "var(--accent-bright)",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Welcome to my portfolio!
          </motion.p>

          <motion.h1
            className="mb-0 text-center text-[34px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[42px]"
            style={{ fontFamily: "var(--font-heading)" }}
            aria-label="Hello, my name's Shumail"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55 }}
          >
            <span className="heading-gradient">Hello, my</span>
            <br />
            <span className="heading-gradient">name&apos;s </span>
            <TypewriterName text="Shumail" startDelay={600} />
          </motion.h1>

          <motion.p
            className="mt-4 max-w-[340px] text-center text-[14px] leading-[1.65] text-[var(--body-gray)] sm:text-[15px]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            I&apos;m a visual designer from Gujranwala, Pakistan. Currently
            working with{" "}
            <strong className="font-semibold text-white">@Ideo</strong> as a UI
            Consultant.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <Button href="#cv" variant="primary">
              Download cv
            </Button>
            <Button href="#portfolio" variant="outline" showArrow>
              See my work
            </Button>
          </motion.div>

          <div className="mt-8 flex items-center gap-3">
            {[
              { href: "https://www.facebook.com/share/1JC6A7g4MA/", label: "Facebook", color: "var(--facebook)", Icon: FacebookIcon },
              { href: "https://www.instagram.com/shumail_butt123", label: "Instagram", color: "var(--instagram)", Icon: InstagramIcon },
              { href: "https://linkedin.com", label: "LinkedIn", color: "var(--linkedin)", Icon: LinkedInIcon },
            ].map(({ href, label, color, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
                style={{ color }}
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Desktop scaled hero ——— */}
      <section className="hero-scale-shell hidden lg:block">
      <div
        className="hero-scale-fit"
        style={{
          width: DESIGN_W * scale,
          height: DESIGN_H * scale,
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="hero-scale-stage hero-card relative overflow-hidden"
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            background: `
              radial-gradient(ellipse 80% 70% at 12% 8%, #0f4c8a 0%, transparent 55%),
              radial-gradient(ellipse 60% 50% at 85% 90%, #1a1550 0%, transparent 50%),
              linear-gradient(145deg, #0c2a5a 0%, #0a1230 45%, #0d1538 75%, #1a1550 100%)
            `,
          }}
        >
        <LazyThreeBackdrop opacity={0.55} />
        <motion.div
          className="pointer-events-none absolute -left-24 -top-24 z-0 h-72 w-72 rounded-full bg-[#3b8cff]/20 blur-3xl"
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute -bottom-20 -right-16 z-0 h-64 w-64 rounded-full bg-[#6b5cff]/15 blur-3xl"
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(5,10,30,0.35) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Navbar — same on every device */}
        <header className="relative z-20 mx-auto flex w-full max-w-[1200px] items-center justify-between px-12 pt-8">
          <motion.a
            href="#top"
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              whileHover={{ rotate: [-8, 8, 0], scale: 1.12 }}
              transition={{ duration: 0.45 }}
              className="inline-flex"
            >
              <LogoIcon />
            </motion.span>
            <span
              className="text-[26px] font-semibold tracking-[-0.01em] text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Shumail Rizwan
            </span>
          </motion.a>

          <motion.nav
            className="flex items-center gap-[30px]"
            aria-label="Primary"
            variants={navContainer}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map(({ label, href }) => {
              const active = label === "Home";
              return (
                <motion.a
                  key={label}
                  href={href}
                  variants={navItem}
                  className={`nav-link group relative text-[13px] font-medium tracking-[0.02em] ${
                    active ? "text-[var(--nav-active)]" : "text-[var(--muted)]"
                  }`}
                  whileHover={{ y: -2, color: "#3b8cff" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(href);
                  }}
                >
                  {label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px bg-[var(--nav-active)]"
                    initial={{ width: active ? "100%" : "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.a>
              );
            })}
          </motion.nav>
        </header>

        <main className="relative z-10 mx-auto grid h-[calc(100%-5.5rem)] w-full max-w-[1200px] grid-cols-[1fr_auto] items-center gap-16 px-12 pb-8 pt-2">
          <div className="flex max-w-[440px] flex-col justify-center">
            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="welcome-line mb-2.5 text-[18px] font-medium italic tracking-[0.04em]"
              style={{
                fontFamily: "var(--font-welcome)",
                color: "var(--accent-bright)",
              }}
            >
              Welcome to my portfolio!
            </motion.p>

            <motion.h1
              className="mb-0 text-[52px] font-semibold leading-[1.12] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-heading)" }}
              aria-label="Hello, my name's Shumail"
            >
              <span className="inline-flex flex-wrap items-baseline gap-x-[0.28em]">
                {["Hello,", "my"].map((word, i) => (
                  <motion.span
                    key={word}
                    className="heading-gradient inline-block"
                    initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.35 + i * 0.18, duration: 0.55, ease: easeOut }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <br />
              <span className="inline-flex flex-wrap items-baseline gap-x-[0.28em]">
                <motion.span
                  className="heading-gradient inline-block"
                  initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.7, duration: 0.55, ease: easeOut }}
                >
                  name&apos;s
                </motion.span>
                <TypewriterName text="Shumail" startDelay={950} />
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-4 mb-7 max-w-[340px] text-[15px] leading-[1.65]"
              style={{ color: "var(--body-gray)" }}
            >
              I&apos;m a visual designer from London. Currently working with{" "}
              <motion.strong
                className="inline-block font-semibold text-white"
                whileHover={{ color: "#3b9bff", scale: 1.03 }}
              >
                @Ideo
              </motion.strong>{" "}
              as a UI Consultant.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-7 flex flex-wrap items-center gap-3.5"
            >
              <Button href="#cv" variant="primary">
                Download cv
              </Button>
              <Button href="#portfolio" variant="outline" showArrow>
                See my work
              </Button>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex cursor-pointer items-center gap-3"
              whileHover={{ x: 4 }}
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("about")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              <motion.div
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{
                  borderColor: "rgba(59,140,255,0.7)",
                  backgroundColor: "rgba(59,140,255,0.12)",
                  scale: 1.08,
                }}
              >
                <MouseIcon />
              </motion.div>
              <span className="text-[11px] font-medium tracking-[0.04em] text-[var(--muted)]">
                Scroll down
              </span>
            </motion.div>
          </div>

          <div className="relative mr-24 -mt-24 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: [0.5, 0.9, 0.5],
                scale: [1, 1.03, 1],
              }}
              transition={{
                opacity: { delay: 0.35, duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                scale: { delay: 0.35, duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="frame-ring absolute"
              style={{
                width: "calc(100% + 28px)",
                height: "calc(100% + 28px)",
                borderRadius: "9999px",
              }}
              aria-hidden="true"
            />

            <motion.div
              className="absolute -left-8 -top-5 z-20 cursor-pointer"
              animate={{ y: [-8, 8, -8], rotate: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.18, rotate: 12 }}
              aria-hidden="true"
            >
              <Pyramid3D />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.55, duration: 0.9, ease: easeOut }}
              className="frame-glow group relative h-[400px] w-[260px] overflow-hidden rounded-full"
              style={{ borderRadius: "9999px" }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 0 4px #5aa3ff, 0 0 40px 8px rgba(59,140,255,0.75), 0 0 80px 12px rgba(47,111,224,0.35)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.45 }}
              >
                <Image
                  src="/assets/profile-window.jpg"
                  alt="Shumail Rizwan"
                  fill
                  priority
                  className="object-cover object-[center_8%]"
                  sizes="260px"
                />
              </motion.div>
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1230]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-7 z-20 cursor-pointer"
              animate={{ y: [8, -8, 8], rotate: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              whileHover={{ scale: 1.15, rotate: -20 }}
              aria-hidden="true"
            >
              <Spiral3D />
            </motion.div>

            {/* Follow bar — one-icon gutter from portrait, near card edge */}
            <aside className="absolute right-[-3.5rem] top-0 bottom-0 z-20 flex w-10 flex-col items-center justify-center gap-2.5">
              <motion.div
                className="flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.55 }}
              >
                <span
                  className="origin-center whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--muted)]"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  Follow me on
                </span>
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-px bg-gradient-to-b from-[var(--muted)] to-transparent opacity-50"
                    initial={{ height: 0 }}
                    animate={{ height: 28 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  />
                  <svg width="7" height="7" viewBox="0 0 8 8" className="-mt-0.5 opacity-50" aria-hidden="true">
                    <path d="M4 8L0 4h8L4 8z" fill="#aab3c5" />
                  </svg>
                </div>
              </motion.div>

              <div className="mt-0.5 flex flex-col items-center gap-3">
                {[
                  { href: "https://www.facebook.com/share/1JC6A7g4MA/", label: "Facebook", color: "var(--facebook)", Icon: FacebookIcon },
                  { href: "https://www.instagram.com/shumail_butt123", label: "Instagram", color: "var(--instagram)", Icon: InstagramIcon },
                  { href: "https://linkedin.com", label: "LinkedIn", color: "var(--linkedin)", Icon: LinkedInIcon },
                ].map(({ href, label, color, Icon }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon flex h-9 w-9 items-center justify-center rounded-full bg-white/5"
                    style={{ color }}
                    aria-label={label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.12, type: "spring", stiffness: 320 }}
                    whileHover={{
                      scale: 1.22,
                      y: -3,
                      backgroundColor: "rgba(255,255,255,0.12)",
                      boxShadow: `0 6px 16px color-mix(in srgb, ${color} 45%, transparent)`,
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </aside>
          </div>
        </main>

        <motion.a
          href="#top"
          className="scroll-top-btn absolute bottom-6 right-6 z-20 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[var(--accent)] text-white"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{
            y: -4,
            scale: 1.12,
            boxShadow: "0 8px 24px rgba(59,140,255,0.8)",
          }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="currentColor"
            aria-hidden="true"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M6 1L11 8H1L6 1Z" />
          </motion.svg>
        </motion.a>
      </motion.div>
      </div>
    </section>
    </>
  );
}
