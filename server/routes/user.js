const router = require('express').Router()
const ctrl = require('../controllers/user')
const verifyToken = require('../middlewares/verifyToken')

router.post('/register', ctrl.register)
router.post('/login', ctrl.login)
router.get('/getUser',verifyToken, ctrl.getOne)



module.exports = router