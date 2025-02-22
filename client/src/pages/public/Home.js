import icons from '../../ultils/icons'
import {apiGetCategories} from '../../apis'
import React, {useState, useEffect} from 'react'
import {Banner, Sidebar, BestSeller, DealDaily, FeatureProduct, Arrivals } from '../../components'

const {MdArrowForwardIos } = icons
const Home = () => {

  const [data, setData] = useState([])
  useEffect(() => {
    fetchDataCategories()
  }, [])

  const fetchDataCategories = async() => {
    const response = await apiGetCategories()
    return setData(response.createCategory)
  }
  return (
   <>
    <div className='w-main flex'>
      <div className='flex flex-col gap-5 w-[25%] flex-auto'>
        <Sidebar/>
        <DealDaily/>
      </div>
      <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
        <Banner />
        <BestSeller/>
      </div>
    </div>
    <div className='my-8'>
        <FeatureProduct/>
    </div>
    <div className='my-8'>
      <h3 className='py-[15px] text-[20px] font-semibold border-b-2 border-main'>NEW Arrivals</h3>
      <Arrivals/>
    </div>
    <div className='my-8'>
      <h3 className='py-[15px] text-[20px] font-semibold border-b-2 border-main'>HOT COLLECTIONS</h3>
      <div className='w-full flex flex-wrap mt-[20px] gap-5 justify-center text-gray-700'>
        {data ? data?.map(item => (
            <div key={item?._id} className='flex w-[380px] h-[230px] p-[15px] items-center gap-7 border'>
              <div>
              <img src={item?.image} alt="" />
              </div>
              <div>
                <h3 className='font-semibold pb-3'>{item?.title}</h3>
                <ul>{item?.brand?.map(el => (
                  <li key={el} className='text-[14px] flex items-center gap-1 hover:text-main cursor-pointer'><MdArrowForwardIos/>{el}</li>
                ))}</ul>
              </div>
            </div>
        )) : <h3>Loading...</h3>}
      </div>
    </div>
    <div>
    <h3 className='py-[15px] text-[20px] font-semibold border-b-2 border-main'>BLOG POSTS</h3>
    </div>
    </>
  )
}

export default Home