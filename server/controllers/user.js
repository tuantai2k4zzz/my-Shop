const User = require('../models/user')
const asyncHandler = require('express-async-handler')

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
        const {role, password, ...date} = response.toObject()
        return res.json({
            success: true,
            mes: date
        })
    }else{
        throw new Error('Invalid credentials!')
    }

})


module.exports = {
    register,
    login
}
