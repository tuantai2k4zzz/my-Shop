import {FaStar, FaRegStar  } from "react-icons/fa";

export const createSlug = (str) => {
    return str.replace(/ /g, '-').toLowerCase()
}
export const formatMoney = (money) => Number(money?.toFixed(1))?.toLocaleString()

export const renderStar = (number, size) => {
    if(!Number(number)) return
    const stars = []
    for(let i = 0; i < number; i++) {
        stars.push(<FaStar size={size || 16} color="yellow"/>)
    }
    for(let i = 5; i > number; i--) {
        stars.push(<FaRegStar size={size || 16} color="yellow"/>)
    }
    return stars
}