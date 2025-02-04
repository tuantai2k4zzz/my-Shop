const Product = require('../models/product')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')

const createProduct = asyncHandler(async (req, res) => {
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if(req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : 'Cannot create new product'
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const {pid} = req.params
    const product = await Product.findById(pid)
    return res.json({
        success: product ? true : false,
        product: product ? product : 'Cannot get product'
    })
})

const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach(el => delete queries[el]);
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (el) => `$${el}`);
    const formateQueries = JSON.parse(queryString);
    if (queries?.title) formateQueries.title = { $regex: queries.title, $options: 'i' };
    let queryCommandFake = Product.find(formateQueries);
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommandFake = queryCommandFake.sort(sortBy)
    }
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommandFake = queryCommandFake.select(fields)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 2
    const skip = (page - 1) * limit
    queryCommandFake = queryCommandFake.skip(skip).limit(limit)
    const queryCommandReal = await queryCommandFake;
    if(Object.keys(formateQueries).length === 0){
         count = queryCommandReal.length
    }else {
        count = queryCommandReal.length; 
    }
    return res.json({
        success: queryCommandReal ? true : false,
        product: queryCommandReal ? queryCommandReal : 'Cannot get product',
        count,
    });
});
const updateProduct = asyncHandler(async (req, res) => {
    const {pid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if(req.body.title) req.body.slug = slugify(req.body.title)
    const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {new: true})
    return res.json({
        success: updateProduct ? true : false,
        product: updateProduct ? updateProduct : 'Cannot update product'
    })
})
const deleteProduct = asyncHandler(async (req, res) => {
    const {pid} = req.params
    const products = await Product.findByIdAndDelete(pid)
    return res.json({
        success: products ? true : false,
        product: products ? `user with id:${pid} is deleted!` : 'Cannot get product'
    })
})
const getAllProducts = asyncHandler(async (req, res) => {
    const response = await Product.find()
    return res.json({
        success: true,
        products: response
    })
})

const ratings = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const {star, comment, pid} = req.body 
    if(!star || !pid) throw new Error('Missing inputs')
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.some(el => el.postedBy.toString() === _id)
    if(alreadyRating) {
        // update star and comment
        await Product.updateOne( {
            _id: pid, "ratings.postedBy": _id 
        }, {
            $set: {"ratings.$.star": star, "ratings.$.comment": comment}
        }, {new: true})
    }else {
        // add star and comment
        const response = await Product.findByIdAndUpdate(pid, {
            $push: {ratings: {star, comment, postedBy: _id}}
        }, {new: true})
    }
    const ratingCount = ratingProduct.ratings.length
    const sumRatings= ratingProduct.ratings.reduce((sum, el) => sum + +el.star, 0)
    ratingProduct.totalRatings = Math.round(sumRatings * 10 / ratingCount) / 10
    await ratingProduct.save()
    return res.status(200).json({
        status: true,
        count: sumRatings
    })
})

const uploadImagesProduct = asyncHandler(async (req, res) => {
    console.log(req.file);
    return res.json('OKE')
})

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    getAllProducts,
    deleteProduct,
    updateProduct,
    ratings,
    uploadImagesProduct
}