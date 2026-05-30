# Creating The Parallax Effect

The parallax effect starts when the image plane stops being a normal flat texture and starts using a custom shader.

In this project, the shader lives in `image-parallax-shader.ts`.

## What The Shader Does

The shader combines the texture maps and motion values to create the illusion of depth.

At a high level:

- The diffuse map provides the visible color.
- The depth map tells the shader which areas feel closer or farther away.
- The alpha map keeps the portrait silhouette clean.
- The normal map adds subtle lighting direction.
- The roughness map softens or sharpens small highlights.
- The motion uniform tells the shader how the user is moving.

## Vertex Shader

The vertex shader works on the geometry.

Its job is to read the depth map and push parts of the plane slightly forward or backward. This gives the portrait a little physical shape before the fragment shader does the more noticeable image displacement.

The effect should stay subtle. Too much vertex displacement can make the image feel warped instead of dimensional.

## Fragment Shader

The fragment shader works on the pixels.

Its main job is to shift UV coordinates based on:

- The current motion.
- The depth value.
- Edge falloff.
- Alpha protection.

This creates the feeling that closer parts of the portrait move differently from farther parts.

## Uniforms

Uniforms are the bridge between React/Three and GLSL.

The scene updates values like `uMotion`, `uUvParallaxStrength`, `uVertexDepthStrength` and `uDepthPower`. The shader reads those values every frame and uses them to change the final image.

This lets the React side control the effect without rewriting the shader every frame.

## Connect The Shader To The Plane

`ImagePlane` should:

- Load all texture maps.
- Create the uniforms.
- Pass `vertexShader` and `fragmentShader` into `shaderMaterial`.
- Update motion-related uniforms inside `useFrame`.

Once this is connected, the image should begin to feel dimensional even before the final input polish is complete.

## Checkpoint

Before moving on, the portrait should render with the custom shader and respond when `uMotion` changes.

Next: [Adding User Input](adding-user-input.md)
