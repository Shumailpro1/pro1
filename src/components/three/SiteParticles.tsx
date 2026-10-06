"use client";

import dynamic from "next/dynamic";

const NavyScene = dynamic(() => import("@/components/three/NavyScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Fixed full-page Three.js particle field behind the portfolio.
 */
export default function SiteParticles() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.42]"
      aria-hidden="true"
    >
      <NavyScene />
    </div>
  );
}
