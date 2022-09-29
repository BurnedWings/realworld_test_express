const { Article } = require('../model')
const formidable = require('formidable')
const config = require('../config/config.default')

//创建文章
exports.createArticle = async (req, res, next) => {
    try {
        const article = new Article(req.body.article)
        article.author = req.user._id
        article.populate('author')
        await article.save()
        res.status(200).json({
            code: 200,
            message: 'success',
            article
        })
    } catch (error) {
        next(error)
    }
}

//获取文章列表
exports.getArticleList = async (req, res, next) => {
    try {
        const articles = await Article.find()
            .populate('author')

        res.status(200).json({
            code: 200,
            message: 'success',
            data: articles
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

//获取文章详情
exports.getDetailArticle = async (req, res, next) => {
    try {
        const articleId = req.body.articleId
        const detailArticle = await Article.findById(articleId)
            .populate('author')
        res.status(200).json({
            code: 200,
            message: 'success',
            data: detailArticle
        })
    } catch (error) {

    }
}

//获取指定用户文章
exports.getArticlesOfOneUser = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const articles = await Article.find({
            author: userId
        })
        res.status(200).json({
            code: 200,
            message: 'success',
            articles
        })
    } catch (error) {
        next(error)
    }
}

//处理文章图片
exports.handleImg = async (req, res, next) => {
    try {
        const form = formidable({ multiples: true, uploadDir:config.uploadDir, keepExtensions: true });
        // 获取协议（http或者https）
        const ht = req.protocol
        // 获取域名和端口号
        const host = req.headers.host
        form.parse(req, (err, fields, files) => {
            if (err) {
                return next(err)
            }

            let url = ht + "://" + host + '/uploads/' + files.files.newFilename
            res.status(200).json({
                code: 200,
                message: 'success',
                url
            })
        });

    } catch (error) {
        next(error)
    }
}

//搜索文章
exports.searchArticle = async (req, res, next) => {
    try {
        const inputInfo = req.body.inputInfo
        const query = new RegExp(inputInfo,'i')
        const articles = await Article.find({
            $or:[{title:{$regex:query}},{description:{$regex:query}}]
        })
        res.status(200).json({
            code:200,
            message:'success',
            articles
        })
    } catch (error) {
        next(error)
    }
}

