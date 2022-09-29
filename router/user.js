const express = require('express')
const router = express.Router()
const userCtrl = require('../controller/user')
const auth = require('../middleware/auth')
const userValidator = require('../validator/user')
const refreshToken = require('../middleware/refreshToken')

//刷新token
router.put('/users/refreshToken', refreshToken, userCtrl.refreshToken)

router.get('/users/getAddress', userCtrl.getAddress)

//用户登录
router.post('/users/login', userValidator.login, userCtrl.login)

//用户注册
router.post('/users/register', userValidator.register, userCtrl.register)

//获取当前登录用户信息
router.get('/user', auth, userCtrl.getCurrentUser)

//获取指定用户信息
router.get('/user/:userId', userCtrl.getOneUser)

//更新登录用户信息
router.post('/user', auth, userCtrl.updateUserInfo)

//设置用户头像
router.post('/user/avatar',auth,userCtrl.updateUserAvatar)


module.exports = router