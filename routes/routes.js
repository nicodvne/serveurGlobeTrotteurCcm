import express from "express";
import { createBucket, getFiles } from "../controllers/gcpController.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome HomePage")
})

router.get('/create-bucket/:name', createBucket);

router.get('/get-image', getFiles);

export default router;