import React from 'react'
import { NavLink } from 'react-router-dom'
import {createSlug} from '../ultils/helper'
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const {categories} = useSelector(state => state.app)
  return (
    <div className='flex flex-col border'>
      {categories?.map(el => (
        <NavLink
          to={createSlug(el.title)}
          key={el.title}
          className={({isActive}) => isActive ? 'bg-main hover:text-name text-white' : 'hover:text-main px-5 pt-[15px] pb-[14px] text-sm'}
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar