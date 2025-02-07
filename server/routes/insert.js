const router = require('express').Router()
const ctrls = require('../controllers/insertData')

router.post('/insertProduct', ctrls.insertProduct)
router.post('/insertCategory', ctrls.insertCategory)

module.exports = router