import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useAuth from '../../../Hooks/useAuth'
import { motion } from 'framer-motion'
import { pageTransition } from '../../../lib/motion'
import { LOGO_URL } from '../../../lib/cloudinary'

const NotFound = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { authDetails } = useAuth()
  useEffect(() => {
    if (location.pathname.includes('/admin')) {
      if (authDetails.isLoggedIn) {
        setTimeout(() => {
          navigate('/admin/home')
        }, 3500)
      } else {
        setTimeout(() => {
          navigate('/admin')
        }, 3500)
      }
    } else {
      setTimeout(() => {
        navigate('/')
      }, 3500)
    }
  }, [authDetails.isLoggedIn, location.pathname, navigate])
  return (
    <motion.section className="relative h-[40vh] w-full" {...pageTransition}>
      <div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-8">
        <img className="h-[45px] w-[45px]" src={LOGO_URL} alt="" />
        <p className="text-center font-semibold text-[var(--color-muted)]">
          THE PAGE YOU'RE LOOKING FOR DOES NOT EXIST...
        </p>
      </div>
    </motion.section>
  )
}

export default NotFound
