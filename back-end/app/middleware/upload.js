// const multer = require("multer");

// const imageFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image")) {
//         cb(null, true);
//     } else {
//         cb("Please upload only images.", false);
//     }
// };

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {

//         cb(null, __basedir + "/resources/static/assets/uploads/");
//         // cb(null, "" + "/ressources/static/assets/uploads/");

//     },
//     filename: (req, file, cb) => {
//         const name = file.originalname.split(' ').join('_');
//         const extension = MIME_TYPES[file.mimetype];
//         callback(null, name + Date.now() + '.' + extension);

//         // cb(null, `${Date.now()}${file.originalname}`);
//     },
// });

// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {

// //         cb(null, './ressources/static/assets/uploads/');
// //         const db = require("../models");
// //         const Article = db.article;
// //         // const fs = require("fs");

// //         // const storage = multer.diskStorage({
// //         //   destination: (req, file, cb) => {
// //         //     cb(null, './ressources/static/assets/uploads/');
// //         //   },
// //         //   filename: (req, file, cb) => {
// //         //     cb(null, `${Date.now()}-groupomania-${file.originalname}`);
// //     },
// // });


// const upload = multer({
//     dest: './ressources/static/assets/uploads/',
//     storage: storage,

//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('File type not accepted (.png, .jpg, .jpeg)'));
//         }
//     }
// });



// const uploadFile = multer({ storage: storage, fileFilter: imageFilter });
// module.exports = uploadFile;

