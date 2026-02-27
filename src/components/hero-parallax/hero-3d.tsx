/* OBJETIVO: delimitar onde o efeito começa e termina
  ele decide quando o input é ativo,
  quando o efeito relaxa,
  quando o loop continua ou não
*/

"use client";

import { useMemo, useRef } from "react";
import { HeroCanvas } from "./hero-canvas";

type Hero3DProps = {
  aspectRatio?: string;
  minSize?: string;
  idealSize?: string;
  maxSize?: string;
  className?: string;
};

export function Hero3D({
  aspectRatio = "1 / 1",
  minSize = "260px",
  idealSize = "36vw",
  maxSize = "620px",
  className = "",
}: Hero3DProps) {
  // calcula a área ativa do efeito
  const containerRef = useRef<HTMLDivElement | null>(null);
  const width = useMemo(
    () => `clamp(${minSize}, ${idealSize}, ${maxSize})`,
    [minSize, idealSize, maxSize],
  );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, aspectRatio }}
      ref={containerRef}
    >
      <HeroCanvas containerRef={containerRef} />
    </div>
  );
}
