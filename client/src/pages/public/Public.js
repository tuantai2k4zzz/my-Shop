import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Navigation, Headertop, Footer } from '../../components'


const Public = () => {
  return (
    <div className='w-full flex items-center flex-col '>
      <Headertop/>
        <Header/>
        <Navigation/>
      <div className='w-main '>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default Public