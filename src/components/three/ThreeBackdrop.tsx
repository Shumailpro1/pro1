"use client";

import dynamic from "next/dynamic";

const NavyScene = dynamic(() => import("@/components/three/NavyScene"), {
  ssr: false,
  loading: () => null,
});

type ThreeBackdropProps = {
  className?: string;
  opacity?: number;
};

/**
 * Lazy-loaded Three.js backdrop (no SSR) for any section.
 */
export default function ThreeBackdrop({
  className = "",
  opacity = 0.55,
}: ThreeBackdropProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <NavyScene />
    </div>
  );
}
