const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName : String,
    lastName : String,
    country : String,
    date : String,
    month : String,
    year : String,
    email : String,
    pass : String,
    profilePicture: String,
  },
  {
    collection: "userinfo"
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel


