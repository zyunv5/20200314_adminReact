const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    default: Date.now
  },
  auth_name: {
    type: String
  },
  auth_time: {
    type: Date,
    default: Date.now
  },
  menus: {
    type: Array
  },
  role_id: {
    type: Schema.Types.ObjectId,
    ref: "role_id"
  }
});

mongoose.model("role", RoleSchema, "role");
