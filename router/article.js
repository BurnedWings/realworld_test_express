const express = require('express')
const router = express.Router()
const articleCtrl = require('../controller/article')
const auth = require('../middleware/auth')

//创建文章
router.post('/', auth, articleCtrl.createArticle)

//获取文章列表
router.get('/', articleCtrl.getArticleList)

//获取文章详情
router.post('/getDetailArticle', articleCtrl.getDetailArticle)

//获取指定用户文章
router.get('/:userId', articleCtrl.getArticlesOfOneUser)

//文章图片处理
router.post('/handleImg', auth, articleCtrl.handleImg)

//搜索文章
router.post('/searchArticle', articleCtrl.searchArticle)

module.exports = router