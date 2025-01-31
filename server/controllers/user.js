const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt')

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
 

module.exports = {
    register,
    login,
    getOne
}
