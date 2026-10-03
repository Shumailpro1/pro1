"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { footerData } from "@/data/footer";
import SocialLink from "@/components/ui/SocialLink";
import BackToTop from "@/components/ui/BackToTop";

const easeOut = [0.22, 1, 0.36, 1] as const;

const columnVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.1, duration: 0.55, ease: easeOut },
  }),
};

function scrollToHash(href: string, reduceMotion: boolean | null) {
  if (!href.startsWith("#")) return;
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const reduceMotion = useReducedMotion();
  const year = new Date().getFullYear();
  const data = footerData;

  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [formMsg, setFormMsg] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState<string | null>(null);

  const onContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !message) {
      setFormMsg("Please fill in all fields.");
      return;
    }
    if (!validEmail) {
      setFormMsg("Please enter a valid email.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;
    setFormMsg("Opening your email app…");
    setForm({ name: "", email: "", message: "" });
  };

  const onNewsletter = (e: FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim());
    if (!valid) {
      setNewsletterMsg("Please enter a valid email.");
      return;
    }
    setNewsletterMsg("Thanks — you're on the list.");
    setNewsletterEmail("");
  };

  return (
    <>
      <footer
        id="contact"
        ref={ref}
        className="relative w-full overflow-hidden scroll-mt-6"
      >
        {/* Atmosphere — navy theme matching site */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,18,48,0) 0%, rgba(8,14,36,0.75) 24%, #060b1c 100%)",
            }}
          />
          <div
            className="absolute top-0 left-0 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(59,155,255,0.55), transparent)",
            }}
          />
          <div
            className="absolute top-[-10%] left-[8%] h-[300px] w-[300px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(59,140,255,0.28) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute right-[-8%] bottom-[-12%] h-[360px] w-[360px] rounded-full opacity-35 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(26,21,80,0.65) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse 80% 70% at 50% 40%, black 15%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-4 pt-16 pb-10 sm:px-6 sm:pt-20 sm:pb-12 lg:px-10">
          {/* Contact form — replaces CTA banner */}
          <motion.div
            className="mb-12 overflow-hidden rounded-[22px] border border-white/10 px-6 py-8 sm:mb-14 sm:px-10 sm:py-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,76,138,0.35) 0%, rgba(10,18,48,0.85) 48%, rgba(26,21,80,0.45) 100%)",
            }}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: easeOut }}
          >
            <div className="mb-6 max-w-[520px]">
              <p
                className="mb-2 text-[11px] font-semibold tracking-[0.22em] text-[var(--accent-bright)] uppercase"
                style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
              >
                Contact
              </p>
              <h2
                className="text-[28px] leading-[1] font-normal tracking-[-0.02em] text-white uppercase sm:text-[36px]"
                style={{
                  fontFamily: "var(--font-about-display), Impact, sans-serif",
                }}
              >
                Send a message
              </h2>
              <p
                className="mt-3 text-[14px] leading-[1.65] text-[var(--body-gray)]"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              >
                {data.ctaText}
              </p>
            </div>

            <form
              onSubmit={onContactSubmit}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
              noValidate
            >
              <div>
                <label
                  htmlFor="footer-name"
                  className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase"
                  style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
                >
                  Name
                </label>
                <input
                  id="footer-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, name: e.target.value }));
                    setFormMsg(null);
                  }}
                  placeholder="Your name"
                  className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-white placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--accent-bright)]"
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                />
              </div>
              <div>
                <label
                  htmlFor="footer-email"
                  className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase"
                  style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
                >
                  Email
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, email: e.target.value }));
                    setFormMsg(null);
                  }}
                  placeholder="you@email.com"
                  className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-white placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--accent-bright)]"
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="footer-message"
                  className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase"
                  style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
                >
                  Message
                </label>
                <textarea
                  id="footer-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, message: e.target.value }));
                    setFormMsg(null);
                  }}
                  placeholder="Tell me about your project…"
                  className="w-full resize-none rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-[13px] text-white placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--accent-bright)]"
                  style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                />
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
                <motion.button
                  type="submit"
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-bright)]"
                  style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 1.04,
                          y: -2,
                          boxShadow: "0 12px 30px rgba(59,140,255,0.55)",
                        }
                  }
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                >
                  Send message
                  <ArrowRight size={18} aria-hidden="true" />
                </motion.button>
                {formMsg && (
                  <p
                    className="text-[13px] text-[var(--accent-bright)]"
                    role="status"
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    }}
                  >
                    {formMsg}
                  </p>
                )}
              </div>
            </form>
          </motion.div>

          {/* Main grid */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Brand */}
            <motion.div
              custom={0}
              variants={columnVariants}
              initial={reduceMotion ? false : "hidden"}
              animate={inView ? "visible" : undefined}
            >
              <h3
                className="text-[22px] leading-none font-normal tracking-[-0.02em] uppercase"
                style={{
                  fontFamily: "var(--font-about-display), Impact, sans-serif",
                }}
              >
                <span className="text-white">Shumail</span>{" "}
                <span className="text-[var(--accent-bright)]">Rizwan</span>
              </h3>
              <p
                className="mt-3 text-[13px] leading-[1.6] text-[var(--body-gray)]"
                style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
              >
                {data.tagline}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {data.socials.map((social) => (
                  <SocialLink
                    key={social.label}
                    label={social.label}
                    url={social.url}
                    icon={social.icon}
                  />
                ))}
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div
              custom={1}
              variants={columnVariants}
              initial={reduceMotion ? false : "hidden"}
              animate={inView ? "visible" : undefined}
            >
              <h4
                className="mb-4 text-[11px] font-semibold tracking-[0.22em] text-[var(--accent-bright)] uppercase"
                style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
              >
                Quick Links
              </h4>
              <nav aria-label="Footer quick links">
                <ul className="flex flex-col gap-2.5">
                  {data.quickLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToHash(link.href, reduceMotion);
                        }}
                        className="group relative inline-block text-[14px] text-[var(--body-gray)] transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-bright)]"
                        style={{
                          fontFamily: "var(--font-poppins), system-ui, sans-serif",
                        }}
                      >
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent-bright)] transition-transform duration-300 group-hover:scale-x-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>

            {/* Services */}
            <motion.div
              custom={2}
              variants={columnVariants}
              initial={reduceMotion ? false : "hidden"}
              animate={inView ? "visible" : undefined}
            >
              <h4
                className="mb-4 text-[11px] font-semibold tracking-[0.22em] text-[var(--accent-bright)] uppercase"
                style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
              >
                Services
              </h4>
              <ul className="flex flex-col gap-2.5">
                {data.services.map((service) => (
                  <li
                    key={service}
                    className="text-[14px] text-[var(--body-gray)]"
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    }}
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact + newsletter */}
            <motion.div
              custom={3}
              variants={columnVariants}
              initial={reduceMotion ? false : "hidden"}
              animate={inView ? "visible" : undefined}
            >
              <h4
                className="mb-4 text-[11px] font-semibold tracking-[0.22em] text-[var(--accent-bright)] uppercase"
                style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
              >
                Contact
              </h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href={`mailto:${data.email}`}
                    className="inline-flex items-center gap-2.5 text-[14px] text-[var(--body-gray)] transition-colors hover:text-[var(--accent-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-bright)]"
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    }}
                  >
                    <Mail size={16} className="shrink-0 text-[var(--accent-bright)]" aria-hidden="true" />
                    {data.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${data.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2.5 text-[14px] text-[var(--body-gray)] transition-colors hover:text-[var(--accent-bright)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-bright)]"
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    }}
                  >
                    <Phone size={16} className="shrink-0 text-[var(--accent-bright)]" aria-hidden="true" />
                    {data.phone}
                  </a>
                </li>
                <li className="inline-flex items-start gap-2.5 text-[14px] text-[var(--body-gray)]">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-[var(--accent-bright)]"
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    }}
                  >
                    {data.location}
                  </span>
                </li>
              </ul>

              <form onSubmit={onNewsletter} className="mt-6" noValidate>
                <label
                  htmlFor="footer-newsletter"
                  className="mb-2 block text-[11px] font-semibold tracking-[0.18em] text-[var(--muted)] uppercase"
                  style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
                >
                  Newsletter
                </label>
                <div className="flex gap-2">
                  <input
                    id="footer-newsletter"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      setNewsletterMsg(null);
                    }}
                    placeholder="you@email.com"
                    className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[13px] text-white placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent-bright)]"
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    }}
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-[var(--accent)] px-3.5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-[var(--accent-deep)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-bright)]"
                    style={{
                      fontFamily: "var(--font-poppins), system-ui, sans-serif",
                    }}
                  >
                    Join
                  </button>
                </div>
                {newsletterMsg && (
                  <p
                    className="mt-2 text-[12px] text-[var(--accent-bright)]"
                    role="status"
                    style={{
                      fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                    }}
                  >
                    {newsletterMsg}
                  </p>
                )}
              </form>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-12 h-px w-full sm:mt-14"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(59,155,255,0.45), transparent)",
            }}
            aria-hidden="true"
          />

          <motion.div
            className="mt-6 flex justify-center"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ delay: 0.5, duration: 0.45 }}
          >
            <p
              className="text-center text-[12px] text-[var(--muted)]"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              © {year} {data.name}. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}
