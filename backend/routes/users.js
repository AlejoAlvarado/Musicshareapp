var express = require("express");
var router = express.Router();
var users_controller = require("../controllers/usersController");

/* GET users listing. */
router.get("/", users_controller.index);
router.post("/", users_controller.create);
router.put("/:id", users_controller.update);
router.delete("/:id", users_controller.delete);
router.get("/:id", users_controller.search);

module.exports = router;
