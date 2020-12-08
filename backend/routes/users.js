/**
 * A class with all the routes that a client can request related to the user model and user controller
 */
var express = require("express");
var router = express.Router();
var users_controller = require("../controllers/usersController");
var path = require("path");

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new aws.S3();
const { isAuth, authRole } = require("../middlewares/auth");
const ROLES = {
  BASIC: "BASIC",
  ADMIN: "ADMIN",
  SUPERADMIN: "SUPERADMIN",
};

//ATTENTION, DELETE THIS WHEN PUSHING
//CREDENTIALS ARE ADDED HERE

/**
 * Defines storage configuration (bucket config) for multerS3 to use
 */
var storage = multerS3({
  acl: "public-read",
  s3,
  bucket: "songs-bucket-adv-web",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: "TESTING_METADATA" });
  },
  Key: function (req, file, cb) {
    cb(null, Date.now().toString());
  },
});
/**
 * Defines backend filtering for files, will not allow for files that are not mp3
 */
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".mp3") {
      return callback(new Error("Only mp3 is allowed"));
    }
    callback(null, true);
  },
});

/* GET users listing. */
router.get(
  "/",
  isAuth,
  authRole([ROLES.ADMIN, ROLES.SUPERADMIN]),
  users_controller.index
);

/**
 * Route to ban a user, receives id as param in the route.
 * User that makes the request needs to be admin or superadmin
 */
router.put(
  "/banned/:id",
  isAuth,
  authRole([ROLES.ADMIN, ROLES.SUPERADMIN]),
  users_controller.banned
);

/**
 * Route that allows a superadmin to create a new user.
 */
router.post(
  "/super/",
  isAuth,
  authRole([ROLES.SUPERADMIN]),
  users_controller.create
);

router.post("");

/**
 * Route that allows a playlist to be shared with a user. It is required that the request is made by the owner
 * of the playlist
 */
router.put(
  "/add-shared-playlist",
  isAuth,
  users_controller.add_shared_playlist_to_user
);

/**
 * Route that allows a user to stop sharing his playlist with some specific user. It is required that the request is
 * made by the owner of the playlist.
 */
router.put(
  "/remove-shared-playlist",
  isAuth,
  users_controller.stop_sharing_playlist_with_user
);

/**
 * Route to update a user
 */
router.put("/:id", isAuth, users_controller.update);

/**
 * Route that allows a superadmin to update an user.
 */
router.put(
  "/special/:id",
  isAuth,
  authRole(ROLES.SUPERADMIN),
  users_controller.update
);

/**
 * Route to delete a user based on his id.
 */
router.delete(
  "/:id",
  //isAuth,
  //authRole(ROLES.SUPERADMIN),
  users_controller.delete
);

/**
 * Route that allows to obtain all the playlists owned by a user based on his id.
 * Can only be executed by admins or superadmins
 */
router.get(
  "/:id/playlists",
  isAuth,
  authRole([ROLES.ADMIN, ROLES.SUPERADMIN]),
  users_controller.getPlaylistsFromUser
);

/**
 * Route to sign in into the aplication
 */
router.post("/signin", users_controller.signinUser);

/**
 * Route that should be executed by a user when he wants to upload a song.
 */
router.post("/user-song", function (req, res) {
  upload.single("file")(req, res, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    users_controller.add_song_to_user(req, res);
  });
});

module.exports = router;
