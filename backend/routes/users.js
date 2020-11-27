var express = require("express");
var router = express.Router();
var users_controller = require("../controllers/usersController");

/* GET users listing. */
router.get("/", users_controller.index);
router.post("/", users_controller.create);
router.put("/:id", users_controller.update);
router.delete("/:id", users_controller.delete);
router.get("/:id", users_controller.search);
router.post("/user-song",users_controller.add_song_to_user);

module.exports = router;
