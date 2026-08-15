import { useState, useEffect } from 'react'

// Mirrors `usePrefersReducedMotion`'s matchMedia pattern (lib/motion.js).
export default function useIsMobile(breakpoint) {
  const query = `(max-width: ${breakpoint}px)`
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (event) => setIsMobile(event.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return isMobile
}
