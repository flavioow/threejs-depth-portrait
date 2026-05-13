"use client"

import { useLoadingStore } from "@/stores/use-loading-store"
import { useProgress } from "@react-three/drei"
import { useEffect } from "react"

export function SceneReadiness() {
  const { active, progress } = useProgress()
  const setSceneReady = useLoadingStore((s) => s.setSceneReady)
  const setSceneProgress = useLoadingStore((s) => s.setSceneProgress)

  useEffect(() => {
    setSceneProgress(progress)

    if (!active && progress === 100) setSceneReady()
  }, [active, progress, setSceneReady, setSceneProgress])

  return null
}
