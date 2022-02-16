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

        email: {
            type: Sequelize.STRING(255),
            unique: true,
            allowNull: false
        },

        password: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },

        username: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },

        last_name: {
            type: Sequelize.STRING(100),
            // allowNull: false,
        },
        // birth_date: {
        //     type: Sequelize.DATEONLY,
        //     // allowNull: true
        // },

        // phone: {
        //     type: Sequelize.STRING(50),
        //     validate: {
        //         not: ['[a-z]', 'i']
        //     }
        // },

        // organization: {
        //     type: Sequelize.STRING(255),
        //     // allowNull: false,
        // },

        // designation: {
        //     type: Sequelize.STRING(255),
        //     // allowNull: false,
        // },

        division: {
            type: Sequelize.STRING(255),
            // allowNull: false,
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





