
const db = require("../models");

const Op = db.Sequelize.Op;

const Follower = db.followers;

// Create and Save a new Follower
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Autre champs exigé !",
        });
        return;
    }
    // Create a Follower
    const follower = {
        name: req.body.name,

    };

    // Save Follower in the database
    Follower.create(follower)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Follower."
            });
        });
}

// Retrieve all Followers from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Follower.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving followers.",
            });
        });
};

// Find a single Follower with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Follower.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Follower with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Follower with id=" + id,
            });
        });
};
// Update a Follower by the id in the request


exports.update = (req, res) => {
    const id = req.params.id;

    Follower.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Follower was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Follower with id=${id}. Maybe Follower was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Follower with id=" + id,
            });
        });
};

// Delete a Follower with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Follower.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Follower was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Follower with id=${id}. Maybe Follower was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Follower with id=" + id,
            });
        });
};

// Delete all Followers from the database.
exports.deleteAll = (req, res) => {
    Follower.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Followers were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Followers.",
            });
        });
};

// Find all published Followers
exports.findAllPublished = (req, res) => {
    Follower.findAll({ where: { published: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Followers.",
            });
        });
};