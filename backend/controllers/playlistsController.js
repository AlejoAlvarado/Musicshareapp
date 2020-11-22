const Playlist = require("../models/playlists");

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
