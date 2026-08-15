import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LOGO_URL } from '../../../lib/cloudinary'
import { staggerItem, reducedStaggerItem, usePrefersReducedMotion } from '../../../lib/motion'

// `type === 'image'` used to slide in from the left via a raw CSS `@keyframes loadedImg` animation
// (see src/tailwind.css history) — replaced with the same fade-up reveal Show.jsx's cards use
// (`staggerItem`/`reducedStaggerItem`) for a consistent entrance style across the site. Triggered by
// this component's own `loaded` state (the actual image finishing its preload), not by a parent
// stagger container, so it works standalone (WhatsNew's cover art, Epk's hero avatar) as well as
// inside one (ShopItem's product photos, which also sit in a `staggerItem`-driven `motion.li` — the
// two reveals are independent, which is correct: the image should only visibly reveal once loaded).
const LazyImage = ({ src, alt, type, rounded = 'md' }) => {
  const roundedClass = rounded === 'full' ? 'rounded-full' : 'rounded-[0.7rem]'
  const [loaded, setLoaded] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setLoaded(true)

    return () => {
      img.onload = null
    }
  }, [src])

  const revealProps =
    type === 'image'
      ? {
          initial: 'hidden',
          animate: loaded ? 'visible' : 'hidden',
          variants: (prefersReducedMotion ? reducedStaggerItem : staggerItem).variants,
        }
      : {}

  // Shown in place of the real photo while it's still loading — previously this slot just showed
  // `LOGO_URL` stretched/cropped in as the actual image content (`object-cover`/`bg-cover` on a tiny
  // logo), which looks like a broken image rather than a loading state. A muted pulsing tile with the
  // logo mark centered at its natural size reads as "loading", not "broken".
  const skeleton = (
    <div className="relative flex h-full w-full animate-pulse items-center justify-center bg-[var(--color-hairline)]">
      <img className="h-[45px] w-[45px] opacity-50" src={LOGO_URL} alt="" />
    </div>
  )

  return (
    <>
      {type === 'image' ? (
        loaded ? (
          <motion.img
            className={`relative aspect-square w-full object-cover ${roundedClass}`}
            {...revealProps}
            src={src}
            alt={alt}
          />
        ) : (
          <div className={`aspect-square w-full overflow-hidden ${roundedClass}`}>{skeleton}</div>
        )
      ) : type === 'epk' ? (
        // Sponsor/collaboration wordmarks, not photos — the original pre-Tailwind CSS
        // (`.epkImg { width:100%; object-fit:contain }`) never forced these into a square crop the
        // way the `image` type's photo treatment does. Logos are rectangular in every direction (wide
        // wordmarks, tall stacked marks, the odd square one) — `aspect-square` + `object-cover` was
        // cropping their edges off, `object-contain` with a natural (unconstrained) height shows the
        // whole mark instead, exactly like the original.
        <motion.img className="w-full object-contain" src={loaded ? src : LOGO_URL} alt={alt} />
      ) : (
        <div className="h-[500px] w-full overflow-hidden rounded-[0.6rem] max-[700px]:aspect-square max-[700px]:h-auto">
          {loaded ? (
            <div
              className="h-full w-full bg-[position:center_0px] bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${src})` }}
            />
          ) : (
            skeleton
          )}
        </div>
      )}
    </>
  )
}

export default LazyImage
