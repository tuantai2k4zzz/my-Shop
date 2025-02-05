const router = require('express').Router()
const ctrl = require('../controllers/order')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')


router.post('/createOrder', [verifyAccessToken], ctrl.createOrder)
router.get('/getOrder', [verifyAccessToken], ctrl.getOrder)
router.put('/updateStatusOrder/:oid', [verifyAccessToken, isAdmin], ctrl.updateStatusOrder)
router.get('/getOrders', [verifyAccessToken, isAdmin], ctrl.getOrderS)

module.exports = router