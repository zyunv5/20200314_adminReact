// @login & register
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();

//加载category model
//加载user model
require("../model/users");
const User = mongoose.model("users");

//通过对象调用对应的方法
// router.get('/', (req, res) => {
//   res.send('this is home page')
// })

const hash=bcrypt.createHash("md5");
//require('crypto').createHash('md5').update(clearText).digest('hex');

//登录接口
router.post("/login", (req, res) => {
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
