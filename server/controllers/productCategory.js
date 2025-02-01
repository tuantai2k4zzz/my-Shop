const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async (req, res) => {
    if(!req.body) throw new Error('Missing inputs')

    const response = await ProductCategory.create(req.body)
    return res.json({
        success: response ? true : false,
        createCategory: response ? response : 'Cannot create new product category'
    })
})
const updateCategory = asyncHandler(async (req, res) => {
    const {pid} = req.params
    if(!req.body.title) throw new Error('Missing inputs')
    console.log(req.body);
    const response = await ProductCategory.findByIdAndUpdate(pid , req.body, {new: true})
    return res.json({
        success: response ? true : false,
        createCategory: response ? response : 'Cannot update product category'
    })
})
const getCategories = asyncHandler(async (req, res) => {
    const response = await ProductCategory.find()
    return res.json({
        success: response ? true : false,
        createCategory: response ? response : 'Cannot find product category'
    })
})
const deleteCategory = asyncHandler(async (req, res) => {
    const {pid} = req.params
    if(!pid) throw new Error('cannot this product category')

    const response = await ProductCategory.findByIdAndDelete(pid , req.body, {new: true})
    return res.json({
        success: response ? true : false,
        createCategory: response ? `delete id: ${pid} is successfully` : `Cannot delete product category with id: ${pid}`
    })
})


module.exports = {
    createCategory,
    updateCategory,
    getCategories,
    deleteCategory
}

