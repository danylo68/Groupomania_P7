const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        })
          .then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: "I,  ${req.body.email} registered successfully!" });
            });
          });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};



exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({
        id: user.user_id,
        username: user.username,
      }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.user_id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};



// ::::::::::::::::::::::::::::::::::: Delete User ::::::::::::::
// exports.userDelete = (req, res) => {
//   const user_id = parseInt(req.params.id, 10);
//   if (Number.isNaN(id)) return res.status(400).end();

//   User.destroy(req.body, {
//     where: { user_id: user_id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Utilisateur supprimé avec succès!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete User with id=${user_id}. Maybe User was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "l'utilisateur ne peut etre supprimé avec l'id=" + user_id,
//       });
//     });
// };


