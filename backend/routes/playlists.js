var express = require("express");
var router = express.Router();
var playlists_controller = require("../controllers/playlistsController");
const auth = require("../middlewares/auth");


router.get("/:id/owner", playlists_controller.get_playlist_owner);
router.get("/:id", playlists_controller.search);
router.get("/my/Playlists", auth, playlists_controller.search_my_playlists);
router.get("/", playlists_controller.index);
router.post("/", playlists_controller.create);
router.put("/", playlists_controller.update);
router.delete("/:id", playlists_controller.delete);

module.exports = router;
