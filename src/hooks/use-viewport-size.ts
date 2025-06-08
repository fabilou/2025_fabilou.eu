import { useState, useEffect } from "react"

const useViewportSize = () => {
  const isClientSide = typeof window !== "undefined"

  const [viewportSize, setViewportSize] = useState(
    isClientSide
      ? { width: window.innerWidth, height: window.innerHeight }
      : { height: 0, width: 0 }
  )

  useEffect(() => {
    function resize() {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [viewportSize])

  return viewportSize
}

export default useViewportSize
