const router = require('express').Router()
const ctrl = require('../controllers/coupon')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')


router.post('/createCoupon', [verifyAccessToken, isAdmin],ctrl.createNewCoupon)
router.get('/getCoupons',ctrl.getCoupons)
router.delete('/deleteCoupon/:cid', [verifyAccessToken, isAdmin],ctrl.deleteCoupon)
router.put('/updateCoupon/:cid', [verifyAccessToken, isAdmin],ctrl.updateCoupon)

module.exports = router
