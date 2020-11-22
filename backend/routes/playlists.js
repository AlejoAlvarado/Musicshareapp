var express = require("express");
var router = express.Router();
var playlists_controller = require("../controllers/playlistsController");


router.get("/:id/owner", playlists_controller.get_playlist_owner);
router.get("/", playlists_controller.index);
router.post("/", playlists_controller.create);

module.exports = router;
