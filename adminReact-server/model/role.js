const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    default: Date.now
  },
  auth_time: {
    type: Date,
    default: Date.now
  },
  auth_name: {
    type: String,
  },
  menus: {
    type: Array
  }
})

mongoose.model('role', RoleSchema, 'role')
