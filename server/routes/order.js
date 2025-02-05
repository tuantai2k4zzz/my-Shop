const router = require('express').Router()
const ctrl = require('../controllers/order')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')


router.put('/createOrder', [verifyAccessToken], ctrl.createOrder)

module.exports = router