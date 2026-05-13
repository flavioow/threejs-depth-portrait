/* OBJETIVO: delimitar onde o efeito começa e termina
  ele decide quando o input é ativo,
  quando o efeito relaxa,
  quando o loop continua ou não
*/

"use client"

import { useRef } from "react"
import { HeroCanvas } from "./hero-canvas"
import { usePageReadiness } from "@/hooks/use-page-readiness"

type Hero3DProps = {
  aspectRatio?: string
  minSize?: string
  idealSize?: string
  maxSize?: string
  className?: string
}

export function Hero3D({ className = "" }: Hero3DProps) {
  // calcula a área ativa do efeito
  const containerRef = useRef<HTMLDivElement | null>(null)
  usePageReadiness()

  return (
    <div
      className={`overflow-hidden absolute inset-0 h-full w-full ${className}`}
      ref={containerRef}>
      <HeroCanvas containerRef={containerRef} />
    </div>
  )
}
