const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
};
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log("IJJJ");
        callback(null, './ressources/static/assets/uploads');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];

        callback(null, name + Date.now() + '.' + extension);
    }
});

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './ressources/static/assets/uploads/');
//         const db = require("../models");
//         const Article = db.article;
//         const fs = require("fs");

//         //   filename: (req, file, cb) => {
//         //     cb(null, `${Date.now()}-groupomania-${file.originalname}`);

//     },
// });

// // // cb(null, __basedir + "/resources/static/assets/uploads/");

// const upload = multer({
//     dest: './ressources/static/assets/uploads/',
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.MIME_TYPES == "image/png" || file.MIME_TYPES == "image/jpg" || file.MIME_TYPES == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('File type not accepted (.png, .jpg, .jpeg)'));
//         }
//     }
// });



module.exports = multer({ storage: storage }).single('image');