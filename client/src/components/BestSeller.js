import React, { useState, useEffect } from 'react';
import { apiGetProducts } from '../apis/product';
import Product from './Product';
import Slider from 'react-slick';
const tabs = [
  { id: 1, name: 'Best Seller' },
  { id: 2, name: 'New Arrivals' },
];
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
        breakpoint: 1024,
        settings: {
            slidesToShow: 2,
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 1,
        }
    }
]
};
const BestSeller = () => {
  useEffect(() => {
    fetchProducts();
  }, []);

  const [bestSeller, setBestSeller] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
 
  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: '-price' }),
      apiGetProducts({ sort: '-createdAt' }),
    ]);
    if (response[0]?.success) {
      setBestSeller(response[0]?.product || []);
    }
    if (response[1]?.success) {
      setNewProducts(response[1]?.product || []);
    }
  };
  // Chọn danh sách sản phẩm dựa trên `activeTab`
  const productsToShow = activeTab === 1 ? bestSeller : newProducts;
     useEffect(() => {
  }, [bestSeller, newProducts, activeTab]); // Theo dõi các giá trị thay đổi
  return (
    <div>
      {/* Tabs */}
      <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
        {tabs.map((el) => (
          <span
            className={`cursor-pointer font-semibold capitalize border-r pr-6 text-gray-400 ${
              activeTab === el.id ? 'text-gray-900' : ''
            }`}
            key={el.id}
            onClick={() => setActiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      {/* Slider chỉ render khi có dữ liệu */}
      <div className="mt-4 mx-[-10px]">
        {productsToShow ? (
          <Slider {...settings}>
            {productsToShow.map((product) => (
              <Product key={product._id} data={product} isnew={activeTab === 1 ? true : false} />
            ))}
          </Slider>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className='flex w-full gap-5 mt-4'>
          <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657" 
          alt=""
          className='flex-1 object-container'
          />
          <img src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657" 
          alt="" 
          className='flex-1 object-container'
          />
      </div>
      
    </div>
  );
};

export default BestSeller;
