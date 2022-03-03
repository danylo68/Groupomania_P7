const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const Role = db.role;
const path = require('path');
<<<<<<< HEAD
 const config = require("./app/config/db.config.js");
// const initRoutes = require("./app/routes/web");
const fs = require('fs');
=======
// const config = require("./app/config/db.config.js");
const initRoutes = require("./app/routes/web");
>>>>>>> 6c47a207b85b0f8230ba3a3fdc41e0cfdfb1d586

// global.__basedir = __dirname;
// initRoutes(app);
const corsOptions = {
<<<<<<< HEAD
  // origin: "http://localhost:8081",


  // adresse cors pour vm
  origin: "http://192.168.1.26:8081",

=======
  origin: "http://localhost:8081"
>>>>>>> 6c47a207b85b0f8230ba3a3fdc41e0cfdfb1d586
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
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use('/', express.static(path.join(__dirname, '/ressources')));
=======
app.use('/images', express.static(path.join(__dirname, 'images')));
>>>>>>> 6c47a207b85b0f8230ba3a3fdc41e0cfdfb1d586

// database

// db.sequelize.sync();

//::::::::::::::::::::::::::  ATTENTION  :::::::::::::::::::::::::::::::
//force: true will drop the table if it already exists:::::::::::::::::

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// simple route
app.get("/", (req, res) => {
  res.json({ message: "find the OC Form application." });
});

// routes
require('./app/routes/comment.routes')(app);
require('./app/routes/article.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);



// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "admin"
  });
}