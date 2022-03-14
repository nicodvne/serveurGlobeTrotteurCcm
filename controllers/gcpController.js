import pkg from "@google-cloud/storage";
const { Storage } = pkg;
import { uploadFileInBucket, getAllPublicImagesUrl } from '../services/googleCloudMethods.js';


export const getFilesUrl = async (req, res) => {
    const links = await getAllPublicImagesUrl().catch(console.error);

    console.log(typeof(links));

    res.send(links);
}

export const uploadFile = (req, res) => {
    uploadFileInBucket(req.params.filename).catch(console.error);

    res.send("Import dans le bucket ok chef");
}

export const downloadFile = (req, res) => {
    uploadFileInBucket(req.file.originalname).catch(console.error);

    res.send("Download du fichier + export dans le bucket GCP");
}