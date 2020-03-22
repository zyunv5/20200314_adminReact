const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//实例化express对象
var app = express()

//解析post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//引入路由
const user = require('./routes/user')
const category = require('./routes/category')
const product = require('./routes/product')

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

// 使用routes
app.use('/login', user)
app.use('/manage/category', category)
app.use('/manage/product', product)

//监听服务器端口号
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
