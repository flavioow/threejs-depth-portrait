export type HeroParallaxConfig = {
  pointerRange: number
  motionDamping: number
  cameraPositionStrength: number
  cameraRotationStrength: number
  uvParallaxStrength: number
  vertexDepthStrength: number
  normalStrength: number
  specularStrength: number
  fresnelStrength: number
  depthPower: number
}

export const DEFAULT_HERO_PARALLAX_CONFIG: HeroParallaxConfig = {
  pointerRange: 0.24,
  motionDamping: 12,
  cameraPositionStrength: 0.12,
  cameraRotationStrength: 0.02,
  uvParallaxStrength: 0.07,
  vertexDepthStrength: 0.05,
  normalStrength: 0.5,
  specularStrength: 0.03,
  fresnelStrength: 0.03,
  depthPower: 1.71,
}

export const HERO_IMAGE_PLANE_SIZE = {
  width: 1.0,
  height: 1.0,
}

export const HERO_IMAGE_PLANE_SEGMENTS = 192
