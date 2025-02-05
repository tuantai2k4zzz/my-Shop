const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../ultil/sendmail')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
const product = require('../models/product')

const register = asyncHandler(async (req, res) => {
    const {email, password, firstname, lastname} = req.body
    if(!email || !password || !firstname || !lastname) return res.status(400).json({
        success: false,
        mes: "Missing input!"
    })

    const user = await User.findOne({email})
    if(user) throw new Error("User has existed!")
    const newUser = await User.create(req.body)
    return res.json({
        success: newUser ? true : false,
        mes: newUser ? "Register is successfully! Please go login" : "Something went wrong"
    })
 
})
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) return res.status(400).json({
        success: false,
        mes: "Missing input!"
    })

    const response = await User.findOne({email}).select('-refreshToken')
    if(!response) throw new Error('User not found!')
    const isCorrectPassword = await response.isCorrectPassword(password)
    if(isCorrectPassword && response) {
        const {role, password, ...data} = response.toObject()
        const accessToken = generateAccessToken(response._id, role)
        const refreshToken = generateRefreshToken(response._id)
        await User.findByIdAndUpdate(response._id, {refreshToken}, {new: true})
        res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000})
        return res.json({
            success: true,
            accessToken,
            mes: data
        })
    }else{
        throw new Error('Invalid credentials!')
    }

})

const getOne = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const user = await User.findById(_id).select('-refreshToken -role -password')
    return res.json({
        success: true,
        user
    })
})
 
const refreshAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if(!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookie!')
    jwt.verify(cookie.refreshToken, process.env.JWT_SECRET, async (err, decode) => {
        if(err) throw new Error('Invalid refresh token')
        const response = await User.findOne({_id: decode._id, refreshToken: cookie.refreshToken})
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken : response ? generateAccessToken(response._id, response.role) : "Refresh token invalid"
        })
    })

})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if(!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookie')
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ''}, {new: true})

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.json({
        success: true,
        mes: 'logout is done!'
    })

})

const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.query
    if(!email) throw new Error('Missing email!')
    const user = await User.findOne({email})
    if(!user) throw new Error('User not found')
    const resetToken = await user.createPasswordChangedToken()
    await user.save()
    

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a
    href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`

    const data = {
        email,
        html
    }
    const rs = await sendMail(data)
    return res.status(200).json({
        success: true,
        rs
    })
})
const resetPassword = asyncHandler(async (req, res) => {
    const {password, token} = req.body
    if(!password || !token) throw new Error('Something went wrong!')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({passwordResetToken, passwordResetExpires: {$gt: Date.now()}})
    if(!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    user.passwordChangedAt = Date.now()
    user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Update password successfully' : 'Something went wrong!'
    })
})

const getUsers = asyncHandler(async (req, res) => {
    const response = await User.find()
    return res.json({
        success: response ? true : false,
        users: response
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const {_id} = req.query
    if(!_id) throw new Error('Missing input')
    const response = await User.findByIdAndDelete(_id)
    return res.json({
        success: response ? true : false,
        mes: response ? `user with id:${_id} is deleted!` : 'Cannot find user'
    })
})
const updateUser = asyncHandler(async (req, res) => {
    const {_id} = req.user
    if(!_id || Object.keys(req.body).length === 0) throw new Error('Missing input')
    if (req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const response = await User.findByIdAndUpdate(_id, req.body, {new: true})
    response.save()
    return res.json({
        success: response ? true : false,
        mes : response ? response : "Something went wrong!"
    })
})
const updateUserByAdmin = asyncHandler(async (req, res) => {
    const {uid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error('Missing input')
    if (req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const response = await User.findByIdAndUpdate(uid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        mes : response ? response : "Something went wrong!"
    })
})
const updateUserAddress = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const user = await User.findById(_id);
    if (!user) {
        return res.status(404).json({
            success: false,
            mes: "User not found"
        });
    }
    const oldAddress = user.address && user.address.some(el => el === req.body.address);
    if (oldAddress) {
        throw new Error('Your address is already there');
    }
    if (!req.body.address) {
        throw new Error('Missing inputs');
    }
    const response = await User.findByIdAndUpdate(_id, {$push: {address: req.body.address}}, {new: true});
    return res.json({
        success: response ? true : false,
        mes: response ? response : "Update user something went wrong!"
    });
});
// Logic giỏ hàng 
const updateCart = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const {pid, quantity, color} = req.body
    if(!pid || !quantity || !color) throw new Error('Missing inputs')
    const user = await User.findById(_id).select('cart')
    const alreadyProduct = user?.cart.find(el => el.product.toString() === pid)
    console.log(user);
    if(alreadyProduct) {
        const alReadyColor = user?.cart.find(el => el.color === color)
        if(alReadyColor) {
            const response = await User.updateOne({_id, 'cart.product': pid, 'cart.color': color}, {$inc: {'cart.$.quantity': quantity}}, {new: true})
            return res.status(200).json({
                success: response ? true : false,
                cart: response ? response : "Cannot update cart"
            })
        } else {
            const response = await User.findByIdAndUpdate(_id, {$push: {cart: {product: pid, quantity, color}}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            cart: response ? response : "Cannot update cart"
        })
        }
        
    } else {
        const response = await User.findByIdAndUpdate(_id, {$push: {cart: {product: pid, quantity, color}}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            cart: response ? response : "Cannot update cart"
        })
    }
})
module.exports = {
    register,
    login,
    getOne,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateUserAddress,
    updateCart
}
