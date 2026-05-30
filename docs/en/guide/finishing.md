# Finishing

The final step is to use the effect inside a real page and make it easy to adapt.

In this project, the page renders the loader and places the 3D hero behind text content.

## Add The Hero To A Page

The basic structure is:

```tsx
<>
  <LoaderOverlay />
  <main>
    <section className="relative isolate overflow-hidden">
      <Hero3D />
      {/* Your hero content goes here */}
    </section>
  </main>
</>
```

`Hero3D` should be positioned as the visual layer, while text or UI content can sit above it.

## Place Content Over The Canvas

The canvas works well as a background layer for a hero section.

Keep the section responsible for:

- Layout.
- Background color or gradient.
- Text placement.
- Overflow behavior.
- Stacking order.

The 3D system should stay focused on rendering the portrait and reacting to movement.

## Replace The Portrait

To use another person or image, replace the five texture maps in `public/`:

```txt
diffuse.png
alpha.png
depth.png
normal.webp
roughness.webp
```

Keep the same filenames unless you also update `texturePaths` in `ImagePlane`.

All maps should share the same framing. If the depth map or alpha map does not line up with the diffuse image, the final result will feel broken.

## Tune The Effect

Use `hero-parallax-config` to tune the feel.

Start with small changes:

- Increase `pointerRange` for stronger input response.
- Increase `motionDamping` for faster motion.
- Increase `uvParallaxStrength` for stronger pixel displacement.
- Increase `vertexDepthStrength` for stronger geometric depth.
- Adjust `depthPower` to reshape how the depth map feels.

Change one value at a time. The effect is sensitive, and small numbers usually look more convincing.

## Test The Result

Before calling the effect finished, test:

- Desktop pointer movement.
- Pointer leave behavior.
- Mobile browser loading.
- Device orientation support.
- Portrait framing on small screens.
- Texture loading on a fresh page load.

## Final Checklist

- Assets are in `public/`.
- Texture paths match the filenames.
- The canvas renders inside the hero.
- The shader material is active.
- Pointer input changes motion.
- Mobile gyro works where supported.
- Loading overlay exits correctly.
- The portrait is framed well across breakpoints.

This guide covers the practical path. Deeper explanations about texture theory, shader architecture and internal design decisions can live in future documentation sections.
