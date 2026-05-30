# Adding User Input

The shader needs motion. The input system turns real user movement into a small normalized value that the scene can use.

The project uses one shared shape for all input sources:

```ts
type InputState = {
  xPosition: number
  yPosition: number
  active: boolean
}
```

Both pointer input and gyroscope input write into that same shape.

## Pointer Input

`pointer-input.ts` handles desktop interaction.

Its job is to:

- Listen to pointer movement.
- Read the pointer position relative to the hero bounds.
- Convert pixel coordinates into a `-1` to `1` range.
- Apply a small deadzone.
- Mark the input as active.

When the pointer leaves the hero area, the input becomes inactive so the scene can relax back toward the center.

## Gyroscope Input

`gyro-input.ts` handles mobile device orientation.

Its job is to:

- Read `beta` and `gamma` from `DeviceOrientationEvent`.
- Convert those values into the same `-1` to `1` range.
- Apply a small deadzone.
- Mark the input as active when valid orientation data exists.

This keeps the rest of the scene independent from the input source.

## Input Manager

`input-manager.ts` decides which input source to use.

The current strategy is:

- Use pointer input for desktop-like devices.
- Use gyroscope input for coarse pointer devices when device orientation exists.
- Request permission on browsers that require it.
- Return a `destroy` function to remove event listeners.

The manager receives the hero container so pointer movement can be calculated inside the correct active area.

## Connect Input To The Scene

`HeroCanvas` creates the input manager and stores it in a ref.

`SceneRoot` reads that ref during `useFrame`, takes the current input state and turns it into a target motion value.

The shader does not need to know whether the value came from a mouse or a phone. It only receives motion.

## Checkpoint

Before moving on, moving the cursor or tilting a supported mobile device should update the motion target used by the scene.

Next: [Improving The Experience](improving-the-experience.md)
