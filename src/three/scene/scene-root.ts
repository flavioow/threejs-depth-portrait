/* Objetivo: compor os objetos da cena
  ele conecta câmera, plano da imagem, luz e sistemas
*/

import {
  AmbientLight,
  DirectionalLight,
  type Object3D,
  type PerspectiveCamera,
  Scene,
} from "three";
import type { Vector2D } from "@/three/types/vector";

type SceneRoot = {
  scene: Scene;
  update: (motion: Vector2D) => void;
};

export function createSceneRoot(deps: {
  camera: PerspectiveCamera;
  cameraController: { update: (motion: Vector2D) => void };
  imagePlane: { mesh: Object3D; update: (motion: Vector2D) => void };
}): SceneRoot {
  // Ordem de importância: câmera, objetos, luz
  const scene = new Scene();
  scene.add(new AmbientLight(0xffffff, 1));
  const directional = new DirectionalLight(0xffffff, 1);
  directional.position.set(1, 1, 1);
  scene.add(directional);
  scene.add(deps.imagePlane.mesh);

  return {
    scene,
    update(motion) {
      deps.cameraController.update(motion);
      deps.imagePlane.update(motion);
    },
  };
}
