"use strict";

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,

        },

        name: {
            type: Sequelize.STRING(50)

        },

        description: {
            type: Sequelize.STRING(255),

        }
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