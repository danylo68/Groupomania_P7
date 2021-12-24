


module.exports = app => {
  const { authJwt } = require("../middleware");
  const router = require("express").Router();
  const multer = require('../middleware/multer.config');
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
  router.delete("/:id", articleCtrl.delete);

  // Delete all Articles
  router.delete("/", articleCtrl.deleteAll);

  app.use('/api/articles', router);

};






// module.exports = app => {
//   app.use(function (req, res, next) {
//     res.header(
//       'Access-Control-Allow-Headers',
//       'x-access-token, Origin, Content-Type, Accept'
//     );
//     next();
//   });

//   // Posts
//   app.get('/api/articles', articleCtrl.all);

//   app.get('/api/articles-get/:id', [authJwt.verifyToken], articleCtrl.findone);

//   app.get('/api/articles-my/:id', [authJwt.verifyToken], articleCtrl.myPosts);
//   // app.get('/api/articles-friends', [authJwt.verifyToken], articleCtrl.friendsPosts);
//   app.post('/api/articles-create', [authJwt.verifyToken], multer, articleCtrl.create);

//   app.put('/api/articles-update', [authJwt.verifyToken], articleCtrl.update);

//   app.delete('/api/articles-delete/:id', [authJwt.verifyToken], articleCtrl.delete);
// };