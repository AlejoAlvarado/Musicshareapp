const User = require("../models/users");
const service = require("../services");

var bcrypt = require("bcryptjs");

exports.add_song_to_user = function (req, res) {
  try {
    res.status(200).send({
      message: "Uploaded the file successfully: ",
      songData: {
        title: req.file.originalname.split(".")[0],
        artists: "ME",
        songUrl: req.file.location,
        imageUrl: "NONE",
      },
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
    if (err) return req.status(500).send({ message: err });
    if (!user) return req.status(404).send({ message: "User no encontrado" });

    console.log(user[0].password);
    let equalPass = bcrypt.compareSync(req.body.password, user[0].password);
    console.log(equalPass);
    if (equalPass) {
      req.user = user;
      return res.status(200).send({
        message: "User logeado exitosamente!",
        token: service.createToken(user),
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
