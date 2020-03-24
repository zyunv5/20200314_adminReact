const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const multer = require('multer')

//实例化express对象
var app = express()

//解析post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//上传图片中间件
var objMulter = multer({ dest: 'uploadImages' }) //设置上传的的图片保存目录
app.use(objMulter.any())

//引入路由
const user = require('./routes/user')
const category = require('./routes/category')
const product = require('./routes/product')
const changeImg = require('./routes/changeImg')

//connect to mongoose
mongoose
  .connect('mongodb://localhost:27017/admin-react', {
    //注意url地址最后面的地址是数据库的名称
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDb')
  })
  .catch(err => {
    console.log(err)
  })

//允许跨域
app.all('*', function(req, res, next) {
  //设为指定的域
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

// 使用routes
app.use('/login', user)
app.use('/manage/category', category)
app.use('/manage/product', product)
app.use('/manage/img', changeImg)

//监听服务器端口号
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
