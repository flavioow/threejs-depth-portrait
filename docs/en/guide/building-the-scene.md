# Building The Scene

Now that the image maps exist, build the scene that will display them.

At this stage, the goal is not to perfect the parallax effect. The goal is to create a clean rendering structure: a page component, a canvas, a scene root, a camera controller and an image plane.

## Scene Responsibilities

The project separates the hero into a few clear layers:

- `Hero3D` defines the active hero area.
- `HeroCanvas` creates the WebGL canvas.
- `SceneRoot` composes the scene.
- `CameraController` moves the camera.
- `ImagePlane` renders the portrait.
- `hero-parallax-config` stores shared tuning values.
- `SceneReadiness` reports loading progress for the scene.

This separation keeps React UI, Three.js scene code and low-level systems from becoming one large component.

## Create The Hero Entry

`Hero3D` is the component you place in the page. Its main job is to create a container ref and pass that active area to the canvas.

That container matters later because pointer input should be calculated relative to the hero, not the entire browser window.

## Create The Canvas

`HeroCanvas` owns the React Three Fiber `<Canvas>`.

It configures:

- Camera defaults.
- Device pixel ratio.
- Renderer settings.
- Suspense for texture loading.
- The connection between input and `SceneRoot`.

This is also where the input manager will be created later, because the canvas knows which DOM container defines the interactive area.

## Create The Scene Root

`SceneRoot` is the composition layer. It should contain:

- Ambient light.
- Directional light.
- `CameraController`.
- `ImagePlane`.
- `SceneReadiness`.
- The shared motion state.

The scene root is also a good place to update shared per-frame state with `useFrame`.

## Add The Image Plane

`ImagePlane` loads the texture maps and renders a segmented plane geometry.

The plane needs enough segments because the vertex shader will later displace the geometry using the depth map. In this project, that value lives in `HERO_IMAGE_PLANE_SEGMENTS`.

The image plane is also where you configure texture color spaces, wrapping and filtering so the maps behave correctly inside the shader.

## Add The Config File

Keep tunable values in `hero-parallax-config`.

This file should hold values such as:

- Pointer range.
- Motion damping.
- Camera movement strength.
- UV parallax strength.
- Vertex depth strength.
- Normal, specular and fresnel strength.
- Depth shaping.
- Plane size and segment count.

Centralizing these values makes the final effect easier to tune without searching through every component.

## Checkpoint

Before moving on, the canvas should render a portrait plane in the page. It does not need to feel fully 3D yet.

Next: [Creating The Parallax Effect](creating-the-parallax-effect.md)
