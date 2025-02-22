import {apiGetProducts} from '../apis/'
import {ProductCard} from '../components'
import React, {useState, useEffect} from 'react'

const FeatureProduct = () => {
    const [products, setProducts] = useState(null)
    const fetchProducts = async() => {
        const response = await  apiGetProducts({limit: 9, page: Math.round(Math.random() * 2),})
        if(response.success) {
            setProducts(response?.product)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])
  return (
    <div className='w-full'>
        <h3 className='py-[15px] text-[20px] font-semibold border-b-2 border-main'>FEATURE PRODUCTS</h3>
        <div className='flex flex-wrap mt-[15px]'>
            {products?.map(el => (
            <ProductCard 
            key={el._id} 
            image={el?.thumb} 
            title={el?.title} 
            totalRatings={el?.totalRatings} 
            price={el?.price}/>
        ))}
        </div>
        <div className='w-[1/3] flex flex-auto gap-5 justify-center mt-5 '>
            <div className='cursor-pointer group'>
                <img
                src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661" 
                alt="" 
                />
            </div>
            <div className='flex flex-col gap-7 items-center cursor-pointer mt-2'>
                <img 
                src="//digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661" 
                alt="" 
                />
                <img 
                src="//digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661" 
                alt="" 
                />
            </div>
            <div className='cursor-pointer'>
                <img 
                src="//digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661" 
                alt="" 
                />
            </div>
        </div>
    </div>
  )
}

export default FeatureProduct