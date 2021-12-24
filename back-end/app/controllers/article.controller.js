const config = require('../config/auth.config');
const db = require("../models");
const Op = db.Sequelize.Op;
const Article = db.article;
const Comment = db.comment;
const User = db.user;
const jwt = require("jsonwebtoken");



// Create and Save a new Article  ::::::::::::::::::::::::::::
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Autre champs exigé !",
    });
    return;
  }
  const token = req.headers['x-access-token'];
  const decoded = jwt.decode(token);
  console.log(req.userId)
  const article = {
    title: req.body.title,
    content: req.body.content,
    user_id: decoded.id,
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

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  return Article.findAll({
    where: condition,
    include: {
      model: User,
      attributes: ["user_id", "username", "last_name"],
    }
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
        attributes: ["user_id", "username", "last_name"],

      },
    ],
  })
    .then((articles) => {
      if (articles) {
        res.send(articles);
      } else {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving articles.",
        });
      }
    });
};
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.update = (req, res) => {
  const id = req.params.id;

  Article.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Article with id=" + id,
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
      return Article.findByPk(articleId).then((article) => {
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


// Delete a Article with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Article.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id,
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