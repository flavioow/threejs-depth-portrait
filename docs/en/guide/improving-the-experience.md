# Improving The Experience

At this point, the effect can render and react to input. The next step is to make it feel better.

The experience improves through motion smoothing, loading states and small responsive adjustments.

## Smooth The Motion

Raw input changes too quickly. If the shader used raw cursor or gyro values directly, the effect would feel nervous.

`damped-motion.ts` creates a small motion system with two values:

- `target`: where the input wants the motion to go.
- `current`: where the scene currently is.

Each frame, `current` moves toward `target` using damping. This creates a more natural delay and makes the portrait feel less mechanical.

## Update Motion In The Scene

`SceneRoot` owns the damped motion state.

Inside `useFrame`, it:

- Reads the latest input state.
- Sets the motion target.
- Returns to center when input is inactive.
- Updates the damped motion.

`CameraController` and `ImagePlane` both use the smoothed value, which keeps camera motion and shader motion in sync.

## Add Loading State

The scene depends on texture loading, and the page depends on browser readiness. The loader should wait for both.

The loading system is split into:

- `use-loading-store`: shared readiness state.
- `SceneReadiness`: listens to React Three Fiber/Drei loading progress.
- `usePageReadiness`: marks the page as ready after the browser load event.
- `LoaderOverlay`: displays and exits the loading layer.
- `CountUp`: animates the visible percentage.

This keeps the first impression controlled instead of showing a half-loaded scene.

## Add Responsive Adjustment

`useBreakpoint` helps adjust the portrait position and scale by viewport size.

The current project uses it inside `ImagePlane` to move the portrait slightly on mobile and keep the framing pleasant across screen sizes.

## Checkpoint

Before moving on, the page should:

- Start with a loading overlay.
- Wait for scene and page readiness.
- Reveal the hero smoothly.
- Move with damped, natural motion.
- Keep the portrait framed on desktop and mobile.

Next: [Finishing](finishing.md)
