const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '127.0.0.1',
    database: 'mysql_001',
    user: 'root',
    password: 'root'
})
// 展示注册页面
const showRegisterPage = (req, res) => {
    res.render('./user/register.ejs', {})
}
// 注册的业务逻辑
const reg = (req, res) => {
    const body = req.body
    // 判断用户数据是否输入完整
    if (body.username.trim().length <= 0 || body.password.length <= 0 || body.mail.trim().length <= 0) {
        return res.send({
            mes: '请填写完整的表单数据在注册用户',
            status: 501
        })
    }
    // 查询用户名是否重复
    const sql1 = "select count(*) as count from blog_users where username=?"
    conn.query(sql1, body.username, (err, result) => {
        // 查询失败
        if (err) return res.send({
            msg: '用户名查重失败',
            status: 502
        })
        // 查询成功
        if (result[0].count !== 0) return res.send({
            msg: '请更换其他用户名',
            status: 503
        })
        // 执行注册的业务逻辑
        const sql2 = "insert into blog_users set ?"
        conn.query(sql2, body, (err, result) => {
            if (err) return res.send({
                msg: '注册新用户失败',
                static: 504
            })
            if (result.affectedRows !== 1) return res.send({
                msg: '注册新用户失败',
                static: 505
            })
            res.send({
                msg: '注册新用户成功',
                status: 200
            })
        })
    })
}
// 展示登录页面
const showLoginPage = (req, res) => {
    res.render('./user/login.ejs', {})
}
// 登录的业务逻辑
const login = (req, res) => {
    // 获取表单中的数据
    const body = req.body
    // 执行sql语句，查询用户是否存在
    const sql1 = 'select * from blog_users where username=? and password=?'
    conn.query(sql1, [body.username, body.password], (err, result) => {
        // 查询sql语句失败 登录失败
        if (err) return res.send({
            msg: '用户登录失败,请检查账号或密码',
            static: 501
        })
        // 如果查询的结果条数不为1 查询失败
        if (result.length !== 1) return res.send({
            msg: '用户登录失败,请检查账号或密码',
            static: 502
        })
        // 把 登录成功之后的用户信息，挂载到 session 上
        req.session.user = result[0]
        // 把 用户登录成功之后的结果，挂载到 session 上
        req.session.islogin = true
        // 查询成功
        res.send({
            msg: '用户登录成功',
            status: 200
        })
    })

}
// 注销页面功能
const logout = (req, res) => {
    req.session.destroy(function () {
        // 使用res.redirect()方法重定向首页
        res.redirect('/')
    })
}
module.exports = {
    showRegisterPage,
    showLoginPage,
    reg,
    login,
    logout
}