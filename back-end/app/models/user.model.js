"use strict";

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        user_id: {
            type: Sequelize.INTEGER,
            // defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },

        email: {
            type: Sequelize.STRING(255),
            unique: true,
            allowNull: false
        },

        password: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },

        img: {
            type: Sequelize.STRING,
            // allowNull: false,
        },

    },
        {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        });

    return User;
};





