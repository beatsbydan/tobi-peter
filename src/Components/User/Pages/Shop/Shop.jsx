import React from 'react'
import { motion } from 'framer-motion'
import ShopItem from './shopItem/ShopItem'
import { pageTransition, staggerContainer } from '../../../../lib/motion'
import { cloudinaryTransform } from '../../../../lib/cloudinary'

const Shop = () => {
  const shopItems = [
    {
      imgUrl: cloudinaryTransform(
        'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1766181018/lamb_x_Gospel_house_collab_3_1_hknczz.png',
      ),
      title: 'GOSPEL HOUSE',
      subtitle: 'GH TEE E1',
      availableSizes: ['M', 'L'],
      linkToItem: 'https://paystack.shop/gospel-house',
    },
    {
      imgUrl: cloudinaryTransform(
        'https://res.cloudinary.com/dlgzlrzfh/image/upload/v1766181019/LAMB_X_GOSPEL_HOUSE_WHITE_2_nxewar.png',
      ),
      title: 'GOSPEL HOUSE',
      subtitle: 'GH TEE E2',
      availableSizes: ['M', 'L'],
      linkToItem: 'https://paystack.shop/gospel-house',
    },
  ]

  return (
    <motion.div className="epk" {...pageTransition}>
      <h1 className="sr-only">Shop</h1>
      <div className="w-full max-w-[700px] mx-auto">
        <motion.ul className="w-full flex flex-col gap-28" {...staggerContainer}>
          {shopItems.map((item, index) => {
            return <ShopItem item={item} key={index} />
          })}
        </motion.ul>
      </div>
    </motion.div>
  )
}

export default Shop
