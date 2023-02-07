const express = require("express")
const app = express()
const bodyParser = require('body-parser')
// 导入session中间件
const session = require('express-session')
// 设置模板引擎
app.set('view engine', 'ejs')
// 设置模板页面存放路径
app.set('views', './views')
// 注册解析表单数据中间件
app.use(bodyParser.urlencoded({ extended: false }))
// 注册session中间件
app.use(session({
    secret:'这是加密的秘钥',
    resave:false,
    saveUninitialized:false
}))
// 把node_modules托管静态资源目录
app.use('/node_modules', express.static('./node_modules'))
app.use('/views', express.static('./views'))
// 导入router/index模块
const mainRouter = require("./router");
app.use(mainRouter )
// 导入router/user模块
const userRouter = require("./router/user");
app.use(userRouter )
// 导入router/article模块
const article = require('./router/article')
app.use(article )
app.listen(3000, () => {
    console.log('正在监听3000端口')
})