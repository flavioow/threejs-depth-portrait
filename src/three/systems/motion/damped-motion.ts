/* Objetivo: separar target (alvo) de current (local atual) e criar atraso físico
  - Esse sistema NÃO sabe: de mouse, React, câmera, Three.js
  - Ele só sabe: números, tempo, movimento com inércia
*/

import type { Vector2D } from "@/three/types/vector"

export type DampedMotionState = {
  current: Vector2D
  target: Vector2D
  damping: number
}

/* DAMPING É AMORTECIMENTO:
  - valor pequeno -> movimento pesado e lento
  - valor maior -> movimento leve e rápido
*/

export function createDampedMotion(damping: number): DampedMotionState {
  return {
    current: { xPosition: 0, yPosition: 0 },
    target: { xPosition: 0, yPosition: 0 },
    damping,
  }
}

// A ideia é atualizar o current em direção a target suavemente,
// independente do frame rate.

export function updateDampedMotion(state: DampedMotionState, delta: number) {
  const t = 1 - Math.exp(-state.damping * delta)

  state.current.xPosition +=
    (state.target.xPosition - state.current.xPosition) * t
  state.current.yPosition +=
    (state.target.yPosition - state.current.yPosition) * t
}
