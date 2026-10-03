"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "lime" | "dark";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
} & Omit<HTMLMotionProps<"a">, "children" | "href" | "onClick">;

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 min-w-[96px] px-4 text-[12px]",
  md: "h-9 min-w-[110px] px-5 text-[13px]",
  lg: "h-11 min-w-[132px] px-6 text-[15px]",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "btn-primary text-white",
  outline: "btn-outline text-white",
  lime: "bg-[#d9f24a] text-black",
  dark: "bg-black text-white",
};

const hoverByVariant: Record<ButtonVariant, HTMLMotionProps<"a">["whileHover"]> = {
  primary: {
    y: -3,
    scale: 1.04,
    boxShadow: "0 10px 28px rgba(59,140,255,0.75)",
  },
  outline: {
    y: -3,
    scale: 1.04,
    borderColor: "rgba(59,140,255,0.9)",
    boxShadow: "0 6px 20px rgba(59,140,255,0.3)",
  },
  lime: {
    y: -3,
    scale: 1.04,
    boxShadow: "0 10px 28px rgba(217,242,74,0.55)",
  },
  dark: {
    y: -3,
    scale: 1.04,
    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
  },
};

/**
 * Reusable pill button — use anywhere:
 * <Button href="#cv" variant="primary">Download cv</Button>
 * <Button href="#about" variant="lime" showArrow>Discover more</Button>
 */
export default function Button({
  children,
  href = "#",
  variant = "primary",
  size = "md",
  showArrow = false,
  className = "",
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={[
        "group inline-flex items-center justify-center gap-1.5 rounded-full font-medium",
        sizeStyles[size],
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
      whileHover={hoverByVariant[variant]}
      whileTap={{ scale: 0.96, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      {...rest}
    >
      {children}
      {showArrow && (
        <motion.span
          className="inline-block leading-none"
          aria-hidden="true"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.span>
      )}
    </motion.a>
  );
}
