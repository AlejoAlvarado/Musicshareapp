const User = require("../models/users");
const Playlist = require("../models/playlists");
const service = require("../services");

const ROLES = {
  ADMIN: "ADMIN",
  BASIC: "BASIC",
  SUPERADMIN: "SUPERADMIN",
};

var bcrypt = require("bcryptjs");

exports.add_song_to_user = function (req, res) {
  try {
    let songTitle = "";
    let i = 0;
    let splits = req.file.originalname.split(".");
    for (i = 0; i < splits.length - 1; i++) {
      songTitle = songTitle.concat(splits[i]);
    }
    var songData = {
      title: songTitle,
      artists: "ME",
      songUrl: req.file.location,
      imageUrl: "NONE",
    };
    User.findByIdAndUpdate(
      { _id: req.query.id },
      { $push: { songs: songData } },
      (err) => {
        if (err) console.log(err);
        res.status(200).send({
          message: "Added the song successfully: ",
          songData: songData,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Could not upload the file:. ${err}`,
    });
  }
};

exports.index = function (req, res, next) {
  User.find({}, (err, users) => {
    if (err) {
      return next(err);
    } else {
      res.send(users);
    }
  });
};

exports.create = function (req, res, next) {
  User.find({ email: req.body.email }, (err, users) => {
    if (users.length > 0) {
      return res
        .status(400)
        .send({ message: "Un usuario con este email ya existe" });
    } else {
      let user = new User({
        name: req.body.name,
        username: req.body.username,
        //userid: req.body.userid,
        password: bcrypt.hashSync(req.body.password, 8),
        //photo: req.body.photo,
        //state: req.body.state,
        email: req.body.email,
        role: ROLES.BASIC,
        active: true,
      });

      user.save((err) => {
        if (err) {
          res.status(500).send({
            message: `Error al crear el usuario: ${err}`,
            message2: err,
          });
        } else {
          return res.status(200).send({
            message: "User guardado exitosamente",
          });
        }
      });
    }
  });
};

exports.signinUser = function (req, res, next) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (user.length < 1)
      return res.status(400).send({ message: "User no encontrado" });
    console.log(req.body.email);
    let equalPass =
      bcrypt.compareSync(req.body.password, user[0].password) ||
      user[0].password === req.body.password;
    console.log(equalPass);
    if (equalPass) {
      req.user = user;
      return res.status(200).send({
        message: "User logeado exitosamente!",
        token: service.createToken(user),
        user: user,
      });
    } else {
      console.log("mala contraseña");
      return res.status(400).send({ message: "La contraseña es incorrecta" });
    }
  });
};

exports.search = function (req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    res.send(user);
  });
};

exports.update = function (req, res, next) {
  console.log("updating");
  let password = bcrypt.hashSync(req.body.password, 8);
  req.body.password = password;

  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err) return next(err);
    res.send("User updated succesfully");
  });
};

exports.delete = function (req, res, next) {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return next(err);
    res.send("User eliminated succesfully");
  });
};

exports.add_shared_playlist_to_user = function (req, res, next) {
  Playlist.findById(req.body._id, (err, playlist) => {
    console.log("User is " + req.user);
    console.log("Owner is " + playlist.owner);
    if (err) return next(err);
    if (playlist.owner != req.user)
      return res.status(401).send({ message: "User not authorized" });
    User.findByIdAndUpdate(
      req.query.id,
      { $push: { sharedWithMe: req.body._id } },
      (err, user) => {
        if (err) return next(err);
        Playlist.findByIdAndUpdate(
          req.body._id,
          { $push: { sharedWith: req.query.id } },
          (err, playlist) => {
            if (err) return next(err);
            console.log(user);
            console.log(playlist);
            res.send("playlist Shared Succesfully");
          }
        );
      }
    );
  });
};

exports.stop_sharing_playlist_with_user = function (req, res, next) {
  Playlist.findById(req.body._id, (err, playlist) => {
    console.log("User is " + req.body._id);
    console.log("Playlist is " + req.query.id);
    if (err) return next(err);
    if (playlist.owner != req.user)
      return res.status(401).send({ message: "User not authorized" });
    User.findByIdAndUpdate(
      req.query.id,
      { $pull: { sharedWithMe: req.body._id } },
      (err, user) => {
        if (err) return next(err);
        Playlist.findByIdAndUpdate(
          req.body._id,
          { $pull: { sharedWith: req.query.id } },
          (err,
          (playlist) => {
            if (err) return next(err);
            console.log(user);
            console.log(playlist);
            res.send("playlist Unshared succesfully");
          })
        );
      }
    );
  });
};
