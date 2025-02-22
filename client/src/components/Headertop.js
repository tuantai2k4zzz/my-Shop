import path from '../ultils/path'
import React from "react";
import { Link } from "react-router-dom";
// import icons from "../ultils/icons";

// const { FaMoneyBill, IoIosArrowDown, IoIosArrowUp, IoLogoGoogle, FaFacebookF, FaTwitter, FaInstagramSquare } = icons;

const Headertop = () => {


  return (
    <div className='h-[32px] w-full bg-main flex items-center justify-center'>
        <div className='w-main flex items-center justify-between text-xs text-white'>
          <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
          <Link to={path.LOGIN} className='hover:text-gray-800'>Sign In or Create Account</Link>
        </div>
    </div>
  );
};

export default Headertop;
