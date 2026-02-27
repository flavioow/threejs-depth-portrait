/* Objetivo: mover a câmera de current para target através de inclinação
  - Esse sistema NÃO sabe: de mouse, damping, React
  - Ele só sabe números
*/

import type { PerspectiveCamera } from "three";
import type { Vector2D } from "../types/vector";

type CameraController = {
  update: (motion: Vector2D) => void;
};

/* Cria um controlador de câmera
  - câmera: é uma câmera do mundo 3D
  - intensity: controla quanto a câmera inclina
*/
export function createCameraController(
  camera: PerspectiveCamera,
  intensity: number,
): CameraController {
  return {
    update(motion: Vector2D) {
      camera.rotation.x = -motion.yPosition * intensity;
      camera.rotation.y = motion.xPosition * intensity;
    },
  };
}
