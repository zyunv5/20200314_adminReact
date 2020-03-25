const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  role_id: {
    type: String
  },
  create_time: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('users', UserSchema)
