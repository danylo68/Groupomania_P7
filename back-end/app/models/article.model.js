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

    image: {
      type: Sequelize.STRING,
      allowNull: true
    },

    title: {
      type: Sequelize.STRING(255),
      allowNull: false
    },

    description: {
      type: Sequelize.STRING(255),
      allowNull: false
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

  return Article;
};


