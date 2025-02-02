const router = require('express').Router()
const ctrl = require('../controllers/blog')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/createBlog', [verifyAccessToken, isAdmin], ctrl.createNewBlog)
router.put('/updateBlog/:pid', [verifyAccessToken, isAdmin], ctrl.updateBlog)
router.get('/getBlogs', ctrl.getBlogs)
router.put('/likeBlog', verifyAccessToken, ctrl.likeBlog)

module.exports = router
