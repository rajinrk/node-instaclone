const express = require("express");
const Post = require("../model/Schema");
const postRoute = express.Router();
const multer = require("multer");
const path=require('path')


postRoute.get("/post", (req, res) => {
  Post
    .find()
    .then((result) => {
      res.status(200).json({
        status: "posts fetched",
        Message: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "Internal Server Error",
        Message: error,
      });
    });
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,"uploads"
    );
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });

postRoute.post("/new", upload.single("image"), (req, res) => {
  const { name, location, likes, description } = req.body;
  const posted = new Post({
    name,
    location,
    likes,
    description,
    PostImage: req.file.filename,
    Date: new Date().toDateString()
  });

  posted
    .save()
    .then((result) => {
      res.status(200).json({
        message: "post saved!!!",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong",
        error: err,
      });
    });
});
module.exports = postRoute;
