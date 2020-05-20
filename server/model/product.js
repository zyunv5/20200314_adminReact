const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  status: {
    type: Number,
    required: true
  },
  imgs: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // categoryId: { //商品分类id，参与者退出了直播间
  //   type: String,
  //   required: true
  // },
  detail: {
    type: String,
    required: true
  },
  createTime: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('product', ProductSchema, 'product')
