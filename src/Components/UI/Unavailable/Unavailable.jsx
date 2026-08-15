import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { IoArrowBackOutline } from 'react-icons/io5'
import { pageTransition } from '../../../lib/motion'
import { LOGO_URL } from '../../../lib/cloudinary'

const Unavailable = () => {
  const navigate = useNavigate()
  return (
    <motion.div className="relative mx-auto h-[40vh] w-full max-w-[800px]" {...pageTransition}>
      <IoArrowBackOutline cursor="pointer" onClick={() => navigate(-1)} color="#1D3557" size={22} />
      <div className="absolute top-1/2 left-1/2 mt-6 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-8">
        <img className="h-[45px] w-[45px]" src={LOGO_URL} alt="" />
        <p className="text-center font-semibold text-[var(--color-muted)]">
          THIS PAGE IS UNAVAILABLE...
        </p>
      </div>
    </motion.div>
  )
}

export default Unavailable
