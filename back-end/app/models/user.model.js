"use strict";

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,

        },

        email: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false
        },

        password: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },

        first_name: {
            type: Sequelize.STRING(100),
            // allowNull: false,
        },

        last_name: {
            type: Sequelize.STRING(100),
            // allowNull: false,
        },

        phone: {
            type: Sequelize.STRING(50),
            // allowNull: false,
        },

        organization: {
            type: Sequelize.STRING(255),
            // allowNull: false,
        },

        designation: {
            type: Sequelize.STRING(255),
            // allowNull: false,
        },

        division: {
            type: Sequelize.STRING(255),
            // allowNull: false,
        },

        img: {
            type: Sequelize.STRING,
            // allowNull: false,
        }
    },
        {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"

            // USERTableName: true
        });
    return User;
};


