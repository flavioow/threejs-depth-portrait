import { useFrame } from "@react-three/fiber"
import { type RefObject, useRef } from "react"
import type { PointerInputState } from "../systems/input/pointer-input"
import {
  createDampedMotion,
  updateDampedMotion,
} from "../systems/motion/damped-motion"
import { CameraController } from "./camera-controller"
import {
  DEFAULT_HERO_PARALLAX_CONFIG,
  type HeroParallaxConfig,
} from "./hero-parallax-config"
import { ImagePlane } from "./image-plane"

type SceneRootProps = {
  config?: HeroParallaxConfig
  pointerRef: RefObject<PointerInputState>
}

export function SceneRoot({
  config = DEFAULT_HERO_PARALLAX_CONFIG,
  pointerRef,
}: SceneRootProps) {
  const motionRef = useRef(createDampedMotion(config.motionDamping))

  useFrame((_, delta) => {
    const pointer = pointerRef.current
    const motion = motionRef.current

    motion.damping = config.motionDamping
    motion.target.xPosition = pointer.active
      ? pointer.xPosition * config.pointerRange
      : 0
    motion.target.yPosition = pointer.active
      ? pointer.yPosition * config.pointerRange
      : 0

    updateDampedMotion(motion, delta)
  }, -2)

  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight
        intensity={0.42}
        position={[0.35, 0.65, 1.2]}
      />
      <CameraController
        config={config}
        motionRef={motionRef}
      />
      <ImagePlane
        config={config}
        motionRef={motionRef}
      />
    </>
  )
}
