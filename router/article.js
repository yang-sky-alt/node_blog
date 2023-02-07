let express = require("express");
let router = express.Router();
// 导入 article处理逻辑
let { article, addArticlePage} = require('../controller/article')
// 显示添加文章页面
router.get('/article/add', article)

router.post('/article/add',addArticlePage) 
module.exports = router;