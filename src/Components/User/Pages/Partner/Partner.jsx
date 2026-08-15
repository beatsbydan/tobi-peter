import { motion } from 'framer-motion'
import { fadeUp, pageTransition } from '../../../../lib/motion'

const Partner = () => {
  return (
    <motion.div className="mx-auto w-full max-w-[750px]" {...pageTransition}>
      <h1 className="text-2xl leading-normal font-medium text-[var(--color-ink)]">PARTNERSHIPS</h1>
      <motion.div className="mt-[2.2rem]" {...fadeUp}>
        <p className="text-[0.9rem] text-[var(--color-muted)]">
          There are no upcoming projects in which you can become a partner with Tobi Peter.
        </p>
      </motion.div>
    </motion.div>
  )
}
export default Partner
