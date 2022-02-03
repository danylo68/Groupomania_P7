


module.exports = app => {
    const { authJwt } = require("../middleware");
    const router = require("express").Router();
    const multer = require('../middleware/multer.config');
    const commentCtrl = require("../controllers/comment.controller.js");

    // Create a new Comments

    router.post("/", [authJwt.verifyToken, multer], commentCtrl.create);

    // Retrieve all Comments
    router.get("/", commentCtrl.findAll);

    // Retrieve all published Comments
    router.get("/published", commentCtrl.findAllPublished);

    // Retrieve a single Comment with id
    router.get("/:id", commentCtrl.findOne);

    // Update a Comment with id
    router.put("/:id", [authJwt.verifyToken, multer], commentCtrl.update);

    // Delete a Comment with id
    router.delete("/:id", [authJwt.verifyToken, multer], commentCtrl.delete);

    // Delete all Comment
    router.delete("/", commentCtrl.deleteAll);

    app.use('/api/comments', router);

};
