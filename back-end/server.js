const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const Role = db.role;
const path = require('path');
const fs = require('fs');
const config = require("./app/config/db.config.js");
require('dotenv').config();
// const initRoutes = require("./app/routes/web");

global.__basedir = __dirname;
// initRoutes(app);
const corsOptions = {
  origin: "http://localhost:8081",

  // ::::::: Adresse Cors pour VM box :::::::
  // origin: "http://192.168.1.26:8081",
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content, Accept, Content-Type, Authorization, x-access-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'ressources')));
//::::::::::::::::::::::::::  ATTENTION  :::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//force: true will drop the table if it already exists   ::::::::::::::
// db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.get("/", (req, res) => {
  res.json({ message: "Grouomania Project." });
});

// routes
require('./app/routes/comment.routes')(app);
require('./app/routes/article.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    role_id: 1,
    name: "user"
  });

  Role.create({
    role_id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });

};