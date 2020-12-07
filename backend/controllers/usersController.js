const User = require("../models/users");
const Playlist = require("../models/playlists");
const service = require("../services");

const ROLES = {
  ADMIN: "ADMIN",
  BASIC: "BASIC",
  SUPERADMIN: "SUPERADMIN",
};

var bcrypt = require("bcryptjs");

/**
 * Function that adds a single song to the user
 * Returns the added song
 * 
 * @param {*} req.file Song to be added to the user 
 */
exports.add_song_to_user = function (req, res) {
  try {
    let songTitle="";
    let i=0;
    let splits=req.file.originalname.split(".");
    for(i=0;i<splits.length-1;i++){
      songTitle=songTitle.concat(splits[i]);
    }
    var songData = {
      title: songTitle,
      artists: "NONE",
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

/**
 * Function that registers new users into the application
 * Returns status message
 * 
 * @param {*} req.body contains user information
 */
exports.create = function (req, res, next) {
  User.find({ email: req.body.email }, (err, users) => {
    if (users.length > 0) {
      return res
        .status(400)
        .send({ message: "An user with that email already exists" });
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
            message: `Error creating user: ${err}`,
            message2: err,
          });
        } else {
          return res.status(200).send({
            message: "User saved successfully",
          });
        }
      });
    }
  });
};

/**
 * Logs the user
 * Returns token and user information
 * 
 * @param {*} req.body contains user credentials (email, password) 
 */
exports.signinUser = function (req, res, next) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (user.length < 1)
      return res.status(400).send({ message: "User not found" });
    console.log(req.body.email);
    let equalPass =
      bcrypt.compareSync(req.body.password, user[0].password) ||
      user[0].password === req.body.password;
    console.log(equalPass);
    if (equalPass) {
      req.user = user;
      return res.status(200).send({
        message: "User signed in successfully!",
        token: service.createToken(user),
        user: user,
      });
    } else {
      console.log("Bad password");
      return res.status(400).send({ message: "The password is incorrect" });
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

/**
 * Shares a playlist to a user
 * Returns estatus message
 * 
 * @param {*} req.body Is the playlist that is shared with the user
 * @param {*} req.query.id The user that the playlists is being shared with
 */
exports.add_shared_playlist_to_user = function (req, res, next) {
  Playlist.findById(req.body._id, (err, playlist) => {
    console.log('User is ' + req.user);
    console.log('Owner is ' + playlist.owner);
    if (err) return next(err);
    if (playlist.owner != req.user) return res.status(401).send({ message: "User not authorized" });
    User.findByIdAndUpdate(req.query.id, { $push: { sharedWithMe: req.body._id } }, (err, user) => {
      if (err) return next(err);
      Playlist.findByIdAndUpdate(req.body._id, { $push: { sharedWith: req.query.id } }, (err, playlist) => {
        if (err) return next(err);
        console.log(user);
        console.log(playlist);
        res.send("playlist Shared Succesfully");
      })
    })
  })
}
/**
 * Removes a shared playlist from the user
 * Returns status message
 * 
 * @param {*} req.body Is the playlist being removed
 * @param {*} req.query.id Is the user whose shared playlist is being removed  
 */
exports.stop_sharing_playlist_with_user = function (req, res, next) {
  Playlist.findById(req.body._id, (err, playlist) => {
    console.log('User is ' + req.body._id);
    console.log('Playlist is ' + req.query.id);
    if (err) return next(err);
    if (playlist.owner != req.user) return res.status(401).send({ message: "User not authorized" });
    User.findByIdAndUpdate(req.query.id, { $pull: { sharedWithMe: req.body._id }}, (err, user) => {
      if (err) return next(err);
      Playlist.findByIdAndUpdate(req.body._id, { $pull: { sharedWith: req.query.id }}, (err, playlist => {
        if (err) return next(err);
        console.log(user);
        console.log(playlist);
        res.send("playlist Unshared succesfully");
      }))
    })
  })
}