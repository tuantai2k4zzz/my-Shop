import React from 'react'
import {formatMoney, renderStar} from '../ultils/helper'
import label from '../assets/new (1).png'
import trending from '../assets/trending.png'
import {SelectOption} from './'
import icons from '../ultils/icons'
import {Link} from 'react-router-dom'
import path from '../ultils/path'

const {MdMenu, FaEye, FaHeart} = icons
const Product = ({data, isnew}) => {
  return (
    <div className="w-full text-base pr-5">
  <Link 
  to={`/${path.DETAIL_PRODUCT}/${data?._id}/${data?.title}`}
  className="w-full border-2 p-[15px] flex flex-col items-center relative group">
    {/* Thẻ chứa các icon SelectOption */}
    <div
      className="absolute bottom-[100px] flex justify-center gap-2 opacity-0 translate-y-5 
      group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out"
    >
      <SelectOption icon={<FaHeart />} />
      <SelectOption icon={<MdMenu />} />
      <SelectOption icon={<FaEye />} />
    </div>

    {/* Hình ảnh sản phẩm */}
    <img
      src={
        data?.thumb ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6xiTpb6Tyc-CTn4FJmXyNBuPze14R-qIJNIDHj2uQbidXRFY1Otr27ZQd69L5_drFaDY&usqp=CAU"
      }
      alt="Product"
      className="w-[274px] h-[274px] object-cover"
      key={data.id}
    />

    {/* Label sản phẩm */}
    <img
      src={isnew ? label : trending}
      alt="Label"
      className="absolute top-[25px] left-[230px] h-[25px] object-cover"
    />

    {/* Thông tin sản phẩm */}
    <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
      <span className="flex mb-1">{renderStar(data.totalRatings)}</span>
      <span className="line-clamp-1">{data?.title}</span>
      <span>{formatMoney(data.price)} VNĐ</span>
    </div>
  </Link>
</div>

  )
}

export default Product