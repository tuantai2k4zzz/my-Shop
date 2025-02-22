import labal from '../assets/new (1).png'
import { SelectOption } from './'
import { formatMoney } from '../ultils/helper'
import icons from '../ultils/icons'
import React from 'react'

const { MdMenu, FaEye, FaHeart } = icons

const ProductArrivals = ({ data }) => {
  return (
    <div className='relative flex w-[381px] h-[410px] mt-5 ml-[95px] border flex-col p-5 group overflow-hidden'>

      {/* Hình ảnh sản phẩm và nhãn */}
      <div className='relative flex items-center justify-center'>
        <img
          src={labal}
          alt=""
          className='relative w-[70px] right-[-270px] top-[-130px]'
        />
        <img
          src={data?.thumb || 'https://via.placeholder.com/270'}
          alt=""
          className='h-[270px] object-contain mb-10 transition-all duration-500'
        />
      </div>

      {/* Hiệu ứng hover hiển thị nút chọn */}
      <div className='absolute top-[50%] left-1/2 -translate-x-1/2 flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out'>
        <SelectOption icon={<MdMenu/>}/>
        <SelectOption icon={<FaEye />} />
        <SelectOption icon={<FaHeart />} />
      </div>

      {/* Thông tin sản phẩm */}
      <div className='flex flex-col'>
        <span className='text-[16px] text-gray-700 font-semibold'>{data?.title}</span>
        <span className='text-red-500 font-bold'>{formatMoney(data?.price)} VND</span>
      </div>

      {/* Mô tả sản phẩm */}
      <span className='text-[14px] text-gray-700 pt-2'>{data?.description}</span>
    </div>
  )
}

export default ProductArrivals
