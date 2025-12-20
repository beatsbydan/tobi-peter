import React from 'react'
import { motion } from 'framer-motion'
import './Shop.css'
import ShopItem from './shopItem/ShopItem'

const Shop = () => {
    const shopItems = [
        {
            imgUrl: "https://res.cloudinary.com/dlgzlrzfh/image/upload/v1766181018/lamb_x_Gospel_house_collab_3_1_hknczz.png",
            title: "GOSPEL HOUSE",
            subtitle: "GH TEE E1",
            availableSizes: [
                "M", "L"
            ],
            linkToItem:"https://paystack.shop/gospel-house"
        },
        {
            imgUrl: "https://res.cloudinary.com/dlgzlrzfh/image/upload/v1766181019/LAMB_X_GOSPEL_HOUSE_WHITE_2_nxewar.png",
            title: "GOSPEL HOUSE",
            subtitle: "GH TEE E2",
            availableSizes: [
                "M", "L"
            ],
            linkToItem:"https://paystack.shop/gospel-house"
        }
    ]

    return (
        <motion.div 
            className="epk"
            initial={{width:'100%', opacity: 0}}
            animate={{width:'100%', opacity: 1}}
            exit={{x:-window.innerWidth, opacity:0, transition: {duration: 0.7}}}
        >
            <div className='shop'>
                <ul className='shopItemsContainer'>
                    {shopItems.map((item, index)=>{
                        return <ShopItem item={item} key={index}/>
                    })}
                </ul>
            </div>
        </motion.div>
    )
}

export default Shop