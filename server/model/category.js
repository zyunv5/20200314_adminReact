const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  parentId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('category', CategorySchema, 'category')

// module.exports = {
//   findAll: (filter = {}, callback) => {
//     Category.find(filter)
//       .then(response => {
//         callback(response)
//       })
//       .catch(err => callback(err))
//   }
// }
