import React from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from '../../../lib/motion'
import { LOGO_URL } from '../../../lib/cloudinary'

const UnderMaintenance = () => {
  return (
    <motion.div className="relative mx-auto h-[30vh] w-full max-w-[800px]" {...pageTransition}>
      <div className="absolute top-1/2 left-1/2 mt-6 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-8">
        <img className="h-[45px] w-[45px]" src={LOGO_URL} alt="" />
        <h3 className="text-center font-semibold text-[var(--color-muted)]">
          SITE UNDER MAINTENANCE.
        </h3>
      </div>
    </motion.div>
  )
}

export default UnderMaintenance
