import { create } from "zustand"

type LoadingStore = {
  sceneReady: boolean
  pageReady: boolean
  sceneProgress: number
  setSceneReady: () => void
  setPageReady: () => void
  setSceneProgress: (v: number) => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  sceneReady: false,
  pageReady: false,
  sceneProgress: 0,
  setSceneReady: () => set({ sceneReady: true }),
  setPageReady: () => set({ pageReady: true }),
  setSceneProgress: (v: number) => set({ sceneProgress: v }),
}))

export const useIsFullyLoaded = () =>
  useLoadingStore((s) => s.sceneReady && s.pageReady)
