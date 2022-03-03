const multer = require("multer");

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
<<<<<<< HEAD
        cb(null, "" + "/ressources/static/assets/uploads/");
=======
        cb(null, "/Users/mac/Documents/GitHub/GroupomaniaP7/back-end/app" + "/ressources/static/assets/uploads/");
>>>>>>> 6c47a207b85b0f8230ba3a3fdc41e0cfdfb1d586
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
                const extension = MIME_TYPES[file.mimetype];
                callback(null, name + Date.now() + '.' + extension);

        // cb(null, `${Date.now()}${file.originalname}`);
    },
});


const uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;

// const multer = require('multer');

// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png',
//     'image/gif': 'gif',

// };

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'images');
//     },
//     filename: (req, file, callback) => {
//         const name = file.originalname.split(' ').join('_');
//         const extension = MIME_TYPES[file.mimetype];
//         callback(null, name + Date.now() + '.' + extension);
//     }
// });

// module.exports = multer({ storage }).single('image');