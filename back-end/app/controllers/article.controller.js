
const express = require("express");
const app = express();
const config = require('../config/auth.config');
const db = require("../models");
const Op = db.Sequelize.Op;
const Article = db.article;
const Comment = db.comment;
const User = db.user;
const jwt = require("jsonwebtoken");
const fileUpload = require('express-fileupload');
const fs = require("fs")
const path = require('path');
app.use(fileUpload());

// Create and Save a new Article  ::::::::::::::::::::::::::::
exports.create = (req, res) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(401).send('No files were uploaded.');
  }

  const imageFile = `${req.protocol}://${req.get('host')}/ressources/${req.file.filename}`;
  const token = req.headers['x-access-token'];
  const decoded = jwt.decode(token);
  console.log(imageFile)
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
          err.message || "Some error occurred while creating the Article."
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
  const article_id = req.params.id;

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

// Find all published Articles
exports.findAllPublished = (req, res) => {
  Article.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Articles.",
      });
    });
};


