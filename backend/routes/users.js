var express = require("express");
var router = express.Router();
var users_controller = require("../controllers/usersController");
var path=require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function (req,file,cb){
        var datetimestamp = Date.now();
        cb(null,file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length-1])
    }
})
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback){
      var ext = path.extname(file.originalname);
      if(ext!=='.mp3'){
          return callback(new Error('Only mp3 is allowed'));
      }
      callback(null,true);
  }
})

/* GET users listing. */
router.get("/", users_controller.index);
router.post("/", users_controller.create);
router.put("/:id", users_controller.update);
router.delete("/:id", users_controller.delete);
router.get("/:id", users_controller.search);
router.post("/user-song",upload.single('file'),users_controller.add_song_to_user);

module.exports = router;
