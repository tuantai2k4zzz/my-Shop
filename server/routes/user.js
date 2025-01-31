const router = require('express').Router()
const ctrl = require('../controllers/user')
const verifyToken = require('../middlewares/verifyToken')

router.post('/register', ctrl.register)
router.post('/login', ctrl.login)
router.get('/getUser',verifyToken, ctrl.getOne)
router.post('/refreshToken', ctrl.refreshAccessToken)
router.post('/logout', ctrl.logout)
router.get('/forgotPassword', ctrl.forgotPassword)
router.put('/resetPassword', ctrl.resetPassword)



module.exports = router