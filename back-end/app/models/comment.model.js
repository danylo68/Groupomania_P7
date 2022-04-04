"use strict";

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        comment_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        content: {
            type: Sequelize.STRING(255),
            allowNull: false
        },

    },
        {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"

        });

    return Comment;
};


