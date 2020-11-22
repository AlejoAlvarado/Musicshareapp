const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./users');

let PlaylistSchema = Schema({
    title: {type: String, required: true, max:100},
    cover: {type: String, required: false},
    owner: {type: Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model('Playlist', PlaylistSchema);