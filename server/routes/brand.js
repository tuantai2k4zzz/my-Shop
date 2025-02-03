const router = require('express').Router()
const ctrl = require('../controllers/brand')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')


router.post('/createBrand', [verifyAccessToken, isAdmin],ctrl.createNewBrand)
router.get('/getBrands',ctrl.getBrand)
router.delete('/deleteBrand/:pid', [verifyAccessToken, isAdmin],ctrl.deleteBrand)
router.put('/updateBrand/:pid', [verifyAccessToken, isAdmin],ctrl.updateBrand)

module.exports = router
