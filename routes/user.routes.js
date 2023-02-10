const Router = require('express')
const router = new Router()

const UserController = require("../controllers/user.controller")

const UserMiddleware = require('../middleware/user.middleware')


router.post('/create', UserMiddleware, UserController.createUser)
router.get('/auth', UserController.authUser)
router.get('/authToken', UserMiddleware, UserController.authToken)
router.get('/getMyInfo', UserMiddleware, UserController.getMyInfo)
router.get('/get/:id', UserMiddleware, UserController.getUser)
router.get('/getUsers', UserMiddleware, UserController.getUsers)
router.put('/update/:id', UserMiddleware, UserController.updateUser)
router.delete('/delete/:id', UserMiddleware, UserController.deleteUser)

module.exports = router;