"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type IconButtonVariant = "lime" | "primary" | "dark" | "ghost";
type IconButtonSize = "sm" | "md" | "lg";

type IconButtonProps = {
  children?: ReactNode;
  href?: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  ariaLabel?: string;
  className?: string;
  animateArrow?: boolean;
  onClick?: () => void;
} & Omit<HTMLMotionProps<"a">, "children" | "href" | "onClick">;

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-11 w-11",
};

const variantStyles: Record<IconButtonVariant, string> = {
  lime: "bg-[#d9f24a] text-black",
  primary: "bg-[var(--accent)] text-white",
  dark: "bg-black text-white",
  ghost: "border border-white/15 bg-white/5 text-white",
};

function ArrowIcon({ dark = true }: { dark?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"
        stroke={dark ? "black" : "white"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Reusable circular icon button:
 * <IconButton href="#about" variant="lime" ariaLabel="Next" />
 */
export default function IconButton({
  children,
  href = "#",
  variant = "lime",
  size = "md",
  ariaLabel = "Open",
  className = "",
  animateArrow = true,
  onClick,
  ...rest
}: IconButtonProps) {
  const darkArrow = variant === "lime";

  return (
    <motion.a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-full",
        sizeStyles[size],
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.25 }}
      {...rest}
    >
      {children ?? (
        <motion.span
          className="inline-flex"
          animate={animateArrow ? { x: [0, 3, 0] } : undefined}
          transition={
            animateArrow
              ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        >
          <ArrowIcon dark={darkArrow} />
        </motion.span>
      )}
    </motion.a>
  );
}
