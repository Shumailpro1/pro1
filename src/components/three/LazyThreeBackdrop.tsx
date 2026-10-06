"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const NavyScene = dynamic(() => import("@/components/three/NavyScene"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  opacity?: number;
  className?: string;
};

/**
 * Three.js backdrop that mounts only while the parent section is near the viewport.
 */
export default function LazyThreeBackdrop({
  opacity = 0.45,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {active ? <NavyScene /> : null}
    </div>
  );
}
