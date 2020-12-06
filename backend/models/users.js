const mongoose = require("mongoose");
const { bool } = require("sharp");
const Schema = mongoose.Schema;

let SongSchema = Schema({
  title: { type: String, required: true, max: 100 },
  artist: { type: String, required: true, max: 100 },
  songUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

let UserSchema = Schema({
  name: { type: String, required: false, max: 100 },
  username: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  active: { type: Boolean, required: true },
  songs: [SongSchema],
  playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
  sharedWithMe: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
});

module.exports = mongoose.model("User", UserSchema);
