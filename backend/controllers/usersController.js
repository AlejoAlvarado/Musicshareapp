/**
 * A class with the controllers that will be used by the node backend to make requests related to the users model to the mongo database
 */

const User = require("../models/users");
const Playlist = require("../models/playlists");
const service = require("../services");

const ROLES = {
  ADMIN: "ADMIN",
  BASIC: "BASIC",
  SUPERADMIN: "SUPERADMIN",
};
/**
 * To encrypt the password when user is created an when is trying to log in in order to compare it with the one
 * that is saved.
 */
var bcrypt = require("bcryptjs");

/**
 * Function that adds a single song to the user
 * Returns the added song
 *
 * @param {*} req.file Song to be added to the user
 */
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
/**
 * Function that allows an ADMIN or SUPERADMIN to obtain all users.
 * If the user has the ADMIN role, it will only be able to obtain all users that are not SUPERADMINS.
 * @param {*} req.role The role of the user making the request
 * @param {*} res response that will be sent
 */
exports.index = function (req, res, next) {
  console.log(req.role);
  console.log(req.role === ROLES.ADMIN);
  if (req.role === ROLES.ADMIN) {
    User.find({ role: { $ne: ROLES.SUPERADMIN } }, (err, users) => {
      if (err) {
        return next(err);
      } else {
        res.send(users);
      }
    });
  } else {
    User.find({}, (err, users) => {
      if (err) {
        return next(err);
      } else {
        res.send(users);
      }
    });
  }
};

/**
 * Function that registers new users into the application
 * Returns status message
 *
 * @param {*} req.body contains user information
 */
exports.create = function (req, res, next) {
  console.log("creating");
  User.find({ email: req.body.email }, (err, users) => {
    if (users.length > 0) {
      return res
        .status(400)
        .send({ message: "An user with that email already exists" });
    } else {
      console.log(req.body.role);
      let user = null;
      if (req.body.role != undefined) {
        console.log("finishing");
        user = new User({
          name: req.body.name,
          username: req.body.username,
          //userid: req.body.userid,
          password: bcrypt.hashSync(req.body.password, 8),
          //photo: req.body.photo,
          //state: req.body.state,
          email: req.body.email,
          role: req.body.role,
          active: req.body.active,
        });
      } else {
        user = new User({
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
      }

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
    console.log(user[0].active);
    if (err) return res.status(500).send({ message: err });
    if (user.length < 1)
      return res.status(400).send({ message: "User not found" });
    if (user[0].active == false)
      return res.status(403).send("Not signed in. User banned.");
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

/**
 * Function that returns all the playlists owned by the user with the id specified
 * @param {*} req.params.id id of the user 
 * @param {*} res Package with the response to the user
 * @param {*} next Callback function
 */
exports.getPlaylistsFromUser = function (req, res, next) {
  User.findById(req.params.id)
    .populate({
      path: "playlists",
      populate: {
        path: "owner",
      },
    })
    .exec((err, user) => {
      if (err) return next(err);
      res.send(user.playlists);
    });
};

/**
 * Function that allows a user to update one or multiple of its properties.
 * If there is a password to be updated, it will be encrypted.
 * @param {*} req The request sent by the user
 * @param {*} res The response to the client that will be sent
 * @param {*} next A function to continue to the next request or piece of code
 */
exports.update = function (req, res, next) {
  console.log("updating");
  if (req.body.password) {
    let password = bcrypt.hashSync(req.body.password, 8);
    req.body.password = password;
  }

  console.log(req.body);
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err) return next(err);
    res.send("User updated succesfully");
  });
};

/**
 * This function changes the state of a users active flag from true to false or viceversa whenever it is called.
 * The function receives the id of the user via the request's parameters.
 * @param {*} req The request sent by the client
 * @param {*} res The response that will be sent to the client
 * @param {*} next A function to continue to the next request or piece of code
 */
exports.banned = function (req, res, next) {
  User.findByIdAndUpdate(
    req.params.id,
    { active: req.body.active },
    (err, user) => {
      if (err) return next(err);

      console.log(req.body.active);
      console.log(req.body);
      res.status(200).send("User processed successfully");
    }
  );
};

/**
 * This function gives the possibility to a client to erase a certain user by passing the id of the user via the request parameters.
 * @param {*} req The request sent by the client
 * @param {*} res The response that will be sent to the client
 * @param {*} next A function to continue to the next request or piece of code
 */
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

/**
 * Removes a shared playlist from the user
 * Returns status message
 *
 * @param {*} req.body Is the playlist being removed
 * @param {*} req.query.id Is the user whose shared playlist is being removed
 */
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
