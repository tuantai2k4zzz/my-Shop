const Order = require('../models/order')
const User = require('../models/user')
const asyncHandler = require("express-async-handler")

const createOrder = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const userCart = await User.findById(_id).select('cart')
    console.log(userCart);
    return res.json({
        success: true,
        createOrder: userCart
    })
}) 

module.exports = {
    createOrder
}