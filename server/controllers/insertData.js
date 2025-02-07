const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const data = require('../../data/data2.json')
const slugify = require('slugify')
const categoryData = require('../../data/cate_brand')
const Category = require('../models/productCategory')


const fn = async (product) => {
    try {
        // Kiểm tra và tạo slug duy nhất
        let baseSlug = slugify(product?.name, { lower: true });
        let slug = baseSlug;
        let count = 1;
        while (await Product.findOne({ slug })) {
            slug = `${baseSlug}-${count}`;
            count++;
        }

        // Lấy giá tiền chính xác
        const priceMatch = product?.price.match(/\d+/g);
        const price = priceMatch ? Math.round(Number(priceMatch.join("")) / 100) : 0;

        // Lấy màu sắc
        const colorVariant = product?.variants?.find(el => el.label === 'Color');
        const color = colorVariant?.variants?.[0] || 'Red';

        await Product.create({
            title: product?.name,
            slug,
            description: product?.description,
            brand: product?.brand,
            price,
            category: product.category?.[1] || "Unknown",
            quantity: Math.floor(Math.random() * 1000),
            sold: Math.floor(Math.random() * 500),
            images: product?.images || [],
            color
        });

    } catch (error) {
        console.error(`Lỗi khi thêm sản phẩm: ${error.message}`);
    }
};

const insertProduct = asyncHandler(async (req, res) => {
    const promises = data.map(product => fn(product));
    await Promise.all(promises);

    return res.json({
        message: "OKE",
        success: true
    });
});

const fn2 = async (category) => {
    console.log(category);
    try {
        await Category.create({
            title: category?.cate,
            brand: category?.brand
        })
    } catch (error) {
        console.error(`Lỗi khi thêm sản phẩm: ${error.message}`);
        
    }  
}
const insertCategory = asyncHandler(async (req, res) => {
    const promises = categoryData.map(category => fn2(category));
    await Promise.all(promises);

    return res.json({
        message: "OKE",
        success: true
    });
});



module.exports = {
    insertProduct,
    insertCategory
};
