const { User } = require('../model')
const formidable = require('formidable')
const jwt = require('../util/jwt')
const { jwtSecret, avatarDir } = require('../config/config.default')
const md5 = require('../util/md5')
const createJwt = require('../util/createJwt')


//未完成
const geoip = require('geoip-lite')

//刷新token
exports.refreshToken = async (req, res, next) => {
    try {
        const user = req.user.toJSON()

        const access_token = await createJwt({ userId: user._id }, 60 * 60 * 24 * 2)

        const refresh_token = await createJwt({ userId: user._id }, 60 * 60 * 24 * 7)

        res.status(200).json({
            code: 200,
            access_token,
            refresh_token
        })
    } catch (error) {
        next(error)
    }
}

//ip属地
exports.getAddress = async (req, res, next) => {
    try {
        const ip = geoip.lookup('183.202.222.32')

        res.status(200).json({
            ip
        })
    } catch (error) {
        next(error)
    }
}

//用户登录
exports.login = async (req, res, next) => {
    try {
        const user = req.user.toJSON()

        const access_token = await createJwt({ userId: user._id }, 60 * 60 * 24 * 2)

        const refresh_token = await createJwt({ userId: user._id }, 60 * 60 * 24 * 7)

        delete user.password
        res.status(200).json({
            code: 200,
            ...user,
            access_token,
            refresh_token
        })
    } catch (error) {
        next(error)
    }
}

//用户注册
exports.register = async (req, res, next) => {
    try {
        let user = new User(req.body.user)
        await user.save()
        user = user.toJSON()
        delete user.password
        res.status(201).json({
            code: 200,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

//获取登录用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        res.status(200).json({
            code: 200,
            message: 'Success',
            data: req.user
        })
    } catch (error) {
        next(error)
    }
}

//获取指定用户信息
exports.getOneUser = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const userInfo = await User.findById(userId)

        res.status(200).json({
            code: 200,
            message: 'success',
            userInfo
        })
    } catch (error) {
        next(error)
    }
}

//更新登录用户信息
exports.updateUserInfo = async (req, res, next) => {
    try {
        const user = req.user
        const userInfo = req.body.userInfo
        user.username = userInfo.username || user.username
        user.bio = userInfo.bio || user.bio
        user.gender = userInfo.gender || user.gender
        user.birthday = userInfo.birthday || user.birthday
        await user.save()
        res.status(200).json({
            code: 200,
            message: 'success',
        })
    } catch (error) {

        next(error)
    }
}

//设置用户头像
exports.updateUserAvatar = async (req, res, next) => {
    try {
        const form = formidable({ multiples: true, uploadDir: avatarDir, keepExtensions:true });
        // 获取协议（http或者https）
        const ht = req.protocol
        // 获取域名和端口号
        const host = req.headers.host
        form.parse(req, async (err, fields, files) => {
            
            if (err) {
                return next(err)
            }
            let url = ht + "://" + host + '/avatars/' + files.files.newFilename
            const user = req.user
            user.image = url
            await user.save()
            res.status(200).json({
                code: 200,
                message: 'success'
            })
        });
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}



