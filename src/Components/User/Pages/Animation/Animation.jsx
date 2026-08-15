import { BiRightArrowAlt } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { pageTransition, staggerContainer, staggerItem, tapScale } from '../../../../lib/motion'

const Animation = () => {
  return (
    <motion.div className="mx-auto w-full max-w-[750px] font-sans" {...pageTransition}>
      <h1 className="sr-only">Animation</h1>
      <div className="flex flex-col gap-[0.7rem]">
        <h3 className="font-medium text-[var(--color-ink)]">BIO</h3>
        <p className="text-[0.9rem] text-[var(--color-muted)]">Yeah I make animations as well.</p>
        <p className="text-[0.9rem] text-[var(--color-muted)]">
          Check out some of my previous projects/client work.
        </p>
        <div className="mt-4 grid grid-cols-[45%_45%] gap-[10%] max-[600px]:grid-cols-none max-[600px]:mb-[1.5em]">
          <div className="w-full rounded-[0.6rem] bg-[#d9d9d936] p-[2rem] text-center">
            <h5 className="text-[var(--color-muted)]">VIEW PORTFOLIO</h5>
            <motion.a
              target="_blank"
              rel="noreferrer"
              href="https://www.behance.net/tobipeter8"
              {...tapScale}
              className="mt-4 flex flex-row items-center justify-center gap-[0.3rem] text-[1.1rem] font-medium text-[var(--color-muted)] [transition:all_0.3s_ease] hover:gap-[1.2rem]"
            >
              BEHANCE
              <BiRightArrowAlt />
            </motion.a>
          </div>
          <div className="w-full rounded-[0.6rem] bg-[#d9d9d936] p-[2rem] text-center">
            <h5 className="text-[var(--color-muted)]">ANIMATION</h5>
            <Link
              to={'/unavailable'}
              className="mt-4 flex flex-row items-center justify-center gap-[0.3rem] text-[1.1rem] font-medium text-[var(--color-muted)] [transition:all_0.3s_ease] hover:gap-[1.2rem]"
            >
              MAKE REQUEST
              <BiRightArrowAlt className="arrow" size={15} />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <h3 className="pt-[2em] pb-[1em] text-[1.3rem] font-medium text-[var(--color-ink)]">
          CLIENTS
        </h3>
        <div>
          <p className="text-[0.85rem] text-[var(--color-muted)]">INDIVIDUALS</p>
          <motion.ul
            className="mx-auto mt-[2em] mb-[4em] flex w-4/5 flex-row flex-wrap items-center justify-center gap-12"
            {...staggerContainer}
          >
            <motion.li variants={staggerItem.variants}>
              <p className="font-caesar text-[2rem] text-[#49546480]">LADY DONLI</p>
            </motion.li>
            <motion.li variants={staggerItem.variants}>
              <p className="font-caesar text-[2rem] text-[#49546480]">DAVIDO</p>
            </motion.li>
            <motion.li variants={staggerItem.variants}>
              <p className="font-caesar text-[2rem] text-[#49546480]">DARKOVIBES</p>
            </motion.li>
            <motion.li variants={staggerItem.variants}>
              <p className="font-caesar text-[2rem] text-[#49546480]">BEGHO</p>
            </motion.li>
            <motion.li variants={staggerItem.variants}>
              <p className="font-caesar text-[2rem] text-[#49546480]">SHALOM DUBAS</p>
            </motion.li>
            <motion.li variants={staggerItem.variants}>
              <p className="font-caesar text-[2rem] text-[#49546480]">JAMIE BLACK</p>
            </motion.li>
            <motion.li variants={staggerItem.variants}>
              <p className="font-caesar text-[2rem] text-[#49546480]">ENZO PESO</p>
            </motion.li>
            <motion.li variants={staggerItem.variants}>
              <p className="font-caesar text-[2rem] text-[#49546480]">NESSA</p>
            </motion.li>
            <motion.li variants={staggerItem.variants}>
              <p className="font-caesar text-[2rem] text-[#49546480]">TOYIN ORES</p>
            </motion.li>
          </motion.ul>
        </div>
        <div>
          <p className="text-[0.85rem] text-[var(--color-muted)]">ORGANIZATIONS</p>
          <motion.ul
            className="mx-auto mt-[2em] mb-[4em] flex w-4/5 flex-row flex-wrap items-center justify-center gap-12"
            {...staggerContainer}
          >
            <motion.li variants={staggerItem.variants}>
              <p className="font-caesar text-[2rem] text-[#49546480]">MONEY AFRICA</p>
            </motion.li>
            <motion.li variants={staggerItem.variants}>
              <p className="font-caesar text-[2rem] text-[#49546480]">ROOST FOUNDATION</p>
            </motion.li>
            <motion.li variants={staggerItem.variants}>
              <p className="font-caesar text-[2rem] text-[#49546480]">TRYBE ONE</p>
            </motion.li>
          </motion.ul>
        </div>
      </div>
    </motion.div>
  )
}

export default Animation
