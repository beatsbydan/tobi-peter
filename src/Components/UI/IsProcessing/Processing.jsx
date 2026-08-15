import { AnimatePresence, motion } from 'framer-motion'
import useIsProcessing from '../../../Hooks/useIsProcessing'
import IsProcessing from './IsProcessing'
import { panelTransitionRight } from '../../../lib/motion'

const Processing = () => {
  const { isProcessing } = useIsProcessing()
  return (
    <AnimatePresence>
      {isProcessing === true && (
        <motion.div
          key="processing"
          {...panelTransitionRight}
          className="fixed top-[20.7%] right-0 z-[10000]"
        >
          <IsProcessing />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Processing
