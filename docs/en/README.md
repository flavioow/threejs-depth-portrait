# Three.js Depth Portrait Guide

This is the English documentation entry point for the Three.js Depth Portrait project.

The goal of this guide is to help you recreate the interactive pseudo-3D portrait effect from a single image, using texture maps, Three.js, React Three Fiber, custom GLSL shaders and real-time input.

This first version is intentionally practical. It explains the role of each part, shows how the pieces connect and gives you a path to copy the structure into your own project. It does not try to document every line of code.

## Choose Your Path

If you want the fastest route, follow the guide in order and use each chapter as a build checkpoint.

If you want more context, read each chapter slowly and compare the explanation with the source files in the repository. The deeper theory and internals sections will be added later.

## Guide

1. [Getting Started](guide/getting-started.md)
2. [Preparing Images](guide/preparing-images.md)
3. [Building The Scene](guide/building-the-scene.md)
4. [Creating The Parallax Effect](guide/creating-the-parallax-effect.md)
5. [Adding User Input](guide/adding-user-input.md)
6. [Improving The Experience](guide/improving-the-experience.md)
7. [Finishing](guide/finishing.md)

## What You Will Build

By the end of the guide, you should have:

- A `Hero3D` component that can be placed inside a page.
- A React Three Fiber canvas rendering a portrait plane.
- Five texture maps loaded from `public/`.
- A shader-based pseudo-3D parallax effect.
- Pointer interaction on desktop.
- Gyroscope interaction on supported mobile browsers.
- A loading layer that waits for both the page and scene.

## Future Translations

The documentation is starting in English. Future translations will follow this directory pattern:

```txt
docs/en/
docs/pt-br/
docs/it/
```

## Future Sections

The quick guide comes first. Later, this documentation can grow into separate theory and internals areas for deeper explanations about texture maps, shader architecture, input systems and rendering decisions.
