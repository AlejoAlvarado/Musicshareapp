const Playlist = require("../models/playlists");
const User = require("../models/users");
const mongoose = require('mongoose')

exports.index = function (req, res, next) {
  Playlist.find({}, (err, playlists) => {
    if (err) {
      return next(err);
    } else {
      res.send(playlists);
    }
  });
};

exports.get_playlist_owner = function (req, res, next) {
  Playlist.findById(req.params.id).populate('owner').exec((err, playlist) => {
    if (err) {
      return next(err);
    } else {
      res.send(playlist.owner);
    }
  });
}

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

exports.search = function (req, res, next) {
  Playlist.findById(req.params.id).populate('owner').populate('sharedWith').exec((err, playlist) => {
    if (err) return next(err)
    res.send(playlist)
  })
}

exports.update = function (req, res, next) {
  Playlist.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, playlist) => {
    if (err)
      return next(err)
    res.send("Playlist updated succesfully")
  })
}


exports.delete = function (req, res, next) {
  Playlist.findByIdAndRemove(req.params.id, (err, playlist) => {
    if (err)
      return next(err)
    res.send("Playlist eliminated succesfully")
  })
}

exports.add_song_to_playlist = function (req, res, next) {
  Playlist.findByIdAndUpdate({ _id: req.query.id }, { $push: { songs: req.body } }, (err, playlist) => {
    if (err) next(err)
    res.send("Song added succesfully to playlist")
  });
}

exports.delete_playlist_song = function (req, res, next) {
  Playlist.findByIdAndUpdate({ _id: req.query.id }, { $pull: { songs: { _id: req.body._id } } }, (err, playlist) => {
    if (err) next(err)
    res.send("Song deleted succesfully")
  });
}

