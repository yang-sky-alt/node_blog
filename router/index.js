// 这就是user子路由! 
let express = require("express");
let router = express.Router();
let  ctrl = require('../controller/index.js')
// 跟路径
router.get("/" , ctrl.showIndexPage)
module.exports = router;