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
  //authRole([ROLES.ADMIN, ROLES.SUPERADMIN]),
  users_controller.index
);
router.post("/", users_controller.create);

router.put("/add-shared-playlist", isAuth, users_controller.add_shared_playlist_to_user);
router.put("/remove-shared-playlist", isAuth, users_controller.stop_sharing_playlist_with_user);
router.put("/:id", isAuth, users_controller.update);
router.delete(
  "/:id",
  //isAuth,
  //authRole(ROLES.SUPERADMIN),
  users_controller.delete
);
router.get("/:id", users_controller.search);
router.post("/signin", users_controller.signinUser);
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
