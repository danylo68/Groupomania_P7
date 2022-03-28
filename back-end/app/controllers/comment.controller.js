const config = require('../config/auth.config');
const db = require("../models");
const Op = db.Sequelize.Op;
const Article = db.article;
const Comment = db.comment;
const User = db.user;
const jwt = require("jsonwebtoken");
const { article } = require('../models');

// Create and Save a new comment :::::::::::::::::::::::::::::::::
exports.create = (req, res) => {
    const token = req.headers['x-access-token'];
    const decoded = jwt.decode(token);
    const comment = {
        content: req.body.content,
        user_id: decoded.id,
        article_id: req.body.article_id,
    };
    // Save Comment in the database
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
    const comment_id = req.query.comment_id;
    Comment.findByPk(comment_id, {
        include: [
            {
                model: User,
                attributes: ["user_id", "username"],
            },
        ],
    })
        .then((comments) => {
            if (comments) {
                res.send(comments);
            } else {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la récupération des commentaire_id.",
                });
            }
        });
};

// // Update a comment by the id in the request   ::::::::::::::::::::::::::::

exports.update = async (req, res) => {
    const comment_id = req.params.id;

    Comment.update(req.body, {
        where: { id: comment_id },
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
    const comment_id = req.params.id;
    // const token = req.headers['x-access-token'];
    // const decoded = jwt.decode(token);
    // console.log(req.userId)

    Comment.destroy({
        where: { coment_id: comment_id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Comment was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Comment with id=${id}. Maybe comment was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Comment with id=" + comment_id,
            });
        });
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