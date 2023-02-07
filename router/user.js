let express = require("express");
let router = express.Router();
// 导入user业务处理
let {showRegisterPage,showLoginPage,reg,login,logout} = require('../controller/user')
// 请求注册页面
router.get('/register', showRegisterPage)
// 注册新用户
router.post('/register', reg)
// 请求登录页面
router.get('/login', showLoginPage)
// 登录用户
router.post('/login', login)
// 注销页面
router.get('/logout',logout)
module.exports = router;