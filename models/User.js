const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  googleId: String,
  name: String,
  credits: {
    type: Number,
    default: 5
  }
});
const User = mongoose.model("users", userSchema);
module.exports = User;
