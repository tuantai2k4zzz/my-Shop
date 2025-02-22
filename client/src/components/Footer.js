import icons from '../ultils/icons'
import React, {memo} from 'react'

const {MdEmail} = icons
const Footer = () => {
  return (
    <div className='w-full'>
        <div className='h-[103px] w-full bg-main flex items-center justify-center'>
          <div className='w-main flex items-center justify-between '>
            <div className='flex flex-col text-white flex-1'>
              <span className='text-[20px] text-gray-100'>Sign up to Newsletter</span>
              <small className='text-[13px] text-gray-300'>Subscribe now and receive weekly newsletter</small>  
            </div>
              <div className='flex-1 flex items-center'>
                <input 
                type="text" 
                className='p-4 pr-0 rounded-l-full w-full bg-[#F04646] outline-none text-gray-100 placeholder:text-sm placeholder:text-gray-200 placeholder:italic placeholder:opacity-50'
                placeholder='Email address'
                />
                <div className='h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center justify-center'>
                  <MdEmail color='white' size={18}/>
                </div>
              </div>
          </div>
        </div>
        <div className='h-[407px] w-full bg-gray-900 flex items-center justify-center'>
          <div className='w-main flex text-white text-[13px]'>
            <div className='flex-2 flex flex-col gap-2'>
              <h3 className='mb-[20px] text-[15px] font-medium border-main border-l-2 pl-[15px] '>ABOUT US</h3>
              <span>
                <span>Address:</span>
                <span className='opacity-70'> 474 Ontario St Toronto, ON M4X 1M7 Canada</span>
              </span>
              <span>
                <span>Phone: </span>
                <span className='opacity-70'>(+1234)56789xxx</span>
              </span>
              <span>
                <span>Mail: </span>
                <span className='opacity-70'>tadathemes@gmail.com</span>
              </span>
            </div>
            <div className='flex-1 flex flex-col gap-2 '>
              <h3 className='mb-[20px] text-[15px] font-medium border-main border-l-2 pl-[15px] '>INFORMATION</h3>
              <span>Typography</span>
              <span>Gallery</span>
              <span>Store Location</span>
              <span>Today's Deals</span>
              <span>Contact</span>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <h3 className='mb-[20px] text-[15px] font-medium border-main border-l-2 pl-[15px] '>WHO WE ARE</h3>
              <span>Help</span>
              <span>Free Shipping</span>
              <span>FAQs</span>
              <span>eturn & Exchange</span>
              <span>estimonials</span>
            </div>
            <div className='flex-1 '>
            <h3 className='mb-[20px] text-[15px] font-medium border-main border-l-2 pl-[15px]'>#DigitalWorldStore</h3>
            </div>
          </div>
        </div>
    </div>
  )
}

export default memo(Footer)