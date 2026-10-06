"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Mesh, Points as PointsType } from "three";
import { useReducedMotion } from "framer-motion";

function FloatingParticles({ count = 900 }: { count?: number }) {
  const ref = useRef<PointsType>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.035;
    ref.current.rotation.x += delta * 0.012;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b9bff"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

function GlowOrbs() {
  const a = useRef<Mesh>(null);
  const b = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (a.current) {
      a.current.position.x = Math.sin(t * 0.25) * 2.2;
      a.current.position.y = Math.cos(t * 0.2) * 1.4;
    }
    if (b.current) {
      b.current.position.x = Math.cos(t * 0.18) * -2.4;
      b.current.position.y = Math.sin(t * 0.22) * 1.6;
    }
  });

  return (
    <>
      <mesh ref={a} position={[-2, 1, -2]}>
        <sphereGeometry args={[1.1, 24, 24]} />
        <meshBasicMaterial color="#0f4c8a" transparent opacity={0.22} />
      </mesh>
      <mesh ref={b} position={[2.2, -0.8, -2.5]}>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshBasicMaterial color="#1a1550" transparent opacity={0.28} />
      </mesh>
    </>
  );
}

function Scene({ animated }: { animated: boolean }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <FloatingParticles count={animated ? 1100 : 350} />
      {animated ? <GlowOrbs /> : null}
    </>
  );
}

type NavySceneProps = {
  className?: string;
};

/**
 * Navy-themed Three.js particle field for section / page backdrops.
 */
export default function NavyScene({ className = "" }: NavySceneProps) {
  const reduceMotion = useReducedMotion();
  const animated = !reduceMotion;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene animated={!!animated} />
      </Canvas>
    </div>
  );
}
