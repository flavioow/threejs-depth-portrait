"use client"

import { useEffect, useState } from "react"

type Breakpoint = "mobile" | "md" | "lg"

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("mobile")

  useEffect(() => {
    const mdQuery = window.matchMedia("(min-width: 768px)")

    const lgQuery = window.matchMedia("(min-width: 1024px)")

    const updateBreakpoint = () => {
      if (lgQuery.matches) {
        setBreakpoint("lg")
        return
      }

      if (mdQuery.matches) {
        setBreakpoint("md")
        return
      }

      setBreakpoint("mobile")
    }

    updateBreakpoint()

    mdQuery.addEventListener("change", updateBreakpoint)

    lgQuery.addEventListener("change", updateBreakpoint)

    return () => {
      mdQuery.removeEventListener("change", updateBreakpoint)

      lgQuery.removeEventListener("change", updateBreakpoint)
    }
  }, [])

  return breakpoint
}
