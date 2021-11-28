const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    // operatorsAliases: evite erreur dans nodeJS attention à false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.articles = require("../models/article.model.js")(sequelize, Sequelize);
db.comments = require("../models/comment.model.js")(sequelize, Sequelize);
db.followers = require("../models/follower.model.js")(sequelize, Sequelize);



// liaison User_Role
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

//liaison User_Article ::::::::::::::::::::
// db.comment.belongsToMany(db.user, {
//   through: "user_comments",
//   as: "user",
//   foreignKey: "commentId",
//   // otherKey: "userId"
// });
// db.user.belongsToMany(db.comment, {
//   through: "user_comments",
//   as: "comment",
//   foreignKey: "userId",
//   // otherKey: "commentId"
// });

// // liaison User_follower ::::::::::::::::
// db.follower.belongsToMany(db.user, {
//   through: "user_followers",
//   as: "user",
//   foreignKey: "followerId",
//   // otherKey: "userId"
// });
// db.user.belongsToMany(db.follower, {
//   through: "user_followers",
//   as: "follower",
//   foreignKey: "userId",
//   // otherKey: "followerId"
// });

// // Liaison User_Article :::::::::::::::::::

// db.article.belongsToMany(db.user, {
//   through: "user_articles",
//   as: "user",
//   foreignKey: "articleId",
//   // otherKey: "userId"
// });
// db.user.belongsToMany(db.article, {
//   through: "user_articles",
//   as: "article",
//   foreignKey: "userId",
//   // otherKey: "articleId"
// });




db.ROLES = ["user", "admin"];

module.exports = db;