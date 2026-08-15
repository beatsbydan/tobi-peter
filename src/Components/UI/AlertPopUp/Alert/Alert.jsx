import { motion } from 'framer-motion'
import { BsCheck2Circle } from 'react-icons/bs'
import { BiError } from 'react-icons/bi'
import { toastTransition } from '../../../../lib/motion'

const Alert = (props) => {
  const isSuccess = props.type === 'success'
  return (
    <motion.div
      {...toastTransition}
      role="status"
      aria-live="polite"
      className={`fixed top-6 left-0 right-0 z-[10000] mx-auto flex w-4/5 max-w-[400px] flex-row items-center justify-center gap-[1.2rem] rounded-[0.3rem] p-[0.7rem] font-semibold text-white ${
        isSuccess ? 'bg-[var(--color-ink)]' : 'bg-[var(--color-danger)]'
      }`}
    >
      <p className="text-[0.9rem]">{props.message}</p>
      {isSuccess ? <BsCheck2Circle color="white" size={30} /> : <BiError color="white" size={30} />}
    </motion.div>
  )
}

export default Alert
