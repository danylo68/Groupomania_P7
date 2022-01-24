const config = require('../config/auth.config');
const db = require("../models");
const Op = db.Sequelize.Op;
const Article = db.article;
const Comment = db.comment;
const User = db.user;
const jwt = require("jsonwebtoken");



// Create and Save a new comment :::::::::::::::::::::::::::::::::
exports.create = (req, res) => {
    // Validate request

    const token = req.headers['x-access-token'];
    const decoded = jwt.decode(token);
    console.log(req.userId)
    const comment = {

        content: req.body.content,
        user_id: decoded.id,
    };
    // Save Comment in the database
    Comment.create(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Comment."
            });
        });
};

// // Retrieve all comments from the database.::::::::::::::::::::::::::::::::::::::
exports.findAll = (req, res) => {
    const content = req.query.content;
    const condition = content ? { content: { [Op.like]: `%${content}%` } } : null;

    return Comment.findAll({
        where: condition,
        include: {
            model: User,
            attributes: ["user_id", "username"],
        }
    })
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
    const comment_id = req.params.id;
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
                        err.message || "Some error occurred while retrieving articles.",
                });
            }
        });
};



// // Update a comment by the id in the request   ::::::::::::::::::::::::::::

exports.update = async (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, {
        where: { id: id },
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
    const id = req.params.id;

    Comment.destroy({
        where: { id: id },
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
                message: "Could not delete Comment with id=" + id,
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