const router = require('express').Router()
const ctrl = require('../controllers/product')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')



router.put('/createProduct',[verifyAccessToken, isAdmin], ctrl.createProduct)
router.get('/getProducts', ctrl.getProducts)
router.get('/getAllProducts', ctrl.getAllProducts)
router.put('/ratings', verifyAccessToken, ctrl.ratings)
router.get('/getProduct/:pid', ctrl.getProduct)
router.delete('/deleteProduct/:pid',[verifyAccessToken, isAdmin], ctrl.deleteProduct)
router.put('/updateProduct/:pid',[verifyAccessToken, isAdmin], ctrl.updateProduct)

module.exports = router
