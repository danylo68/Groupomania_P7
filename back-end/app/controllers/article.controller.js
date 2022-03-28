
const express = require("express");
const app = express();
// const config = require('../config/auth.config');
const db = require("../models");
const Op = db.Sequelize.Op;
const Article = db.article;
const User = db.user;
const jwt = require("jsonwebtoken");
const fileUpload = require('express-fileupload');
const fs = require("fs")
app.use(fileUpload());

// Create and Save a new Article  ::::::::::::::::::::::::::::
exports.create = async (req, res) => {

  const imageFile = `${req.protocol}://${req.get('host')}/static/assets/uploads/${req.file.filename}`;
  // const imageFile = req.file.filename;
  const token = req.headers['x-access-token'];
  const decoded = await jwt.decode(token);
  const article = {
    title: req.body.title,
    description: req.body.description,
    username: req.body.username,
    user_id: decoded.id,
    image: imageFile

  };
  // Save Article in the database
  Article.create(article)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la creation de cet Article."
      });
    });
};

// ::::::::::   Retrieve all Articles from the database  :::::::::::::::::::::::::::::::::::
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  return Article.findAll({
    where: condition,
    include: [
      {
        model: User,
        attributes: ["user_id", "username"],
      }
    ]
  })
    .then((article) => {
      if (article) {
        res.send(article);
      } else {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving article.",
        });
      }
    });
};
//// Find a single comment with an id  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.findOne = (req, res) => {
  const article_id = req.params.id
  Article.findByPk(article_id, {
    include: [
      {
        model: User,
        attributes: ["user_id", "username",],
      },
    ],
  })
    .then((articles) => {
      if (articles) {
        res.send(articles);
      } else {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving articles with id.",
        });
      }
    });
};
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.update = (req, res) => {
  const article_id = req.params.id;

  Article.update(req.body, {
    where: { article_id: article_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Article with id=${article_id}. Maybe Article was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Article with id=" + article_id,
      });
    });
};

exports.addArticle = (userId, articleId) => {
  return User.findByPk(userId)
    .then((user) => {
      if (!user) {
        console.log("User not found!");
        return null;
      }
      return Article.findByPk(articleId)
        .then((article) => {
          if (!article) {
            console.log("Article not found!");
            return null;
          }
          user.addArticle(article);
          console.log(`>> added Article id=${article.id} to User id=${user.id}`);
          return user;
        });
    })
    .catch((err) => {
      console.log(">> Error while adding Article to User: ", err);
    });
};


//:::::::::::   Delete an Article with id :::::::::::::
exports.delete = (req, res) => {
  const token = req.headers['x-access-token'];
  const decoded = jwt.decode(token);
  const article_id = req.params.id;

  User.findByPk(decoded.id)
    .then((user) => {
      let currentUserRole = null;
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            currentUserRole = roles[i].name
          }
        }
        Article.findByPk(req.params.id)
          .then((article) => {
            if (!article) {
              console.log("Article not found!");
              return null;
            }
            if (article.user_id === decoded.id || currentUserRole === "admin") {
              Article.destroy({
                where: { article_id: article_id },
              })
                .then((num) => {
                  if (num == 1) {
                    res.send({
                      message: "Article was deleted successfully!",
                    });
                  } else {
                    res.send({
                      message: `Cannot delete Article with id=${article_id}. Maybe Article was not found!`,
                    });
                  }
                })
                .catch((err) => {
                  res.status(500).send({
                    message: "Could not delete Article with id=" + article_id,
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



// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
  Article.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Articles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Articles.",
      });
    });
};

