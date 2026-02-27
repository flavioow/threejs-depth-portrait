import { Hero3D } from "@/components/hero-parallax/hero-3d";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-16 md:px-10 lg:px-16">
        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              3D Portrait Hero
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Interatividade com depth map e recorte limpo por alpha mask.
            </h1>
            <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
              Estrutura pronta para encaixar em qualquer seção: tamanho
              controlado, aspect-ratio fixo e movimento 3D suave com mouse.
            </p>
            <button
              type="button"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Ver Projeto
            </button>
          </div>

          <div className="flex w-full justify-end">
            <Hero3D
              aspectRatio="1 / 1"
              minSize="240px"
              idealSize="34vw"
              maxSize="620px"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
