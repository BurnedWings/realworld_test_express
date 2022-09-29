const express = require('express')
const router = express.Router()

//用户相关路由
router.use(require('./user'))

// //文章相关路由
router.use('/articles',require('./article'))

// //标签相关路由
// router.use('/tag',require('./tag'))

// //用户资料相关路由
// router.use('/profiles',require('./profile'))




module.exports=router