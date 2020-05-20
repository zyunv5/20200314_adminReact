// @login & register
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//加载category model
require("../model/category");
const Category = mongoose.model("category");

router.get("/addFake", (req, res) => {
  for (var i = 0; i < 10; i++) {
    new Category({
      name: "分类0" + i,
      parentId: 0 + i
    })
      .save()
      .then(idea => console.log(idea));
  }
});

//品类管理 查询接口
router.get("/list", (req, res) => {
  const { parentId } = req.query;
  Category.find({ parentId })
    .then(response => {
      res.json({
        status: 0,
        data: response
      });
    })
    .catch(err => console.log(err));
});

//品类管理 修改名称
router.post("/update", (req, res) => {
  const { categoryId, categoryName } = req.body;
  Category.updateOne({ _id: categoryId }, { name: categoryName })
    .then(response => {
      res.json({
        status: 0,
        data: response
      });
    })
    .catch(err => console.log(err));
});

//品类管理 新增一级二级分类
router.post("/add", (req, res) => {
  const { categoryName, parentId } = req.body;
  new Category({ parentId, name: categoryName })
    .save()
    .then(response => {
      res.json({
        status: 0,
        data: response
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
