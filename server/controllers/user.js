const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../ultil/sendmail')
const crypto = require('crypto')

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

    const response = await User.findOne({email})
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
module.exports = {
    register,
    login,
    getOne,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword
}
