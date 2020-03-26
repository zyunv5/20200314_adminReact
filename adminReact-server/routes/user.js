// @login & register
const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const router = express.Router();
const key = require("../config/key");

//加载category model
//加载user model
require("../model/users");
const User = mongoose.model("users");

require("../model/role");
const Role = mongoose.model("role");

//通过对象调用对应的方法
// router.get('/', (req, res) => {
//   res.send('this is home page')
// })

//加入md5加密
const md5 = data => {
  let hash = crypto.createHash("md5");
  return hash.update(data).digest("hex");
};

//加入私匙
const encryption = data => md5(md5(data) + key.private_key);

//制造假数据
router.get("/addFakeData", (req, res) => {
  let data = [
    {
      _id: "5cb05b4db6ed8c44f42c9af2",
      username: "test",
      password: "202cb962ac59075b964b07152d234b70",
      phone: "123412342134",
      email: "sd",
      role_id: "5ca9eab0b49ef916541160d4",
      create_time: 1555061581734
    },
    {
      _id: "5cb05b69b6ed8c44f42c9af3",
      username: "ss22",
      password: "123",
      phone: "23343",
      email: "df",
      role_id: "5caf5444c61376319cef80a8",
      create_time: 1555061609666,
      __v: 0
    }
  ];
  for (let i = 0; i < data.length; i++) {
    new User({
      username: data[i].username,
      password: data[i].password,
      create_time: data[i].create_time,
      phone: data[i].phone,
      email: data[i].email,
      role_id: data[i].role_id
    })
      .save()
      .then(idea => console.log(idea));
  }
});

//登录接口
router.post("/login", (req, res) => {
  //这里除了加密密码，还得根据返回的role.id查询所有的权限
  const { username, password } = req.body;
  let result = {};
  User.find({ username })
    .then(response => {
      if (response.length > 0) {
        const {_id,username,password,phone,email,role_id,create_time } = response[0];
        Role.find({ _id: role_id }).then(response2 => {
          const {menus}=response2[0]
          // const result={"_id":_id,username,password,phone,email,role_id,create_timemenus}
          if (response[0].password === encryption(password)) {
            res.json({
              status: 0,
              msg: "查询成功",
              data:{}
            });
          } else {
            res.json({
              status: 1,
              msg: "密码错误"
            });
          }
        });
      } else {
        res.json({
          status: 1,
          msg: "查询失败"
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

//获取用户列表
router.get("/list", (req, res) => {
  let roles = null;
  Role.find().then(roleResponse => {
    roles = roleResponse;
    User.find({})
      .then(response => {
        response.length > 0
          ? res.json({
              status: 0,
              msg: "查询成功",
              data: { user: response, roles }
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
});

//添加用户
router.post("/add", (req, res) => {
  const { username, password, phone, email, role_id } = req.body;
  new User({ username, password: encryption(password), phone, email, role_id })
    .save()
    .then(response => {
      response
        ? res.json({
            status: 0,
            msg: "添加成功"
          })
        : res.json({
            status: 1,
            msg: "添加失败"
          });
    })
    .catch(err => {
      console.log(err);
    });
});

//更新用户
router.post("/update", (req, res) => {
  const { _id, username, phone, email, role_id } = req.body;
  User.updateOne({ _id }, { username, phone, email, role_id })
    .then(response => {
      response.ok === 1
        ? res.json({
            status: 0,
            msg: "修改成功",
            data: response[0]
          })
        : res.json({
            status: 1,
            msg: "修改失败"
          });
    })
    .catch(err => {
      console.log(err);
    });
});

//删除用户
router.post("/delete", (req, res) => {
  const { userId } = req.body;
  User.deleteOne({ _id: userId })
    .then(response => {
      response.ok === 1
        ? res.json({
            status: 0,
            msg: "删除成功"
          })
        : res.json({
            status: 1,
            msg: "删除失败"
          });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
