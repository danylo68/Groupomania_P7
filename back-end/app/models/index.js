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
db.article = require("../models/article.model.js")(sequelize, Sequelize);
db.comment = require("../models/comment.model.js")(sequelize, Sequelize);
db.images = require("./image.model.js")(sequelize, Sequelize);



// liaison User_Role
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "role_id",
  // otherKey: "user_id"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "user_id",
  // otherKey: "role_id"
});

// Liaison User_Article:::::::::::::::::::
db.article.belongsTo(db.user, { foreignKey: 'user_id' });


// liaison User_Comments  ::::::::::::::::::::
db.comment.belongsTo(db.user, { foreignKey: "user_id" });

// db.user.belongsToMany(db.article, {
//   through: "user_article",
//   as: "articles",
//   foreignKey: "user_id",
//   // otherKey: "article_id"
// });
// db.article.belongsToMany(db.user, {
//   through: "user_article",
//   as: "users",
//   foreignKey: "article_id",
//   // otherKey: "user_id"
// });






// db.comment.belongsToMany(db.user, {
//   through: "user_comment",
//   as: "users",
//   foreignKey: "comment_id",
//   // otherKey: "userId"
// });
// db.user.belongsToMany(db.comment, {
//   through: "user_comment",
//   as: "comments",
//   foreignKey: "user_id",
//   // otherKey: "commentId"
// });

// liaison Comment_Article    ::::::::::::::::
// db.article.belongsToMany(db.comment, {
//   through: "comment_article",
//   as: "comments",
//   foreignKey: "article_id",
//   otherKey: "comment_id"
// });
// db.comment.belongsToMany(db.article, {
//   through: "comment_article",
//   as: "articles",
//   foreignKey: "comment_id",
//   otherKey: "article_id"
// });




db.ROLES = ["user", "admin"];

module.exports = db;