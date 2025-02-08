import axios from "../axios";

export const apiGetCategories = () => axios({
    url: 'productCategory/getProductCategories',
    method: 'GET'
})