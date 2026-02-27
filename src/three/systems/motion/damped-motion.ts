/* Objetivo: separar target (alvo) de current (local atual) e criar atraso físico
  - Esse sistema NÃO sabe: de mouse, React, câmera, Three.js
  - Ele só sabe: números, tempo, movimento com inércia
*/

import type { Vector2D } from "@/three/types/vector"

type DampedMotionState = {
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

// A ideia é atualizar o current em direção a target suavemente

export function updateDampedMotion(state: DampedMotionState) {
  state.current.xPosition += (state.target.xPosition - state.current.xPosition) * state.damping
  state.current.yPosition += (state.target.yPosition - state.current.yPosition) * state.damping
}
