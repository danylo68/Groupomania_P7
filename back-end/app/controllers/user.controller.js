
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

// const User = require('../server/models').User;
// const Article = require('../server/models').Article;

// module.exports = {
//   async create(req, res) {
//     try {
//       let user = await User.create({
//         email: req.body.email,
//         password: bcrypt.hashSync(req.body.password, 8)
//       }, {
//         include: [{
//           model: Article,
//           as: 'articles'
//         }]
//       });

//       res.status(201).send(user);
//     }
//     catch (error) {
//       res.status(500).send(error)
//     };
//   }
// };