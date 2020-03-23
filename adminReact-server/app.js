const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path"); //识别后缀名
const fs = require("fs"); //修改名称
//实例化express对象
var app = express();

//解析post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//上传图片中间件
var objMulter = multer({ dest: "uploadImages" }); //设置上传的的图片保存目录
app.use(objMulter.any());

//引入路由
const user = require("./routes/user");
const category = require("./routes/category");
const product = require("./routes/product");

//connect to mongoose
mongoose
  .connect("mongodb://localhost:27017/admin-react", {
    //注意url地址最后面的地址是数据库的名称
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDb");
  })
  .catch(err => {
    console.log(err);
  });

// 使用routes
app.use("/login", user);
app.use("/manage/category", category);
app.use("/manage/product", product);

//上传图片
app.post("/manage/img/upload", (req, res) => {
  // const { image } = req.query;
  console.log(req.files[0]);
  // const newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
  const newName = req.files[0].path + path.ext;
  fs.rename(req.files[0].path, newName, err => {
    res.json({
      status: 0,
      name: req.files[0].originalname,
      url: newName
    });
  });
});

//监听服务器端口号
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
