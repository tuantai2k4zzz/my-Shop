const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body
    if(!title || !description || !category) throw new Error('Missing inputs')
        const response = await Blog.create(req.body)
        return res.json({
            success: response ? true : false,
            createCategory: response ? response : 'Cannot create new blog'
        }) 
})
const updateBlog = asyncHandler(async (req, res) => {
    const {pid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
        const response = await Blog.findByIdAndUpdate(pid, req.body, {new: true})
        return res.json({
            success: response ? true : false,
            createCategory: response ? response : 'Cannot update new blog'
        }) 
})
const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find()
    return res.json({
        success: response ? true : false,
        createCategory: response ? response : 'Cannot get blog'
    }) 
})

const likeBlog = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const {bid} = req.params
    
    if(!bid) throw new Error('Missing inputs')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if(alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            response
        })
    }
    const isLiked = blog?.likes?.find(el => el.toString() === _id)
    if(isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            response
        })
    }else {
        const response = await Blog.findByIdAndUpdate(bid, {$push: {likes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            response
        })
    }
})

const disLikeBlog = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const {bid} = req.params
    
    if(!bid) throw new Error('Missing inputs')
    const blog = await Blog.findById(bid)
    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id)
    if(alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            response
        })
    }
    const isDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if(isDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            response
        })
    }else {
        const response = await Blog.findByIdAndUpdate(bid, {$push: {dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            response
        })
    }
})
const excludedFields = 'firstname lastname'
const getBlog = asyncHandler(async (req, res) => {
    const {bid} = req.params
    const blog = await Blog.findByIdAndUpdate(bid, {$inc: {numberViews: 1}}, {new: true})
        .populate('likes dislikes', excludedFields)

    return res.json({
        success: blog ? true : false,
        blog
    })
})
const deleteBlog = asyncHandler(async (req, res) => {
    const {bid} = req.params
    const blog = await Blog.findByIdAndDelete(bid)
    return res.json({
        success: blog ? true : false,
        rs: blog ? `Blog has id: ${bid} is deleted` : 'Cannot delete this blog'
    })
})

const uploadImagesBlog = asyncHandler(async (req, res) => {
    const {bid} = req.params
    if(!req.file) throw new Error('Missing inputs')
    const response = await Blog.findByIdAndUpdate(bid, {
        image: req.file.path
        }, {new: true})
    return res.json({
        success: response ? true : false,
        updatedProduct: response ? response : 'Cannot update this Blog'
    })
})
module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    disLikeBlog,
    getBlog,
    deleteBlog,
    uploadImagesBlog
}