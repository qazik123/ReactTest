const express = require('express')
const router = express.Router();
const multer = require('multer');
const { UserController, PostController, CommentController, FollowController } = require('../controllers')
const authenticateToken = require('../middleware/auth')


const uploadDestination = 'uploads'

//Показиваем где хранить файли
const storage = multer.diskStorage({
	destination: uploadDestination,
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
});

const uploads = multer({
    storage: storage
})

//роути юзера
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/current', authenticateToken, UserController.currentUser)
router.get('/users/:id', authenticateToken, UserController.getUserById)
router.put('/users/:id', authenticateToken, UserController.updateUser)

//роути постов
router.post('/posts', authenticateToken, PostController.createPost)
router.get('/posts', authenticateToken, PostController.getAllPosts)
router.get('/posts/:id', authenticateToken, PostController.getPostById)
router.delete('/posts/:id', authenticateToken, PostController.deletePost)

//роути коментов
router.post('/comments', authenticateToken, CommentController.createComment)
router.delete('/comments/:id', authenticateToken, CommentController.deleteComment)

// роути фоловеров
router.post('/follow', authenticateToken, FollowController.followUser)
router.delete('/unfollow/:id', authenticateToken, FollowController.unFollowUser)

module.exports = router;
