const Playlist = require("../models/playlists");
const User = require("../models/users");

exports.index = function (req, res, next) {
  Playlist.find({}, (err, playlists) => {
    if (err) {
      return next(err);
    } else {
      res.send(playlists);
    }
  });
};

exports.get_playlist_owner = function(req, res, next) {
    Playlist.findById(req.params.id).populate('owner').exec((err, playlist) => {
        if (err) {
            return next(err);
        } else {
            res.send(playlist.owner);
        }
    });
}

exports.search_my_playlists = function(req, res, next){
  const user_id = req.user;
  User.findById(user_id).populate('playlists').populate('sharedWithMe').exec((err, owner) => {
    if (err) {
      return next(err);
    } else {
      res.send(owner);
    }
  })
}

exports.create = function (req, res, next) {
  let playlist = new Playlist({
    title: req.body.title,
    cover: req.body.cover,
    owner: req.body.ownerid,
  });

  playlist.save((err) => {
    if (err) {
      return next(err);
    } else {
      res.send("Playlist guardada exitosamente");
    }
  });
};

exports.search = function(req, res, next) {
    Playlist.findById(req.params.id, (err, playlist) => {
        if (err)
            return next(err)
        res.send(playlist)
    })
}

exports.update = function(req, res, next){
    Playlist.findByIdAndUpdate(req.params.id, {$set: req.body},(err, playlist) => {
        if (err)
            return next(err)
        res.send("Playlist updated succesfully")
    })
}


exports.delete = function(req, res, next) {
    Playlist.findByIdAndRemove(req.params.id, (err, playlist) => {
        if (err)
            return next(err)
        res.send("Playlist eliminated succesfully")
    })
}
