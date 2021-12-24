"use strict";
const User = require("../models/user.model.js");

module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("articles", {

    article_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    title: {
      type: Sequelize.STRING(255),
      allowNull: false
    },

    content: {
      type: Sequelize.STRING(255),
      allowNull: false
    },

    img: {
      type: Sequelize.STRING,
    },

    likedislike: {
      type: Sequelize.BOOLEAN,
    },

  },
    {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at"


    });
  // Article.hasMany(User);

  return Article;
};


// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });