const express = require('express')
const path = require('path')
const morgan = require('morgan')
const router = require('./router/index')
const errorHandler = require('./middleware/errorHandler')
require('./model')
const app = express()
const port = 3000

//配置req.body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/uploads',express.static(path.join(__dirname,'./public/uploads/')))
app.use('/avatars',express.static(path.join(__dirname,'./public/avatars/')))

//日志输出
app.use(morgan('dev'))

//挂载路由
app.use(router)

//挂载错误处理中间件
app.use(errorHandler())


app.listen(port, () => console.log(`Example app listening on port ${port}!`))