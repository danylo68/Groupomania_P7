const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  // operatorsAliases: 0,:: attention laisser O ou erreur dans node//

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.article = require("../models/article.model.js")(sequelize, Sequelize);
db.comment = require("../models/comment.model.js")(sequelize, Sequelize);


// liaison User_Role
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id",
  as: "roles"

});

// Liaison User_Article:::::::::::::::::::
db.article.belongsTo(db.user, { foreignKey: 'user_id' });

// liaison User_Comment  ::::::::::::::::::::
db.comment.belongsTo(db.user, { foreignKey: "user_id" });

// liaison Article_Comment  ::::::::::::::::::::
db.comment.belongsTo(db.article, { foreignKey: 'article_id' });

db.ROLES = ["user", "admin"];

module.exports = db;