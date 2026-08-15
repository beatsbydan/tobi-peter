import React from 'react'
import { motion } from 'framer-motion'
import LazyImage from '../../../../UI/LazyImage/LazyImage'
import { staggerItem, tapScale } from '../../../../../lib/motion'

const ShopItem = ({ item }) => {
  return (
    <motion.li
      className="grid w-full h-full grid-cols-2 gap-10 max-[765px]:flex max-[765px]:flex-col"
      variants={staggerItem.variants}
    >
      <div className="relative h-full">
        <LazyImage src={item?.imgUrl} type="image" alt={item?.title} />
      </div>
      <div className="flex flex-col gap-16 pt-6 max-[765px]:pt-0">
        <div>
          <h5 className="text-[15px] text-[var(--color-ink)] font-medium">{item?.title}</h5>
          <h6 className="mt-2.5 text-[12px] text-[var(--color-ink)] font-medium">
            {item?.subtitle}
          </h6>
        </div>
        <div className="-mt-4">
          <p className="mb-2.5 text-[12px] text-[var(--color-ink)]">AVAILABLE SIZES</p>
          <ul className="flex items-center gap-[15px]">
            {item?.availableSizes?.map((size, index) => {
              return (
                <li
                  key={index}
                  className="rounded-[9px] bg-[#d9d9d936] px-[1.4rem] py-4 font-medium text-[var(--color-muted)]"
                >
                  {size}
                </li>
              )
            })}
          </ul>
        </div>
        <motion.a
          target="_blank"
          rel="noreferrer"
          href={item?.linkToItem}
          {...tapScale}
          className="-mt-[0.7rem] w-full cursor-pointer rounded-[0.3rem] border-[0.1rem] border-[var(--color-ink)] p-4 text-center [transition:all_0.3s_ease] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] active:bg-[var(--color-ink)] active:text-[var(--color-cream)]"
        >
          CONTINUE SHOPPING
        </motion.a>
      </div>
    </motion.li>
  )
}

export default ShopItem
