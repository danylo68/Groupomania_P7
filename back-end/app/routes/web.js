const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require('../middleware/upload');
<<<<<<< HEAD
const multer = require('../middleware/multer-config');
=======
// const multer = require('../middleware/multer.config');
>>>>>>> 6c47a207b85b0f8230ba3a3fdc41e0cfdfb1d586

const routes = (app) => {
    router.get('/files', homeController.getHome);

    router.post('/upload', upload.single('file'), uploadController.uploadFiles);

    return app.use("/", router);
};

module.exports = routes;