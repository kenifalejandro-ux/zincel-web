/**client/src/components/global/ModelViewer.tsx */

"use client";

import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { Component, Suspense, useEffect, useMemo, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { resolveModelUrl } from "../ui/OptimizedModel";

interface ModelProps {
  url: string;
  scale?: number;
}

function Model({ url, scale = 0.75 }: ModelProps) {
  const { invalidate } = useThree();

  const gltf = useLoader(GLTFLoader, url, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);
    loader.setMeshoptDecoder(MeshoptDecoder);
  });

  useEffect(() => {
    invalidate();
  }, [gltf, invalidate]);

  return (
    <Center>
      <primitive object={gltf.scene} scale={scale} />
    </Center>
  );
}

function LockedOrbitControls({ autoRotate }: { autoRotate: boolean }) {
  const { camera } = useThree();
  const distance = camera.position.length();

  return (
    <OrbitControls
      makeDefault
      autoRotate={autoRotate}
      autoRotateSpeed={0.4}
      enableZoom={false}
      enablePan={false}
      enableRotate
      minDistance={distance}
      maxDistance={distance}
      dampingFactor={0.08}
      rotateSpeed={0.6}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 2}
    />
  );
}

interface ModelViewerProps {
  modelPath: string; // "Silla/modelo-principal"
  className?: string;
  autoRotate?: boolean;
  modelScale?: number;
}

class ModelErrorBoundary extends Component<{ children: React.ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("ModelViewer error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-white/5 text-sm text-zinc-800/70">
          No se pudo cargar el modelo 3D
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ModelViewer({
  modelPath,
  className = "",
  autoRotate = false,
  modelScale = 0.75,
}: ModelViewerProps) {
  const [isMobile, setIsMobile] = useState(false);

  const resolvedModelUrl = useMemo(() => {
    return resolveModelUrl({ src: modelPath });
  }, [modelPath]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-2xl ${className}`}>
      <ModelErrorBoundary>
        <Canvas
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          camera={{ position: [7, 1, 5], fov: 30 }}
          frameloop={autoRotate ? "always" : "demand"}
          gl={{ alpha: true, antialias: !isMobile }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, 3, -5]} intensity={1} />

            <Model url={resolvedModelUrl} scale={modelScale} />
            <LockedOrbitControls autoRotate={autoRotate} />
          </Suspense>
        </Canvas>
      </ModelErrorBoundary>
    </div>
  );
}
