// @login & register
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

//加载category model
//加载user model
require("../model/product");
const Product = mongoose.model("product");

//做假数据,只用一次
router.get("/addFake", (req, res) => {
  for (var i = 0; i < 30; i++) {
    new Product({
      status: 1,
      imgs: [],
      name: "产品00" + i,
      desc: "价格便宜" + i,
      price: 1000 * i,
      categoryId: uuidv4(),
      detail: "产品不行"
    })
      .save()
      .then(idea => console.log(idea));
  }
});

//查询表格
router.get("/list", (req, res) => {
  const { pageNum, pageSize } = req.query;
  // console.log(req.query)
  Product.estimatedDocumentCount().then(response => {
    const total = response;
    const pages = response / pageSize;
    // console.log(Math.ceil(total))
    if (pageNum > pages) {
      res.json({
        status: 1,
        msg: "页码大于数据总和"
      });
    } else {
      Product.find({})
        .skip(pageSize * (pageNum - 1))
        .limit(+pageSize)
        .sort({ _id: 1 })
        .then(response => {
          // console.log(response)
          response.length > 0
            ? res.json({
                status: 0,
                msg: "查询成功",
                total,
                pageNum,
                pageSize,
                pages,
                list: response
              })
            : res.json({
                status: 1,
                msg: "查询失败"
              });
        });
    }
  });
});

//检索数据 模糊搜索
router.get("/search", async (req, res) => {
  const { pageNum, pageSize } = req.query;
  let total = null;
  if (req.query.productName) {
    const query = new RegExp(req.query.productName, "i"); //模糊查询参数
    const result = await Product.find({ $or: [{ name: query }] });
    total = result.length;
    if (result.length === 0) {
      res.json({
        status: 0,
        msg: "查询成功",
        total: 0,
        pageNum,
        pageSize,
        pages: 0,
        list: []
      });
    } else {
      const outcome = await Product.find({ $or: [{ name: query }] })
        .skip(pageSize * (pageNum - 1))
        .limit(+pageSize)
        .sort({ _id: 1 });
      const pages = total / pageSize;
      res.json({
        status: 0,
        msg: "查询成功",
        total,
        pageNum,
        pageSize,
        pages,
        list: outcome
      });
    }
  } else {
    const query = new RegExp(req.query.productDesc, "i"); //模糊查询参数
    const result = await Product.find({ $or: [{ desc: query }] });
    total = result.length;
    if (result.length === 0) {
      res.json({
        status: 0,
        msg: "查询成功",
        total: 0,
        pageNum,
        pageSize,
        pages: 0,
        list: []
      });
    } else {
      const outcome = await Product.find({ $or: [{ desc: query }] })
        .skip(pageSize * (pageNum - 1))
        .limit(+pageSize)
        .sort({ _id: 1 });
      const pages = total / pageSize;
      res.json({
        status: 0,
        msg: "查询成功",
        total,
        pageNum,
        pageSize,
        pages,
        list: outcome
      });
    }
  }
});

//更新商品的状态（上架/下架）
router.post("/updateStatus", (req, res) => {
  const { productId, status } = req.body;
  Product.updateOne({ _id: productId }, { status })
    .then(response => {
      res.json({
        status: 0,
        msg: "修改成功"
      })
    })
    .catch(err => console.log(err))
});

module.exports = router;
