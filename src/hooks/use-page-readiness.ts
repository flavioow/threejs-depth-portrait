"use client"

import { useLoadingStore } from "@/stores/use-loading-store"
import { useEffect } from "react"

export function usePageReadiness() {
  const SetPageReady = useLoadingStore((s) => s.setPageReady)

  useEffect(() => {
    if (document.readyState === "complete") {
      SetPageReady()
      return
    }

    const handler = () => SetPageReady()
    window.addEventListener("load", handler)
    return () => window.removeEventListener("load", handler)
  }, [SetPageReady])
}
