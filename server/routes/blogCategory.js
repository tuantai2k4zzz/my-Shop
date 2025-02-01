const router = require('express').Router()
const ctrl = require('../controllers/blogCategory')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')



router.post('/createBlogCategory', [verifyAccessToken, isAdmin],ctrl.createBlogCategory)
router.get('/getBlogCategories',ctrl.getBlogCategories)
router.delete('/deleteBlogCategory/:pid', [verifyAccessToken, isAdmin],ctrl.deleteBlogCategory)
router.put('/updateBlogCategory/:pid', [verifyAccessToken, isAdmin],ctrl.updateBlogCategory)

module.exports = router
