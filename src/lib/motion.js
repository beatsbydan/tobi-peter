import { useEffect, useState } from 'react'

/**
 * Shared framer-motion durations/easings/variants so later phases don't hand-write a new
 * `initial`/`animate`/`exit` object per component (the pattern already duplicated across
 * every page in App.jsx's page-transition wrappers). Not wired into any component yet.
 */

export const duration = {
  fast: 0.2,
  base: 0.35,
  slow: 0.7,
}

export const easing = {
  standard: [0.4, 0, 0.2, 1],
  entrance: [0, -0.34, 0, 1.33],
}

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event) => setPrefersReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return prefersReduced
}

// Full-page enter/exit transition. Animates only opacity/y (GPU-cheap, compositor-only) — replaced
// the old hand-written `initial={{width:'100%', opacity: 0}} animate={{...}}
// exit={{x: -window.innerWidth, ...}}` block duplicated across every page component, which animated
// `width` between two identical values (a real, if subtle, perf issue: Framer Motion still sets up a
// layout-affecting animation subscription for any property present in initial/animate/exit, even one
// that never changes value).
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easing.standard } },
  exit: { opacity: 0, y: -12, transition: { duration: duration.fast, ease: easing.standard } },
}

export const reducedPageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: duration.fast } },
  exit: { opacity: 0, transition: { duration: duration.fast } },
}

// Scroll-reveal for content sections (Epk stats/collaborations blocks, Shows/Music lists).
export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easing.standard } },
  viewport: { once: true, amount: 0.3 },
}

export const reducedFadeUp = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { duration: duration.fast } },
  viewport: { once: true, amount: 0.3 },
}

// Staggered list entrances for content present from initial render (sponsor logos, streaming-
// platform links) — scroll-triggered via `whileInView`.
export const staggerContainer = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.2 },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  },
}

// Same stagger, but triggered on mount (`animate`) instead of scroll (`whileInView`) — for lists
// whose items don't exist yet at the container's first paint (e.g. a query's data arrives after an
// `isPending` loading state). `whileInView` fires once, the first time the (then-empty/loading)
// container enters the viewport; by the time real items mount afterward, that trigger has already
// fired-and-forgotten (`once: true`) and the new children never receive a "become visible" signal,
// so they stay stuck at their `hidden` variant forever. Use this token for any `staggerContainer`
// wrapping a query-driven list (show/song/blog/image CRUD lists, etc.); keep `staggerContainer` only
// for content that's actually present in the DOM from the first render.
export const staggerContainerOnMount = {
  initial: 'hidden',
  animate: 'visible',
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  },
}

export const staggerItem = {
  variants: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easing.standard } },
  },
}

export const reducedStaggerItem = {
  variants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.fast } },
  },
}

// Small hover/tap micro-interaction for cards, buttons, nav links.
export const tapScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: duration.fast, ease: easing.standard },
}

// Toast enter/exit (AlertPopUp/Alert). Bouncy `easing.entrance` on the way in reads as an
// attention-grabbing pop, fitting a one-shot notification; calmer `easing.standard` on the way out
// so it gets out of the way quickly.
export const toastTransition = {
  initial: { opacity: 0, y: -16, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: duration.base, ease: easing.entrance },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.95,
    transition: { duration: duration.fast, ease: easing.standard },
  },
}
