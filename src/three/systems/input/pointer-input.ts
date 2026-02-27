/* Objetivo: normalizar movimento do mouse para valores entre -1 e 1 */

type PointerInputState = {
  xPosition: number
  yPosition: number
  active: boolean
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
  event: MouseEvent,
  bounds: DOMRect
) {
  // Convertemos px em uma faixa dentro de bounds (area ativa como o hero)
  const relativeXPosition = (event.clientX - bounds.left) / bounds.width
  const relativeYPosition = (event.clientY - bounds.top) / bounds.height

  // Normalização de -1 até 1
  state.xPosition = relativeXPosition * 2 - 1
  state.yPosition = relativeYPosition * 2 - 1

  state.active = true
}

// Quando o mouse sai da área, não zeramos rapidamente, só inativamos
export function deactivatePointerInput(state: PointerInputState) {
  state.active = false
}
