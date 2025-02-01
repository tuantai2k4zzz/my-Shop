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
    const queryCommandReal = await queryCommandFake; // Thực thi truy vấn
    console.log(queryCommandReal);
    const count = await Product.countDocuments(formateQueries); // Đếm số kết quả khớp
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

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct
}