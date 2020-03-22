// @login & register
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')

//加载category model
//加载user model
require('../model/product')
const Product = mongoose.model('product')

//做假数据,只用一次
router.get('/add', (req, res) => {
  for (var i = 0; i < 30; i++) {
    new Product({ status: 1, imgs: [], name: '产品00' + i, desc: '价格便宜' + i, price: 1000 * i, categoryId: uuidv4(), detail: '产品不行' })
      .save()
      .then(idea => console.log(idea))
  }
})

//查询表格
router.get('/list', (req, res) => {
  const { pageNum, pageSize } = req.query
  // console.log(req.query)
  Product.estimatedDocumentCount().then(response => {
    const total = response
    const pages = response / pageSize
    // console.log(Math.ceil(total))
    if (pageNum > pages) {
      res.json({
        status: 1,
        msg: '页码大于数据总和'
      })
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
                msg: '查询成功',
                total,
                pageNum,
                pageSize,
                pages,
                list: response
              })
            : res.json({
                status: 1,
                msg: '查询失败'
              })
        })
    }
  })
})

//检索数据 模糊搜索
router.get('/search', (req, res) => {
  const { pageNum, pageSize } = req.query
  if (req.query.productName) {
    const query = new RegExp(req.query.productName, 'i') //模糊查询参数
    Product.find({ $or: [{ name: query }] })
      .skip(pageSize * (pageNum - 1))
      .limit(+pageSize)
      .sort({ _id: 1 })
      .then(response => {
        // console.log(response);
        if (response.length > 0) {
          const total = response.length
          const pages = response / pageSize
          console.log(response.length,pageSize);
          res.json({
            status: 0,
            msg: '查询成功',
            total,
            pageNum,
            pageSize,
            pages,
            list: response
          })
        } else {
          res.json({
            status: 1,
            msg: '查询失败,无对应数据'
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  } else {
    Product.find({ username, password })
      .then(response => {
        response.length > 0
          ? res.json({
              status: 0,
              msg: '查询成功',
              data: response[0]
            })
          : res.json({
              status: 1,
              msg: '查询失败'
            })
      })
      .catch(err => {
        console.log(err)
      })
  }
})

//根据id检索数据
router.get('/info', (req, res) => {
  const { username, password } = req.body
  User.find({ username, password })
    .then(response => {
      response.length > 0
        ? res.json({
            status: 0,
            msg: '查询成功',
            data: response[0]
          })
        : res.json({
            status: 1,
            msg: '查询失败'
          })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
