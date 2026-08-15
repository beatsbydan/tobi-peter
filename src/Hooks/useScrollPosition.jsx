import { useEffect, useState } from 'react'

const NEAR_TOP_THRESHOLD = 100

function computeIsScrollable() {
  return document.documentElement.scrollHeight > window.innerHeight
}

export function useScrollPosition() {
  const [isNearTop, setIsNearTop] = useState(true)
  const [isScrollable, setIsScrollable] = useState(false)

  useEffect(() => {
    setIsScrollable(computeIsScrollable())

    let ticking = false
    const updateScrollState = () => {
      setIsNearTop(window.scrollY < NEAR_TOP_THRESHOLD)
      setIsScrollable(computeIsScrollable())
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // Route navigation swaps the whole page's content without necessarily firing a `scroll` or
    // `resize` event (e.g. navigating while already scrolled to the top, into a page short enough
    // not to need scrolling) — a ResizeObserver on the document body catches that content-height
    // change directly, so `isScrollable` stays correct across navigation, not just in-page scrolling.
    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(document.body)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      resizeObserver.disconnect()
    }
  }, [])

  return { isNearTop, isScrollable }
}
