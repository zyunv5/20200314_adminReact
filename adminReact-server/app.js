const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//实例化express对象
var app = express();
//解析post
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
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

//加载model
require("./model/user");
const User = mongoose.model("users")

//通过对象调用对应的方法
app.get("/", (req, res) => {
  res.send("this is home page");
});

app.post("/", urlencodedParser, (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({
      text: "请输入标题！"
    });
  }
  if (!req.body.details) {
    errors.push({
      text: "请输入详情！"
    });
  }
  if (errors.length > 0) {
    res.render("ideas/add", {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
      user: req.user.id
    };
    new Idea(newUser).save().then(idea => {
      req.flash("success_msg", "数据添加成功");
      res.redirect("/ideas");
    });
  }
});
//监听服务器端口号
app.listen(8848);
