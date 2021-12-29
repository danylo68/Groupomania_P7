const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const config = require("./app/config/db.config.js");
const app = express();
const initRoutes = require("./app/routes/web");

global.__basedir = __dirname;

initRoutes(app);

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();

// ATTENTION  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//force: true will drop the table if it already exists:::::::::::::::::

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "find the CythR application." });
});

// routes
require('./app/routes/comment.routes')(app);
require('./app/routes/article.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/web')(app);

app.use(express.static(path.join(__dirname, '/public')));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
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