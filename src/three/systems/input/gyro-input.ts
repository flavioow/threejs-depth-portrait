/* Objetivo: normalizar movimento do gyro para valores entre -1 e 1 */
import type { InputState } from "./input-state"

const MAX_BETA = 18
const MAX_GAMMA = 18

const DEADZONE = 0.015

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function applyDeadzone(value: number): number {
  return Math.abs(value) < DEADZONE ? 0 : value
}

export function createGyroInput(): InputState {
  return {
    xPosition: 0,
    yPosition: 0,
    active: false,
  }
}

export function updateGyroInputFromEvent(
  state: InputState,
  event: DeviceOrientationEvent,
) {
  if (
    event.beta == null ||
    event.gamma == null
  ) {
    state.active = false
    return
  }

  // gamma:
  // esquerda/direita
  const normalizedX = clamp(
    event.gamma / MAX_GAMMA,
    -1,
    1,
  )

  // beta:
  // frente/trás
  // invertido para manter mesma semântica do pointer
  const normalizedY = clamp(
    -event.beta / MAX_BETA,
    -1,
    1,
  )
  state.xPosition =
    applyDeadzone(normalizedX)

  state.yPosition =
    applyDeadzone(normalizedY)

  state.active = true
}

export function deactivateGyroInput(
  state: InputState,
) {
  state.active = false
}
