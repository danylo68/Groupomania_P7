const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;



exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = async (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.userDelete = async (req, res) => {
  const user_id = req.params.id;
  // if (Number.isNaN(user_id)) return res.status(400).end();
  await User.findByPk(user_id);
  User.destroy(
    {
      where: { user_id: user_id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Utilisateur supprimé avec succès!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${user_id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "l'utilisateur ne peut etre supprimé avec l'id=" + user_id,
      });
    });
};
