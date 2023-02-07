const moment = require('moment')
const mysql = require('mysql')
const { login } = require('./user')
const conn = mysql.createConnection({
    host: '127.0.0.1',
    database: 'mysql_001',
    user: 'root',
    password: 'root'
})
// 请求添加文章页面
const article = (req, res) => {
    // 判断是否登录
    if (!req.session.islogin) {
        res.redirect('/')
    }
    res.render('./article/add.ejs', {
        user: req.session.user,
        islogin: req.session.islogin
    })
}
// 添加新文章逻辑
const addArticlePage = (req, res) => {
    const body = req.body
    body.ctime = moment().format('YYYY-MM-DD HH:mm:ss') 
    const sql1 = "select count(*) as count from blog_users where title=?"
    const appTest = conn.query(sql1, body.title, (err, result) => {
        // 查询失败
        if (err) return res.send({
            msg: '用户名查重失败',
            status: 502
        })
        console.log(result);
    })
    console.log(appTest);
    
}
module.exports = {
    article,
    addArticlePage

}