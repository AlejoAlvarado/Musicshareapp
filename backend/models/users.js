const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let SongSchema= Schema ({
  title: {type: String, required: true, max:100},
  artist: {type: String, required: true, max:100},
  songUrl: {type: String, required: true},
  imageUrl: {type: String, required: true}
});

let UserSchema = Schema({
  name: { type: String, required: false, max: 100 },
  username: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  songs: [SongSchema]
});

module.exports = mongoose.model("User", UserSchema);
