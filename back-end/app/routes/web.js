const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require('../middleware/upload');
// const multer = require('../middleware/multer.config');

const routes = (app) => {
    router.get('/files', homeController.getHome);

    router.post('/upload', upload.single('file'), uploadController.uploadFiles);

    return app.use("/", router);
};

module.exports = routes;