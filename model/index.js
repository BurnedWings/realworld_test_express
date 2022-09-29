const mongoose = require('mongoose');
const {dbUrl} = require('../config/config.default')
mongoose.connect(dbUrl)

var db = mongoose.connection

db.on('err',(err)=>{
    console.log('数据库连接失败',err)
})

db.once('open',()=>{
    console.log('数据库连接成功')
})

//组织导出模型类
module.exports = {
    User:mongoose.model('User',require('./user')),
    Article:mongoose.model('Article',require('./article')),
}
