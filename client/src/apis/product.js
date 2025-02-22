import axios from "../axios";

export const apiGetProducts = async (params) => {
    try {
      const response = await axios({
        url: 'product/getProducts', 
        method: 'GET',
        params
      });
      return response; // Phải đảm bảo rằng response có key `success` và `products`
    } catch (error) {
      return { success: false, products: [] }; // Trả về giá trị mặc định nếu lỗi
    }
  };
  