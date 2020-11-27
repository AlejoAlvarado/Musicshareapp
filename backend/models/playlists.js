const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlaylistSchema = Schema({
    title: {type: String, required: true, max:100},
    cover: {type: String, required: false},
    owner: {type: Schema.Types.ObjectId, ref: "User", required: true},
    songs: [{type: Schema.Types.ObjectId, ref: "User.songs"}]
});

module.exports = mongoose.model('Playlist', PlaylistSchema);