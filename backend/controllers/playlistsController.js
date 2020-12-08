/**
 * A class with the controllers that will be used by the node backend to make requests related to the playlist model to the mongo database
 */

const Playlist = require("../models/playlists");
const User = require("../models/users");
const mongoose = require('mongoose')

/**
 * Function that allows to see all the playlists saved on the database
 * @param {*} req Request package
 * @param {*} res Response package to be sent to the user
 * @param {*} next Callback function
 */
exports.index = function (req, res, next) {
  Playlist.find({}, (err, playlists) => {
    if (err) {
      return next(err);
    } else {
      res.send(playlists);
    }
  });
};

/**
 * Function that
 * Returns the owner of a playlist
 * 
 * @param {*} req.params Contains the playlist id
 */
exports.get_playlist_owner = function (req, res, next) {
  Playlist.findById(req.params.id).populate('owner').exec((err, playlist) => {
    if (err) {
      return next(err);
    } else {
      res.send(playlist.owner);
    }
  });
}

/**
 * Function that finds all playlists from a given user
 * Returns playlists and sharedWithMe
 * 
 * @param {*} req.user Contains the user id whose playlists are required
 */
exports.search_my_playlists = function (req, res, next) {
  const user_id = req.user;
  User.findById(user_id).populate({
    path: 'playlists', populate: {
      path: 'owner'
    }
  }).populate({
    path: 'sharedWithMe', populate: {
      path: 'owner'
    }
  }).exec((err, owner) => {
    if (err) {
      return next(err);
    } else {
      console.log(owner);
      res.send(owner);
    }
  })
}

/**
 * Function that saves a playlist
 * Returns status message
 * 
 * @param {*} req.body contains information from the playlist to be created 
 */
exports.create = function (req, res, next) {
  let playlist = new Playlist({
    title: req.body.title,
    cover: req.body.cover,
    owner: mongoose.Types.ObjectId(req.body.owner),
  });
  playlist.save((err, new_playlist) => {
    console.log('New playlist is ' + new_playlist.title)
    if (err) {
      return next(err);
    } else {
      User.findByIdAndUpdate({ _id: new_playlist.owner }, { $push: { playlists: new_playlist } }, (err) => {
        if (err) return next(err);
        res.send("Playlist guardada exitosamente");
      })
    }
  });
};

/**
 * Function to search a specific playlist by his id
 * @param {*} req.params.id is the id of the playlist 
 * @param {*} res Package that will contain the playlist info if everything is ok (Or error message)
 * @param {*} next Callback Function
 */
exports.search = function (req, res, next) {
  Playlist.findById(req.params.id).populate('owner').populate('sharedWith').exec((err, playlist) => {
    if (err) return next(err)
    res.send(playlist)
  })
}

/**
 * Function to update a specific playlist based on his id
 * @param {*} req.params.id is the id of the playlist 
 * @param {*} res Package answer
 * @param {*} next Callback funtion
 */
exports.update = function (req, res, next) {
  Playlist.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, playlist) => {
    if (err)
      return next(err)
    res.send("Playlist updated succesfully")
  })
}

/**
 * Function to delete a specific playlist based on his id
 * @param {*} req.params.id is the id to the playlist that will be removed 
 * @param {*} res packa with the response to be sent to the user
 * @param {*} next Callback function
 */
exports.delete = function (req, res, next) {
  Playlist.findByIdAndRemove(req.params.id, (err, playlist) => {
    if (err)
      return next(err)
    res.send("Playlist eliminated succesfully")
  })
}

/**
 * Function that adds a new song to an existing playlist
 * Returns status message
 * 
 * @param {*} req.query contains playlist id
 * @param {*} req.body contains song to be added
 * 
 */
exports.add_song_to_playlist = function (req, res, next) {
  Playlist.findByIdAndUpdate({ _id: req.query.id }, { $push: { songs: req.body } }, (err, playlist) => {
    if (err) next(err)
    res.send("Song added succesfully to playlist")
  });
}

/**
 * Function that deletes a song from a playlist
 * Returns status message
 * 
 * @param {*} req.query contains playlist whose song is to be deleted
 * @param {*} req.body contains song to be deleted from the playlist
 * 
 */
exports.delete_playlist_song = function (req, res, next) {
  Playlist.findByIdAndUpdate({ _id: req.query.id }, { $pull: { songs: { _id: req.body._id } } }, (err, playlist) => {
    if (err) next(err)
    res.send("Song deleted succesfully")
  });
}

