const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = Schema({
  name: { type: String, required: false, max: 100 },
  username: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
