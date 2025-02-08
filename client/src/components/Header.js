import React from 'react'
import logo from '../assets/logo1.png'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import path from '../ultils/path'

const Header = () => {
  const {MdPhone, MdEmail, IoBagSharp, FaRegUserCircle} = icons
  return (
    <div className='border w-main h-[110px] py-[35px] flex justify-between items-center'>
      <Link to={path.HOME}>
        <img src={logo} alt="logo DIGITAL WORLD" className='w-[234px] object-contain'/>
      </Link>
      <div className='flex text-[13px] gap-4 border-gray-800items-center'>
        <div className='flex flex-col  items-center px-4'>
          <span className='flex items-center gap-4'>
            <MdPhone color='red'/>
            <span className='font-semibold'>(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className='flex flex-col items-center border-gray-500 px-4 border-l'>
          <span className='flex items-center gap-4'>
              <MdEmail color='red'/>
              <span className='font-semibold'> support@tadathemes.com</span>
            </span>
          <span>Online Support 24/7</span>
        </div>
        <div className='flex justify-center items-center gap-2 border-gray-500 p-[14px] border-l'>
          <IoBagSharp color='red'/>
          <span>0 item(s)</span>
        </div>
        <div className='flex justify-center items-center border-gray-500 p-[14px]  border-l'>
          <FaRegUserCircle/>
        </div>
      </div>
    </div>
  )
}

export default Header