const { authJwt } = require("../middleware");





module.exports = app => {
    var router = require("express").Router();

    const commentCtrl = require("../controllers/comment.controller.js");

    // Create a new Comments

    router.post("/", commentCtrl.create);

    // Retrieve all Comments
    router.get("api/comments/all", commentCtrl.findAll);

    // Retrieve all published Comments
    router.get("api/comments/published", commentCtrl.findAllPublished);

    // Retrieve a single Comment with id
    router.get("api/comments/:id", commentCtrl.findOne);

    // Update a Comment with id
    router.put("api/comments/:id", commentCtrl.update);

    // Delete a Comment with id
    router.delete("api/comments/:id", commentCtrl.delete);

    // Delete all Comment
    router.delete("api/comments", commentCtrl.deleteAll);

    app.use('/api/comments', router);

};
