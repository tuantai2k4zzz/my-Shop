const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler')

const createNewBrand = asyncHandler(async (req, res) => {
    if(!req.body) throw new Error('Missing inputs')

    const response = await Brand.create(req.body)
    return res.json({
        success: response ? true : false,
        createCategory: response ? response : 'Cannot create new brand'
    })
})
const updateBrand = asyncHandler(async (req, res) => {
    const {pid} = req.params
    if(!req.body.title) throw new Error('Missing inputs')
    console.log(req.body);
    const response = await Brand.findByIdAndUpdate(pid , req.body, {new: true})
    return res.json({
        success: response ? true : false,
        createCategory: response ? response : 'Cannot update brand'
    })
})
const getBrand = asyncHandler(async (req, res) => {
    const response = await Brand.find()
    return res.json({
        success: response ? true : false,
        createCategory: response ? response : 'Cannot find brand'
    })
})
const deleteBrand = asyncHandler(async (req, res) => {
    const {pid} = req.params
    if(!pid) throw new Error('cannot this brand')

    const response = await Brand.findByIdAndDelete(pid , req.body, {new: true})
    return res.json({
        success: response ? true : false,
        createCategory: response ? `delete id: ${pid} is successfully` : `Cannot delete brand with id: ${pid}`
    })
})


module.exports = {
    createNewBrand,
    updateBrand,
    getBrand,
    deleteBrand
}

