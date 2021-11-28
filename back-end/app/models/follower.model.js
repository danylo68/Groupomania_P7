"use strict";

module.exports = (sequelize, Sequelize) => {
    const Follower = sequelize.define("followers", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,

        },

        name: {
            type: Sequelize.STRING,

        }
    },
        {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"

        });

    return Follower;
};