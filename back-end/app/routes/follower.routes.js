const { authJwt } = require("../middleware");





module.exports = app => {
    var router = require("express").Router();

    const followerCtrl = require("../controllers/follower.controller.js");



    // Create a new Followers   
    router.post("/", followerCtrl.create);

    // Retrieve all Followers
    router.get("api/followers/all", followerCtrl.findAll);

    // Retrieve all published Followers
    router.get("api/followers/published", followerCtrl.findAllPublished);

    // Retrieve a single Follower with id
    router.get("api/followers/:id", followerCtrl.findOne);

    // Update a Follower with id
    router.put("api/followers/:id", followerCtrl.update);

    // Delete a Follower with id
    router.delete("api/followers/:id", followerCtrl.delete);

    // Delete all Followers
    router.delete("api/followers", followerCtrl.deleteAll);

    app.use('/api/followers', router);

};
