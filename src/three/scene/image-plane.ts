/* Objetivo: aplicar as camadas de mapas
  - Esse sistema NÃO sabe: de mouse, damping, React
  - Ele só define: geometria, material, mapas
*/

import {
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  type Texture,
  Vector2,
  Vector3,
} from "three";

import type { Vector2D } from "@/three/types/vector";
import { fragmentShader, vertexShader } from "./shaders/image-parallax-shader";

type ImageMaps = {
  diffuse: Texture;
  depth: Texture;
  normal?: Texture;
  alpha?: Texture;
  roughness?: Texture;
  glossy?: Texture;
  metalic?: Texture;
  occlusion?: Texture;
};

type ImagePlane = {
  mesh: Mesh;
  update: (motion: Vector2D) => void;
};

/* Cria o plano da imagem
  - maps: conjunto de texturas já carregadas
  - size: tamanho visual do plano
*/
export function createImagePlane(
  maps: ImageMaps,
  size: { width: number; height: number },
): ImagePlane {
  // O material não é padrão, é um shader costomizado
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uDiffuse: { value: maps.diffuse },
      uDepth: { value: maps.depth },
      uAlpha: { value: maps.alpha ?? null },
      uNormal: { value: maps.normal },

      uMotion: { value: new Vector2(0, 0) },
      uStrength: { value: 0.025 },
      uNormalStrength: { value: 0.1 },

      uLightDirection: {
        value: new Vector3(0.3, 0.6, 1).normalize(),
      },
    },
    transparent: true,
    depthWrite: false,
  });

  const geometry = new PlaneGeometry(size.width, size.height, 1, 1);
  const mesh = new Mesh(geometry, material);

  return {
    mesh,
    update(motion) {
      // Atualiza intenção do shader
      material.uniforms.uMotion.value.set(motion.xPosition, motion.yPosition);
    },
  };
}
