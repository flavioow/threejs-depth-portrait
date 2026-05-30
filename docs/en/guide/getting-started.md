# Getting Started

This guide shows how to build an interactive depth portrait effect: a flat image that feels like it has volume when the user moves the cursor or tilts a mobile device.

The effect is not a real 3D model. It is a pseudo-3D illusion created with a portrait image, texture maps, a custom shader and smooth motion.

## What You Are Building

You will build a full-screen hero effect made from these pieces:

- A `Hero3D` component that defines the active area.
- A `HeroCanvas` component that creates the React Three Fiber canvas.
- A Three.js scene with a camera, lights and image plane.
- A shader that uses texture maps to fake depth.
- An input system for pointer and gyroscope motion.
- A small loading system for a smoother first impression.

The final result should be a portrait that reacts to movement and can be placed behind hero text or other page content.

## Before You Start

You do not need to be a shader expert, but this guide assumes you are comfortable with:

- Basic React components.
- Basic Next.js project structure.
- Copying and adapting TypeScript files.
- Reading small pieces of Three.js or React Three Fiber code.

The guide will not explain every line. Instead, it explains what each file is responsible for and how the files work together.

## The Build Order

The project is easier to understand if you build it in this order:

1. Prepare the image maps.
2. Build the scene and render the portrait.
3. Replace the basic material with the parallax shader.
4. Add pointer and gyroscope input.
5. Smooth the motion and add loading states.
6. Place the effect inside a real page.

That order mirrors the way the system works: assets first, rendering second, motion and polish after that.

## Expected Result

At the end, you should have:

- Texture maps inside `public/`.
- A `Hero3D` component rendered on your page.
- A canvas showing your portrait.
- Motion that responds to cursor movement on desktop.
- Motion that can respond to device orientation on mobile.

Next: [Preparing Images](preparing-images.md)
