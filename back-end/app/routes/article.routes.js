<<<<<<< HEAD
 multer = require('multer');
const db = require("../models");
const Article = db.article;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './ressources/static/assets/uploads/');
=======
let multer = require('multer');
const DIR = './images/';
const db = require("../models");
const Article = db.article;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/Users/mac/Documents/GitHub/GroupomaniaP7/back-end/app/ressources/static/assets/upload/");
>>>>>>> 6c47a207b85b0f8230ba3a3fdc41e0cfdfb1d586
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-groupomania-${file.originalname}`);
  },
});


<<<<<<< HEAD
const upload = multer({
  dest: './ressources/static/assets/uploads/',
=======
var upload = multer({
>>>>>>> 6c47a207b85b0f8230ba3a3fdc41e0cfdfb1d586
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('File type not accepted (.png, .jpg, .jpeg)'));
    }
  }
});


module.exports = app => {
  const express = require('express');
  const { authJwt } = require("../middleware");
  const router = require("express").Router();
  const articleCtrl = require("../controllers/article.controller.js");

  // Create a new Articles   
  router.post("/", [authJwt.verifyToken, multer], articleCtrl.create);

  // Retrieve all Articles
  router.get("/", articleCtrl.findAll);

  // Retrieve all published Articles
  router.get("/published", articleCtrl.findAllPublished);

  // Retrieve a single Article with id
  router.get("/:id", articleCtrl.findOne);

  // Update a Article with id
  router.put("/:id", [authJwt.verifyToken, multer], articleCtrl.update);

  // Delete a Article with id
  router.delete("/:id", authJwt.verifyToken, articleCtrl.delete);

  // Delete all Articles
  router.delete("/", articleCtrl.deleteAll);

  router.post('/new', upload.array('image', 8), (req, res, next) => {
<<<<<<< HEAD

=======
>>>>>>> 6c47a207b85b0f8230ba3a3fdc41e0cfdfb1d586

    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
      const imgUrl = "http://192.168.1.26:3000/static/assets/uploads/"

<<<<<<< HEAD
      reqFiles.push('${imgUrl}' + req.files[i].filename)
=======
    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push('/Users/mac/Documents/GitHub/GroupomaniaP7/back-end/app/ressources/static/assets/upload/' + req.files[i].filename)
>>>>>>> 6c47a207b85b0f8230ba3a3fdc41e0cfdfb1d586
    }
    console.log("title", req.body.title)
    console.log("description", req.body.description)

    const article = {
      title: req.body.title,
      description: req.body.description,
      image: reqFiles[0]
    }


    Article.create(article)
      .then(article => {
        res.send(article);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Article."
        });
      });

  })

  app.use('/api/articles', router);

};



