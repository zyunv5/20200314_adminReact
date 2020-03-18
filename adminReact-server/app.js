const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//实例化express对象
var app = express();

//解析post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

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
require("./model/users");
const User = mongoose.model("users");

//通过对象调用对应的方法
app.get("/", (req, res) => {
  // 随意添加一条数据
  // const newUser = {
  //   username: 'admin',
  //   password: 'admin'
  // }
  // new User(newUser).save().then(idea => console.log(idea))
  res.send("this is home page");
});

app.post("/login", (req, res) => {
  // console.log(req.body)
  const { username, password } = req.body;
  User.find({ username, password })
    .then(response => {
      response.length > 0
        ? res.json({
            status: 0,
            msg: "查询成功",
            data: response[0]
          })
        : res.json({
            status: 1,
            msg: "查询失败"
          });
    })
    .catch(err => {
      console.log(err);
    });
});

// app.post("/", urlencodedParser, (req, res) => {
//   let errors = [];
//   if (!req.body.title) {
//     errors.push({
//       text: "请输入标题！"
//     });
//   }
//   if (!req.body.details) {
//     errors.push({
//       text: "请输入详情！"
//     });
//   }
//   if (errors.length > 0) {
//     res.render("ideas/add", {
//       errors: errors,
//       title: req.body.title,
//       details: req.body.details
//     });
//   } else {
//     const newUser = {
//       title: req.body.title,
//       details: req.body.details,
//       user: req.user.id
//     };
//     new Idea(newUser).save().then(idea => {
//       req.flash("success_msg", "数据添加成功");
//       res.redirect("/ideas");
//     });
//   }
// });
//监听服务器端口号
app.listen(5000);
