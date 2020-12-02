var express = require("express");
var router = express.Router();
const auth = require("../middlewares/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/private", auth, (req, res) => {
  console.log(req.user);
  res.status(200).send({ message: "Tienes acceso" });
});

module.exports = router;
