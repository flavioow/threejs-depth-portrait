/* Objetivo: conectar o React com o motor gráfico
  aqui entra o Canvas do Three.js via R3F,
  inicialização da cena
  injeção dos sistemas
*/

"use client";

import { useEffect, useRef } from "react";
import {
  NoColorSpace,
  PerspectiveCamera,
  TextureLoader,
  WebGLRenderer,
} from "three";

import { createCameraController } from "@/three/scene/camera-controller";
import { createImagePlane } from "@/three/scene/image-plane";
import { createSceneRoot } from "@/three/scene/scene-root";
import {
  createPointerInput,
  deactivatePointerInput,
  updatePointerInputFromEvent,
} from "@/three/systems/input/pointer-input";
import { createRenderLoop } from "@/three/systems/loop/render-loop";
import {
  createDampedMotion,
  updateDampedMotion,
} from "@/three/systems/motion/damped-motion";

export function HeroCanvas({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const CAMERA_INTENSITY = 0.02; // menor = menos inclinação
  const MOTION_DAMPING = 0.06; // menor = mais lento/suave
  const POINTER_RANGE = 0.7; // menor = menos deslocamento máximo

  // Canvas e engine NÃO devem causar re-render, tudo fica em refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const container = containerRef.current;

    // ========= Renderer =========
    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ========= Camera =========
    const camera = new PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 2;

    // ========= Textures =========
    const loader = new TextureLoader();
    const diffuse = loader.load("/diffuse.webp");
    const depth = loader.load("/depth.webp");
    const normal = loader.load("/normal.png");
    const alpha = loader.load("/alpha.webp");

    depth.colorSpace = NoColorSpace;
    normal.colorSpace = NoColorSpace;
    alpha.colorSpace = NoColorSpace;

    const imagePlane = createImagePlane(
      { diffuse, depth, normal, alpha },
      { width: 1.5, height: 2 },
    );

    const cameraController = createCameraController(camera, CAMERA_INTENSITY);

    const sceneRoot = createSceneRoot({
      camera,
      cameraController,
      imagePlane,
    });

    // ========= Input =========
    const pointer = createPointerInput();

    const onMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const bounds = container.getBoundingClientRect();
      updatePointerInputFromEvent(pointer, e, bounds);
    };

    const onMouseLeave = () => deactivatePointerInput(pointer);

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    // ========= Motion =========
    const motion = createDampedMotion(MOTION_DAMPING);

    // ========= Loop =========
    const loop = createRenderLoop(
      () => {
        if (pointer.active) {
          motion.target.xPosition = pointer.xPosition * POINTER_RANGE;
          motion.target.yPosition = pointer.yPosition * POINTER_RANGE;
        } else {
          motion.target.xPosition = 0;
          motion.target.yPosition = 0;
        }

        updateDampedMotion(motion);
        sceneRoot.update(motion.current);
      },
      () => {
        renderer.render(sceneRoot.scene, camera);
      },
    );

    loop.start();

    const syncSize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth <= 0 || clientHeight <= 0) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    syncSize();

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(container);
    window.addEventListener("resize", syncSize);

    return () => {
      loop.stop();
      renderer.dispose();
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", syncSize);
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
