const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/blog_users"); 
let student_schema = mongoose.Schema({
  // 字段 : name , age , student_id 
  id: Number,
  // age : Number 是简易配置 , 表示age字段只接受Number类型作为参数! 
  username: {
      // name 字段的类型只能是数字
      type: String,
      // unique : 表示这个字段的值必须是唯一的! 
      unique: true
  },
  password: {
    // name 字段的类型只能是数字
    // unique : 表示这个字段的值必须是唯一的! 
    unique: true
    
},
Mali
  student_id: {
      type: Number,
      // 默认值 : 函数的返回值! 
      default: function () {
          return Math.random().toString().slice(2);
      }
  }
});
let student_model = mongoose.model("students", student_schema);
// 把当前模块中创建的 conn 数据库连接对象，暴露出去
module.exports = student_model