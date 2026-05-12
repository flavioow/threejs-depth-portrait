/* Objetivo: normalizar movimento do pointer para valores entre -1 e 1 */

export type PointerInputState = {
  xPosition: number
  yPosition: number
  active: boolean
}

const DEADZONE = 0.015

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function applyDeadzone(value: number) {
  return Math.abs(value) < DEADZONE ? 0 : value
}

export function createPointerInput(): PointerInputState {
  return {
    xPosition: 0,
    yPosition: 0,
    active: false,
  }
}

export function updatePointerInputFromEvent(
  state: PointerInputState,
  event: PointerEvent,
  bounds: DOMRect,
) {
  // Convertemos px em uma faixa dentro de bounds (area ativa como o hero)
  const relativeXPosition = clamp(
    (event.clientX - bounds.left) / bounds.width,
    0,
    1,
  )
  const relativeYPosition = clamp(
    (event.clientY - bounds.top) / bounds.height,
    0,
    1,
  )

  // Normalização de -1 até 1. No eixo Y, topo positivo.
  state.xPosition = applyDeadzone(relativeXPosition * 2 - 1)
  state.yPosition = applyDeadzone(1 - relativeYPosition * 2)

  state.active = true
}

// Quando o pointer sai da área, não zeramos rapidamente, só inativamos
export function deactivatePointerInput(state: PointerInputState) {
  state.active = false
}
