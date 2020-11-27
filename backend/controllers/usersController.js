const User = require("../models/users");
const aws = require("aws-sdk");



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
  let user = new User({
    name: req.body.name,
    username: req.body.username,
    //userid: req.body.userid,
    password: req.body.password,
    //photo: req.body.photo,
    //state: req.body.state,
    email: req.body.email,
  });

  user.save((err) => {
    if (err) {
      return next(err);
    } else {
      res.send("User guardado exitosamente");
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

exports.add_song_to_user = function (req,res,next){
  const s3 = new aws.S3(); 
}