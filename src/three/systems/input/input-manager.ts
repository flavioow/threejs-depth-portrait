import {
  createGyroInput,
  updateGyroInputFromEvent,
} from "./gyro-input"

import {
  createPointerInput,
  updatePointerInputFromEvent,
  deactivatePointerInput,
} from "./pointer-input"

import type { InputState } from "./input-state"

export type InputManager = {
  state: InputState
  destroy: () => void
}

function shouldUseGyroscope() {
  const coarsePointer = window.matchMedia(
    "(pointer: coarse)",
  ).matches

  const supportsGyro =
    typeof DeviceOrientationEvent !==
    "undefined"

  return (
    coarsePointer &&
    supportsGyro
  )
}

export async function createInputManager(
  container: HTMLElement,
): Promise<InputManager> {
  // desktop
  if (!shouldUseGyroscope()) {
    const state = createPointerInput()

    const onPointerMove = (
      event: PointerEvent,
    ) => {
      updatePointerInputFromEvent(
        state,
        event,
        container.getBoundingClientRect(),
      )
    }

    const onPointerLeave = () => {
      deactivatePointerInput(state)
    }

    container.addEventListener(
      "pointermove",
      onPointerMove,
    )

    container.addEventListener(
      "pointerleave",
      onPointerLeave,
    )

    return {
      state,

      destroy() {
        container.removeEventListener(
          "pointermove",
          onPointerMove,
        )

        container.removeEventListener(
          "pointerleave",
          onPointerLeave,
        )
      },
    }
  }

  // mobile gyro
  const state = createGyroInput()

  // iOS permission
  if (
    typeof DeviceOrientationEvent !==
    "undefined" &&
    "requestPermission" in
    DeviceOrientationEvent
  ) {
    try {
      const response = await (
        DeviceOrientationEvent as typeof DeviceOrientationEvent & {
          requestPermission(): Promise<string>
        }
      ).requestPermission()

      if (response !== "granted") {
        return {
          state,
          destroy() { },
        }
      }
    } catch {
      return {
        state,
        destroy() { },
      }
    }
  }

  const onOrientation = (
    event: DeviceOrientationEvent,
  ) => {
    updateGyroInputFromEvent(
      state,
      event,
    )
  }

  window.addEventListener(
    "deviceorientation",
    onOrientation,
  )

  return {
    state,

    destroy() {
      window.removeEventListener(
        "deviceorientation",
        onOrientation,
      )
    },
  }
}
