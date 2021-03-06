var express = require("express");
var router = express.Router();
var playlists_controller = require("../controllers/playlistsController");
const { isAuth } = require("../middlewares/auth");

router.get("/:id/owner", playlists_controller.get_playlist_owner);
router.get("/:id", playlists_controller.search);
router.get("/my/Playlists", isAuth, playlists_controller.search_my_playlists);
router.get("/", playlists_controller.index);
router.post("/", playlists_controller.create);
router.put("/", playlists_controller.update);
router.put("/playlist-song",playlists_controller.add_song_to_playlist);
router.put("/playlist-delete-song",playlists_controller.delete_playlist_song);
router.delete("/:id", playlists_controller.delete);

module.exports = router;
