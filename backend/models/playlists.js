const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlaylistSchema = Schema({
    title: {type: String, required: true, max:100},
    cover: {type: String, required: false}
})