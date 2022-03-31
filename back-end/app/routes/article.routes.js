
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

  // Retrieve all Articles
  router.get("/", articleCtrl.findAll);

  // Retrieve a single Article with id
  router.get("/:id", multer, articleCtrl.findOne);

  // Create a new Articles   
  router.post("/", [authJwt.verifyToken], multer, articleCtrl.create);


  // Update a Article with id
  router.put("/:id", [authJwt.verifyToken], multer, articleCtrl.update);

  // Delete a Article with id
  router.delete("/:id", authJwt.verifyToken, articleCtrl.delete);

  // Delete all Articles
  router.delete("/", authJwt.verifyToken, articleCtrl.deleteAll);

  app.use('/api/articles', router);

};

