import { motion } from 'framer-motion'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { useScrollPosition } from '../../../Hooks/useScrollPosition'
import { tapScale, usePrefersReducedMotion } from '../../../lib/motion'

const ScrollToggle = () => {
  const { isNearTop, isScrollable } = useScrollPosition()
  const prefersReducedMotion = usePrefersReducedMotion()

  if (!isScrollable) return null

  const handleClick = () => {
    window.scrollTo({
      top: isNearTop ? document.documentElement.scrollHeight : 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <motion.button
      type="button"
      {...tapScale}
      onClick={handleClick}
      aria-label={isNearTop ? 'Scroll to bottom' : 'Scroll to top'}
      className="fixed right-6 bottom-6 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-cream)] shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:bg-[var(--color-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
    >
      {isNearTop ? <BiChevronDown size={26} /> : <BiChevronUp size={26} />}
    </motion.button>
  )
}

export default ScrollToggle
