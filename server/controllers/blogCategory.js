const BlogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler')

const createBlogCategory = asyncHandler(async (req, res) => {
    if(!req.body) throw new Error('Missing inputs')

    const response = await BlogCategory.create(req.body)
    return res.json({
        success: response ? true : false,
        createCategory: response ? response : 'Cannot create new blog category'
    })
})
const updateBlogCategory = asyncHandler(async (req, res) => {
    const {pid} = req.params
    if(!req.body.title) throw new Error('Missing inputs')
    console.log(req.body);
    const response = await BlogCategory.findByIdAndUpdate(pid , req.body, {new: true})
    return res.json({
        success: response ? true : false,
        createCategory: response ? response : 'Cannot update blog category'
    })
})
const getBlogCategories = asyncHandler(async (req, res) => {
    const response = await BlogCategory.find()
    return res.json({
        success: response ? true : false,
        createCategory: response ? response : 'Cannot find blog category'
    })
})
const deleteBlogCategory = asyncHandler(async (req, res) => {
    const {pid} = req.params
    if(!pid) throw new Error('cannot this blog category')

    const response = await BlogCategory.findByIdAndDelete(pid , req.body, {new: true})
    return res.json({
        success: response ? true : false,
        createCategory: response ? `delete id: ${pid} is successfully` : `Cannot delete blog category with id: ${pid}`
    })
})


module.exports = {
    createBlogCategory,
    updateBlogCategory,
    getBlogCategories,
    deleteBlogCategory
}

