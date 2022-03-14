import express from "express";
import {  downloadFile,  getFilesUrl } from "../controllers/gcpController.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'to_upload_image/');
    },
    filename: (req, file, cb) => {
        cb(null,  Date.now() + '_' + file.originalname);
    }
});

const upload = multer({storage: storage})

const router = express.Router();

router.get('/get-image-urls', getFilesUrl);

router.post('/download-image', upload.single('androidImage'), downloadFile);


export default router;