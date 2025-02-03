const router = require('express').Router()
const ctrl = require('../controllers/blog')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/createBlog', [verifyAccessToken, isAdmin], ctrl.createNewBlog)
router.put('/updateBlog/:pid', [verifyAccessToken, isAdmin], ctrl.updateBlog)
router.get('/getBlogs', ctrl.getBlogs)
router.put('/likeBlog/:bid', verifyAccessToken, ctrl.likeBlog)
router.put('/disLikeBlog/:bid', verifyAccessToken, ctrl.disLikeBlog)
router.get('/getBlog/:bid', verifyAccessToken, ctrl.getBlog)
router.delete('/deleteBlog/:bid', [verifyAccessToken, isAdmin], ctrl.deleteBlog)

module.exports = router
