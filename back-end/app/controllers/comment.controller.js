const express = require("express");
const db = require("../models");
const Comment = db.comment;
const User = db.user;
const jwt = require("jsonwebtoken");

// Create and Save a new comment :::::::::::::::::::::::::::::::::
exports.create = async (req, res) => {
    const token = req.headers['x-access-token'];
    const decoded = await jwt.decode(token);
    const comment = {
        content: req.body.content,
        user_id: decoded.id,
        article_id: req.body.article_id,
    };
    Comment.create(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Une erreur s'est produite lors de la creation de cet Commentaire."
            });
        });
};

//::::::::::   Retrieve all comments from the database  ::::::::::::::::::::::::::::::::::::::
exports.findAll = (req, res) => {
    const article_id = req.query.article_id;

    return Comment.findAll({
        where: { article_id: article_id },
        include: [
            {
                model: User,
                attributes: ["user_id", "username"],
            },
        ]
    })
        // .then(comment => res.status(200).json(comment))  => {
        .then((comment) => {
            if (comment) {
                res.send(comment);
            } else {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving comment.",
                });
            }
        });
};

// // Find a single comment with an id ::::::::::::::::::::::::::::::::::::::::
exports.findOne = (req, res) => {
    const comment_id = req.param.id;
    return Comment.findByPk(comment_id, {
        // where: { comment_id: comment_id },
        include: [
            // {
            //     model: User,
            //     attributes: ["user_id", "username"],
            // },
        ],
    })
        .then((comments) => {
            if (comments) {
                res.send(comments);
            } else {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la r??cup??ration des commentaire_id.",
                });
            }
        });
};
// // Update a comment by the id in the request   ::::::::::::::::::::::::::::
exports.update = async (req, res) => {
    const comment_id = req.params.id;
    const token = req.headers['x-access-token'];
    const decoded = await jwt.decode(token);

    const comment = {
        content: req.body.content,
        user_id: decoded.id,
    }

    Comment.update(comment, {
        where: { comment_id: comment_id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Comment was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Comment with id=${id}. Maybe comment was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Comment with id=" + id,
            });
        });
};

// Delete a comment with the specified id in the request :::::::::::::::::::::::::::::
exports.delete = (req, res) => {
    const token = req.headers['x-access-token'];
    const decoded = jwt.decode(token);
    const comment_id = req.params.id;

    User.findByPk(decoded.id)
        .then((user) => {
            let currentUserRole = null;
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        currentUserRole = roles[i].name
                    }
                }
                Comment.findByPk(req.params.id)
                    .then((comment) => {
                        if (!comment) {
                            console.log("Comment not found!");
                            return null;
                        }
                        if (comment.user_id === decoded.id || currentUserRole === "moderator") {
                            Comment.destroy({
                                where: { commment_id: comment_id },
                            })
                                .then((num) => {
                                    if (num == 1) {
                                        res.send({
                                            message: "Commment was deleted successfully!",
                                        });
                                    } else {
                                        res.send({
                                            message: `Cannot delete Comment with id=${comment_id}. Maybe Comment was not found!`,
                                        });
                                    }
                                })
                                .catch((err) => {
                                    res.status(500).send({
                                        message: "Could not delete comment with id=" + comment_id,
                                    });
                                });
                        }
                        else {
                            res.status(403).send({
                                message: "You don't have permission to perform this action",
                            });
                        }
                    });
            });
        })
};


// Delete all comments from the database. ::::::::::::::::::::::::::::::::::::::::::
exports.deleteAll = (req, res) => {
    Comment.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Comment were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Comment.",
            });
        });
};

// Find all published comments ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
exports.findAllPublished = (req, res) => {
    Comment.findAll({ where: { published: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Comment.",
            });
        });
};