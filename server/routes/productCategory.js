const router = require('express').Router()
const ctrl = require('../controllers/productCategory')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')



router.post('/createProductCategory', [verifyAccessToken, isAdmin],ctrl.createCategory)
router.get('/getProductCategories',ctrl.getCategories)
router.delete('/deleteProductCategory/:pid', [verifyAccessToken, isAdmin],ctrl.deleteCategory)
router.put('/updateProductCategory/:pid', [verifyAccessToken, isAdmin],ctrl.updateCategory)

module.exports = router
