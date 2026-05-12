/* Objetivo: rodar o sistema de modo contínuo
  roda em requestAnimationFrame,
  não causa re-render no React,
  vive enquanto o canvas existe
*/

type RenderLoop = {
  start: () => void
  stop: () => void
}

/* Cria um loop de renderização genérico
  - update: atualiza estados (motion, câmera, etc)
  - render: desenha a cena
*/
export function createRenderLoop(
  update: () => void,
  render: () => void,
): RenderLoop {
  let running = false
  let rafId: number

  function loop() {
    if (!running) return

    update()
    render()

    rafId = requestAnimationFrame(loop)
  }

  return {
    start() {
      if (running) return
      running = true
      rafId = requestAnimationFrame(loop)
    },

    stop() {
      running = false
      cancelAnimationFrame(rafId)
    },
  }
}
