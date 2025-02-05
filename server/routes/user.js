const router = require('express').Router()
const ctrl = require('../controllers/user')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/register', ctrl.register)
router.post('/login', ctrl.login)
router.get('/getUser',verifyAccessToken, ctrl.getOne)
router.post('/refreshToken', ctrl.refreshAccessToken)
router.post('/logout', ctrl.logout)
router.get('/forgotPassword', ctrl.forgotPassword)
router.put('/resetPassword', ctrl.resetPassword)
router.get('/getUsers', [verifyAccessToken, isAdmin], ctrl.getUsers)
router.delete('/deleteUser', [verifyAccessToken, isAdmin], ctrl.deleteUser)
router.put('/updateUser', verifyAccessToken, ctrl.updateUser)
router.put('/updateUserByAdmin/:uid', [verifyAccessToken, isAdmin], ctrl.updateUserByAdmin)
router.put('/updateUserAddress', verifyAccessToken, ctrl.updateUserAddress)
router.put('/updateCart', verifyAccessToken, ctrl.updateCart)



module.exports = router