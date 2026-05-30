<h1 align="center">Three.js Depth Portrait</h1>

<p align="center">
  A source-code study and tutorial playground for recreating the interactive pseudo-3D portrait effect inspired by the Lando Norris website.
</p>

<p align="center">
  <a href="https://threejs-depth-portrait.vercel.app">Live demo</a>
  ·
  <a href="https://youtu.be/K77NRNd_WxU">Video preview</a>
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/-Next.js-333333?style=flat&logo=nextdotjs" />
  <img alt="React" src="https://img.shields.io/badge/-React-333333?style=flat&logo=react" />
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-333333?style=flat&logo=typescript" />
  <img alt="Three.js" src="https://img.shields.io/badge/-Three.js-333333?style=flat&logo=threedotjs" />
  <img alt="React Three Fiber" src="https://img.shields.io/badge/-React%20Three%20Fiber-333333?style=flat&logo=react" />
  <img alt="WebGL" src="https://img.shields.io/badge/-WebGL-333333?style=flat&logo=webgl" />
  <img alt="GLSL" src="https://img.shields.io/badge/-GLSL-333333?style=flat&logo=opengl" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/-Tailwind%20CSS-333333?style=flat&logo=tailwindcss" />
  <img alt="Zustand" src="https://img.shields.io/badge/-Zustand-333333?style=flat&logo=react" />
  <img alt="Vercel" src="https://img.shields.io/badge/-Vercel-333333?style=flat&logo=vercel" />
</p>

<p align="center">
  <a href="https://youtu.be/K77NRNd_WxU">
    <img
      src="./public/demo.gif"
      alt="Three.js pseudo-3D depth portrait parallax demo inspired by the Lando Norris website"
      width="600"
    />
  </a>
</p>

## About The Project

The idea is simple: take a flat portrait and make it feel alive. Instead of using a full 3D model, this experiment uses image maps, shader logic and motion input to create a lightweight pseudo-3D parallax illusion in the browser.

## Want To Build This?

This repository is the starting point for a practical guide on building a Three.js depth portrait effect with WebGL, React Three Fiber, GLSL shaders, depth maps and real-time interaction.

The full documentation is still being written, but it will be split into two paths:

- **Quick guide:** a direct step-by-step path for people who want to recreate the effect as fast as possible.
- **Architecture notes:** a deeper breakdown of the shader decisions, texture maps, input systems, scene structure and trade-offs behind the implementation.

For now, the project already works as a source-code reference and live demo while the tutorial is being prepared.

## Getting Started

If you want to inspect the implementation locally, install the dependencies and start the development server:

```bash
git clone https://github.com/flavioow/threejs-depth-portrait.git
cd threejs-depth-portrait
bun install
bun dev
```

After that, open `http://localhost:3000` and move your cursor around the portrait. On mobile devices, the experience can react to device orientation when supported by the browser.

## What It Includes

- Pseudo-3D portrait rendering with Three.js and WebGL
- Custom GLSL shader for a depth-based parallax effect
- Texture-map support for diffuse, depth, normal, roughness and alpha layers
- Pointer interaction for desktop devices
- Gyroscope/device orientation interaction for mobile devices
- Smooth damped motion for a more natural interactive feel
- A Next.js and React Three Fiber structure ready to explore

## Inspiration

Inspired by the interactive portrait effect used on [landonorris.com](https://landonorris.com). This project was independently developed as an educational reference implementation after research into depth-based portrait rendering techniques.

Special thanks to [Syntax/Wes Bos](https://youtu.be/HzL65tTeANs?si=JPuKwMPhki2_Mu1D) for sharing the logic behind texture maps and shaders.
