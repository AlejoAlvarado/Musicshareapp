const User = require("../models/users");
const service = require("../services");

var bcrypt = require("bcryptjs");

exports.add_song_to_user = function (req, res) {
  try {
    var songData = {
      title: req.file.originalname.split(".")[0],
      artists: "ME",
      songUrl: req.file.location,
      imageUrl: "NONE",
    }
    User.findByIdAndUpdate({ _id: req.query.id},{$push: {songs:songData}},(err) => {
      if (err) console.log(err)
      res.status(200).send({
        message: "Added the song successfully: ",
        songData: songData,
      });
    });
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
