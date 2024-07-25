const { Collection } = require("mongodb");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    password: String,
    pic : String
  },
  {
    Collection:'userinfo'
  }
);

mongoose.model("userinfo",UserSchema);
