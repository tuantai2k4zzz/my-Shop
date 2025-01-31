const router = require('express').Router()
const ctrl = require('../controllers/product')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')



router.put('/createProduct',[verifyAccessToken, isAdmin], ctrl.createProduct)
router.get('/getProduct/:pid', ctrl.getProduct)
router.delete('/deleteProduct/:pid',[verifyAccessToken, isAdmin], ctrl.deleteProduct)
router.put('/updateProduct/:pid',[verifyAccessToken, isAdmin], ctrl.updateProduct)
router.get('/getProducts', ctrl.getProducts)

module.exports = router
