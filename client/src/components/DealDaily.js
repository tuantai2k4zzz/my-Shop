import {CountDown} from '../components'
import {formatMoney, renderStar} from '../ultils/helper'
import React, {useState, useEffect, memo} from 'react'
import icon from '../ultils/icons'
import { apiGetProducts } from '../apis/product'

const { FaStar, MdMenu } = icon
const DealDaily = () => {

    
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [expireTime, setExpireTime] = useState(false)
    const [dealDaily, setDealDaily] = useState(null)

    const size = 16
    const fetchDealDaily = async() => {
        const response = await apiGetProducts({limit: 1, page: Math.round(Math.random() * 6), totalRatings: 5})
        if(response.success) {
            setDealDaily(response.product[0])   
            
            const h = 24 - new Date().getHours()
            const m = 60 - new Date().getMinutes()
            const s = 60 - new Date().getSeconds()
            setHour(h)
            setMinute(m)
            setSecond(s)
        }
    }
     // Khi expireTime thay đổi, gọi API và reset bộ đếm
     useEffect(() => {
        fetchDealDaily();
    }, [expireTime]);

    // Bộ đếm chạy khi component mount
    useEffect(() => {
        const idInterval = setInterval(() => {
            setSecond(prevSecond => {
                if (prevSecond > 0) return prevSecond - 1;

                setMinute(prevMinute => {
                    if (prevMinute > 0) return prevMinute - 1;

                    setHour(prevHour => {
                        if (prevHour > 0) return prevHour - 1;

                        // Khi hết thời gian, kích hoạt expireTime và dừng bộ đếm
                        clearInterval(idInterval);
                        setExpireTime(true);
                        return 0;
                    });
                    return 59;
                });
                return 59;
            });
        }, 1000);
        return () => clearInterval(idInterval);
    }, []); 
  return (
    <div className='border w-full flex-auto'>
        <div className='flex items-center justify-between p-4 border-b w-full'>
            <span className='flex-1 flex items-center'><FaStar color='#DD1111' size={20}/></span>
            <span className='flex-8 font-semibold text-[20px] flex justify-center items-center text-gray-700'>DEAL DAILY</span>
            <span className='flex-1'></span>
        </div>
        <div className='w-full flex flex-col items-center pt-8 '>
            <img src={dealDaily?.thumb || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6xiTpb6Tyc-CTn4FJmXyNBuPze14R-qIJNIDHj2uQbidXRFY1Otr27ZQd69L5_drFaDY&usqp=CAU'} alt="" 
            className='w-full object-contain '/>
            <span className='flex mb-1 text-center mt-5'>{renderStar(dealDaily?.totalRatings, size)}</span>
            <span className='line-clamp-1 py-2'>{dealDaily?.title}</span>
            <span>{formatMoney(dealDaily?.price)} VNĐ</span>
        </div>
        <div className='px-4 mt-4'>
            <div className='flex items-center gap-2 justify-center my-5'>
                <CountDown unit={'Hours'} number={hour} />
                <CountDown unit={'Minutes'} number={minute}/>
                <CountDown unit={'Second'} number={second}/>
            </div>
            <button
            type='button'
            className='flex py-2 gap-2 items-center justify-center w-full text-white bg-main hover:bg-gray-800 font-medium'
            >
                <MdMenu/>
                <span>OPTIONS</span>
            </button>
        </div>

    </div>
  )
}

export default memo(DealDaily)