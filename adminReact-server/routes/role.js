// @login & register
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
//加载category model
//加载user model
require("../model/role");
const Role = mongoose.model("role");

//造假数据
router.get("/addFakeData", (req, res) => {
  let data = [
    {
      menus: ["/role", "/charts/bar", "/home", "/category"],
      _id: "5ca9eaa1b49ef916541160d3",
      name: "测试",
      create_time: 1554639521749,
      auth_time: 1558679920395,
      auth_name: "test007"
    },
    {
      menus: [
        "/role",
        "/charts/bar",
        "/home",
        "/charts/line",
        "/category",
        "/product",
        "/products"
      ],
      _id: "5ca9eab0b49ef916541160d4",
      name: "经理",
      create_time: 1554639536419,
      __v: 0,
      auth_time: 1558506990798,
      auth_name: "test008"
    },
    {
      menus: ["/home", "/products", "/category", "/product", "/role"],
      _id: "5ca9eac0b49ef916541160d5",
      name: "角色1",
      create_time: 1554639552758,
      __v: 0,
      auth_time: 1557630307021,
      auth_name: "admin"
    }
  ];
  for (let i = 0; i < data.length; i++) {
    new Role({
      name: data[i].name,
      create_time: data[i].create_time,
      auth_time: data[i].auth_time,
      auth_name: data[i].auth_name,
      menus: data[i].menus
    })
      .save()
      .then(idea => console.log(idea));
  }
});

//添加角色
router.post("/add", (req, res) => {
  const { name } = req.body;
  new Role({ name })
    .save()
    .then(response => {
      console.log(response);
      res.json({
        status: 0,
        data: response
      });
    })
    .catch(err => {
      res.json({
        status: 1,
        msg: err
      });
    });
});

//获取角色列表
router.get("/list", (req, res) => {
  Role.find({})
    .then(response => {
      response.length > 0
        ? res.json({
            status: 0,
            msg: "查询成功",
            data: response
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

//更新角色
router.post("/update", (req, res) => {
  const { _id, name, create_time, auth_time, auth_name, menus } = req.body;
  Role.updateOne({ _id }, { auth_time, auth_name, menus })
    .then(response => {
      response.ok ===1
        ? res.json({
            status: 0,
            msg: '更新成功',
          })
        : res.json({
            status: 1,
            msg: '更新失败'
          })
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
