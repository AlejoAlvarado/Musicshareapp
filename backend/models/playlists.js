const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * Scheme to model playlists
 */
let PlaylistSchema = Schema({
    title: {type: String, required: true, max:100},
    cover: {type: String, required: false},
    owner: {type: Schema.Types.ObjectId, ref: "User", required: true},
    songs: [],
    sharedWith: [{type: Schema.Types.ObjectId, ref: "User"}],
});

module.exports = mongoose.model('Playlist', PlaylistSchema);