var express = require("express");
var router = express.Router();
const { isAuth } = require("../middlewares/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/private", isAuth, (req, res) => {
  console.log("res status:" + req.status);
  res.status(200).send({ message: "Tienes acceso" });
});

module.exports = router;
