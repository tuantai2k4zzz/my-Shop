import {renderStar, formatMoney} from '../ultils/helper'
import React from 'react'

const ProductCard = ({price, totalRatings, title, image}) => {
  return (
    <div className='w-1/4 flex-auto flex items-center h-[150px] gap-6 border shadow-lg mb-[15px] mr-[15px] cursor-pointer duration-500 ease-in-out group rounded'>
        <img src={image} alt="products" className='w-[90px] object-contain p-3 group-hover:scale-150 duration-500 ' />
        <div className='flex flex-col gap-1'>
            <span className='text-[14px] text-gray-600 hover:text-main'>{title}</span>
            <span className='text-[12px] text-gray-600'>{formatMoney(price)}VND</span>
            <span className='flex'>{renderStar(totalRatings, 12)}</span>
        </div>
        
    </div>
  )
}

export default ProductCard