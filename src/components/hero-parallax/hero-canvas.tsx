"use client"

import { Canvas } from "@react-three/fiber"
import { type RefObject, Suspense, useEffect, useRef } from "react"
import { NoToneMapping, SRGBColorSpace } from "three"
import { SceneRoot } from "@/three/scene/scene-root"
import {
  createPointerInput,
  deactivatePointerInput,
  type PointerInputState,
  updatePointerInputFromEvent,
} from "@/three/systems/input/pointer-input"
import { useHeroParallaxControls } from "./use-hero-parallax-controls"

type HeroCanvasProps = {
  containerRef: RefObject<HTMLDivElement | null>
}

type HeroSceneProps = {
  pointerRef: RefObject<PointerInputState>
}

function HeroScene({ pointerRef }: HeroSceneProps) {
  const config = useHeroParallaxControls()

  return (
    <SceneRoot
      config={config}
      pointerRef={pointerRef}
    />
  )
}

export function HeroCanvas({ containerRef }: HeroCanvasProps) {
  const pointerRef = useRef(createPointerInput())

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const pointer = pointerRef.current

    const onPointerMove = (event: PointerEvent) => {
      updatePointerInputFromEvent(
        pointer,
        event,
        container.getBoundingClientRect(),
      )
    }
    const onPointerLeave = () => {
      deactivatePointerInput(pointer)
    }

    container.addEventListener("pointermove", onPointerMove)
    container.addEventListener("pointerleave", onPointerLeave)
    container.addEventListener("pointercancel", onPointerLeave)

    return () => {
      container.removeEventListener("pointermove", onPointerMove)
      container.removeEventListener("pointerleave", onPointerLeave)
      container.removeEventListener("pointercancel", onPointerLeave)
    }
  }, [containerRef])

  return (
    <>
      <Canvas
        camera={{ fov: 24, near: 0.1, far: 100, position: [-0.2, 4, 2] }}
        className="h-full w-full"
        dpr={[1, 2]}
        frameloop="always"
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          // premultipliedAlpha: false,
          toneMapping: NoToneMapping,
          outputColorSpace: SRGBColorSpace,
        }}>
        <Suspense fallback={null}>
          <HeroScene pointerRef={pointerRef} />
        </Suspense>
      </Canvas>
    </>
  )
}
