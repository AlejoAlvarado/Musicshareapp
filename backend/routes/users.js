var express = require("express");
var router = express.Router();
var users_controller = require("../controllers/usersController");

var path=require('path')
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = new aws.S3();

//ATTENTION, DELETE THIS WHEN PUSHING
//CREDENTIALS ARE ADDED HERE
/*aws.config.update({
    accessKeyId: "",
    secretAccessKey: ""
})*/

var storage = multerS3({
    acl: "public-read",
    s3,
    bucket: "songs-bucket-adv-web",
    metadata: function(req,file,cb){
        cb(null,{fieldName:"TESTING_METADATA"});
    },
    Key: function(req,file,cb){
        cb(null,Date.now().toString());
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
router.post("/user-song",function(req,res){
    upload.single('file')(req,res,function(err) {
        if(err){
            console.log(err);
            return
        }
        users_controller.add_song_to_user(req,res)
    })
});

module.exports = router;
