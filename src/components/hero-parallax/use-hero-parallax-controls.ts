"use client"

import { useControls } from "leva"

import {
  DEFAULT_HERO_PARALLAX_CONFIG,
  type HeroParallaxConfig,
} from "@/three/scene/hero-parallax-config"

export function useHeroParallaxControls(): HeroParallaxConfig {
  const controls = useControls(
    "Hero 3D",
    {
      pointerRange: {
        value: DEFAULT_HERO_PARALLAX_CONFIG.pointerRange,
        min: 0,
        max: 1,
        step: 0.01,
      },
      motionDamping: {
        value: DEFAULT_HERO_PARALLAX_CONFIG.motionDamping,
        min: 1,
        max: 14,
        step: 0.1,
      },
      cameraPositionStrength: {
        value: DEFAULT_HERO_PARALLAX_CONFIG.cameraPositionStrength,
        min: 0,
        max: 0.18,
        step: 0.001,
      },
      cameraRotationStrength: {
        value: DEFAULT_HERO_PARALLAX_CONFIG.cameraRotationStrength,
        min: 0,
        max: 0.06,
        step: 0.001,
      },
      uvParallaxStrength: {
        value: DEFAULT_HERO_PARALLAX_CONFIG.uvParallaxStrength,
        min: 0,
        max: 0.08,
        step: 0.001,
      },
      vertexDepthStrength: {
        value: DEFAULT_HERO_PARALLAX_CONFIG.vertexDepthStrength,
        min: 0,
        max: 0.09,
        step: 0.001,
      },
      normalStrength: {
        value: DEFAULT_HERO_PARALLAX_CONFIG.normalStrength,
        min: 0,
        max: 1,
        step: 0.01,
      },
      specularStrength: {
        value: DEFAULT_HERO_PARALLAX_CONFIG.specularStrength,
        min: 0,
        max: 0.6,
        step: 0.01,
      },
      fresnelStrength: {
        value: DEFAULT_HERO_PARALLAX_CONFIG.fresnelStrength,
        min: 0,
        max: 0.5,
        step: 0.01,
      },
      depthPower: {
        value: DEFAULT_HERO_PARALLAX_CONFIG.depthPower,
        min: 0.4,
        max: 2.6,
        step: 0.01,
      },
    },
    { collapsed: true },
  )

  if (process.env.NODE_ENV !== "development") {
    return DEFAULT_HERO_PARALLAX_CONFIG
  }

  return controls
}
