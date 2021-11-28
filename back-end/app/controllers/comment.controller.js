
const db = require("../models");

const Op = db.Sequelize.Op;

const Comment = db.comments;

// Create and Save a new comment
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Autre champs exigé !",
        });
        return;
    }
    // Create a Comment
    const comment = {
        name: req.body.name,
        description: req.body.description,

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
}

// Retrieve all comments from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Comment.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving comment.",
            });
        });
};

// Find a single comment with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Comment.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find comment with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving comment with id=" + id,
            });
        });
};
// Update a comment by the id in the request


exports.update = (req, res) => {
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

// Delete a comment with the specified id in the request
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

// Delete all comments from the database.
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

// Find all published comments
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