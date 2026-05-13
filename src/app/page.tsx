import { Hero3D } from "@/components/hero-parallax/hero-3d"

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative isolate flex h-dvh w-dvw items-center justify-center overflow-hidden bg-radial from-[#edebe9] from-28% to-[#c3bfbb]">
        <Hero3D />
        <h1 className="pointer-events-none select-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-[clamp(4rem,16vw,16rem)] leading-[0.9] tracking-[-0.05em] text-white mix-blend-difference">
          Flavi.<span className="italic">oow</span>
        </h1>
      </section>
    </main>
  )
}
