"use strict";


module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define("articles",

    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true

      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      description: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      author: {
        type: Sequelize.STRING(100),
        allowNull: false

      },
      published: {
        type: Sequelize.BOOLEAN

      },

      img: {
        type: Sequelize.STRING,
      },

      date: {
        type: Sequelize.STRING(50),
      },

      likedislike: {
        type: Sequelize.BOOLEAN,
      }
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