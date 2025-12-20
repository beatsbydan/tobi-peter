import React from 'react'
import LazyImage from '../../../../UI/LazyImage/LazyImage'
import './ShopItem.css'

const ShopItem = ({item}) => {
    return (
        <li className='shopItem'>
            <div className="image">
                <LazyImage src={item?.imgUrl} type="image" alt="" /> 
            </div>
            <div className='itemDetail'>
                <div className='info'>
                    <h5>{item?.title}</h5>
                    <h6>{item?.subtitle}</h6>
                </div>
                <div className='sizes'>
                    <p>AVAILABLE SIZES</p>
                    <ul>
                        {item?.availableSizes?.map((size, index) => {
                            return (
                                <li key={index}>{size}</li>
                            )
                        })}
                    </ul>
                </div>
                <a target='_blank' rel="noreferrer" href={item?.linkToItem}>CONTINUE SHOPPING</a>
            </div>
        </li>
    )
}

export default ShopItem