import { ProductArrivals } from '../components';
import { apiGetProducts } from '../apis';
import React, { useState, useEffect, memo } from 'react';
import Slider from "react-slick";

const settings = {
    dots: true,
    infinite: true,
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

const Arrivals = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await apiGetProducts({ limit: 3, page: 3 });
            if (response?.product) {
                setProducts(response.product); // Kiểm tra lại key API trả về
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    return (
        <Slider {...settings}>
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product._id}>
                        <ProductArrivals data={product} />
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </Slider>
    );
};

export default memo(Arrivals);
