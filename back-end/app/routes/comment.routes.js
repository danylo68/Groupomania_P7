


module.exports = app => {
    const { authJwt } = require("../middleware");
    const router = require("express").Router();


    const commentCtrl = require("../controllers/comment.controller.js");

    // Create a new Comments
    router.post("/:article_id", [authJwt.verifyToken,], commentCtrl.create);

    // Retrieve all Comments
    router.get("/", commentCtrl.findAll);

    // Retrieve all published Comments
    router.get("/published", commentCtrl.findAllPublished);

    // Retrieve a single Comment with id
    router.get("/:comment_id", commentCtrl.findOne);

    // Update a Comment with id
    router.put("/:comment_id", [authJwt.verifyToken], commentCtrl.update);

    // Delete a Comment with id
    router.delete("/:comment_id", [authJwt.verifyToken], commentCtrl.delete);

    // Delete all Comment
    router.delete("/", [authJwt.verifyToken], commentCtrl.deleteAll);

    app.use('/api/comments', router);

};
