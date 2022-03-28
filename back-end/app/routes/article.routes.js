
// const multer = require('multer');
// multer = require('multer');
// const db = require("../models");
// const Article = db.article;


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './ressources/static/assets/uploads/');
//     const db = require("../models");
//     const Article = db.article;
//     // const fs = require("fs");

//     // const storage = multer.diskStorage({
//     //   destination: (req, file, cb) => {
//     //     cb(null, './ressources/static/assets/uploads/');
//     //   },
//     //   filename: (req, file, cb) => {
//     //     cb(null, `${Date.now()}-groupomania-${file.originalname}`);
//   },
// });

// // cb(null, __basedir + "/resources/static/assets/uploads/");

// const upload = multer({
//   dest: './ressources/static/assets/uploads/',
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('File type not accepted (.png, .jpg, .jpeg)'));
//     }
//   }
// });

const { authJwt } = require("../middleware");
const router = require("express").Router();
const articleCtrl = require("../controllers/article.controller.js");
const multer = require('../middleware/multer-config');

module.exports = app => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });


  // const express = require('express');
  // Retrieve all Articles
  router.get("/", articleCtrl.findAll);

  // Retrieve a single Article with id
  router.get("/:id", articleCtrl.findOne);

  // Create a new Articles   
  router.post("/", [authJwt.verifyToken], multer, articleCtrl.create);
  // router.post('/new', authJwt.verifyToken, upload.array('image', 8), articleCtrl.create)

  // Update a Article with id
  router.put("/:id", [authJwt.verifyToken], multer, articleCtrl.update);

  // Delete a Article with id
  router.delete("/:id", authJwt.verifyToken, articleCtrl.delete);

  // Delete all Articles
  router.delete("/", authJwt.verifyToken, articleCtrl.deleteAll);


  // router.post('/new', authJwt.verifyToken, upload.array('image', 8), (req, res, next) => {

  //   const reqFiles = [];
  //   for (var i = 0; i < req.files.length; i++) {
  //     const imgUrl = 'http://localhost:3000/static/assets/uploads/'
  //     reqFiles.push(imgUrl + req.files[i].filename)
  //   }
  //   console.log("title", req.body.title)
  //   console.log("description", req.body.description)

  //   const article = {
  //     title: req.body.title,
  //     description: req.body.description,
  //     image: reqFiles[0]
  //   }
  //   Article.create(article)
  //     .then(article => {
  //       res.send(article);
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while creating the Article."
  //       });
  //     });
  // })
  app.use('/api/articles', router);

};

