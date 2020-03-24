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

//登录接口
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.find({ username })
    .then(response => {
      if (response.length > 0) {
        if (response[0].password === encryption(password)) {
          res.json({
            status: 0,
            msg: "查询成功",
            data: response[0]
          });
        } else {
          res.json({
            status: 1,
            msg: "密码错误"
          });
        }
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

//添加用户
router.post("/add", (req, res) => {
  // const { username, password } = req.body
  // User.find({ username, password })
  //   .then(response => {
  //     response.length > 0
  //       ? res.json({
  //           status: 0,
  //           msg: '查询成功',
  //           data: response[0]
  //         })
  //       : res.json({
  //           status: 1,
  //           msg: '查询失败'
  //         })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
});

//更新用户
router.post("/update", (req, res) => {
  // const { username, password } = req.body
  // User.find({ username, password })
  //   .then(response => {
  //     response.length > 0
  //       ? res.json({
  //           status: 0,
  //           msg: '查询成功',
  //           data: response[0]
  //         })
  //       : res.json({
  //           status: 1,
  //           msg: '查询失败'
  //         })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
});

//获取用户列表
router.get("/list", (req, res) => {
  // const { username, password } = req.body
  // User.find({ username, password })
  //   .then(response => {
  //     response.length > 0
  //       ? res.json({
  //           status: 0,
  //           msg: '查询成功',
  //           data: response[0]
  //         })
  //       : res.json({
  //           status: 1,
  //           msg: '查询失败'
  //         })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
});

//删除用户
router.post("/delete", (req, res) => {
  // const { username, password } = req.body
  // User.find({ username, password })
  //   .then(response => {
  //     response.length > 0
  //       ? res.json({
  //           status: 0,
  //           msg: '查询成功',
  //           data: response[0]
  //         })
  //       : res.json({
  //           status: 1,
  //           msg: '查询失败'
  //         })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
});

module.exports = router;
