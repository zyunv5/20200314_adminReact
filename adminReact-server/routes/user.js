// @login & register
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

//加载category model
//加载user model
require('../model/users')
const User = mongoose.model('users')

//通过对象调用对应的方法
// router.get('/', (req, res) => {
//   res.send('this is home page')
// })

//登录接口
router.post('/', (req, res) => {
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
