
const express = require("express");
const app = express();
const db = require("../models");
const Op = db.Sequelize.Op;
const Article = db.article;
const User = db.user;
const jwt = require("jsonwebtoken");
const multer = require('multer')
const fileUpload = require('express-fileupload');
const fs = require("fs")





// Create and Save a new Article  ::::::::::::::::::::::::::::
exports.create = (req, res) => {

  const token = req.headers['x-access-token'];
  const decoded = jwt.decode(token);


  // let imageFile;
  // imageFile = `${req.protocol}://${req.get('host')}/static/assets/uploads/${req.file.filename}`;

  // console.log(imageFile);

  const article = {
    title: req.body.title,
    description: req.body.description,
    image: `${req.protocol}://${req.get('host')}/static/assets/uploads/${req.file.filename}`,
    user_id: decoded.id

  };
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

// :::::::::::::::: Update Article  :::::::::::::::::::::::::::::::::::::::::::::
exports.update = async (req, res) => {
  const token = req.headers['x-access-token'];
  const decoded = jwt.decode(token);

  const article_id = req.params.id;

  let imageFile = `${req.protocol}://${req.get('host')}/static/assets/uploads/${req.file.filename}`;

  const articleUpdate = await ({
    title: req.body.title,
    description: req.body.description,
    image: imageFile,
    user_id: decoded.id
  })
  // const articleUpdate = await req.file ? {
  //   ...req.body,
  //   image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  // } : {
  //   title: req.body.title,
  //   descrition: req.body.descrition,
  // }
  console.log(articleUpdate)
  console.log('ttttttt')

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


              Article.update(articleUpdate,
                {
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



