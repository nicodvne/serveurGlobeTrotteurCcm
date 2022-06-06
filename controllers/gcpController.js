import pkg from "@google-cloud/storage";
const { Storage } = pkg;
import { uploadFileInBucket, getAllPublicImagesUrlAndName} from '../services/googleCloudMethods.js';


export const getFilesUrl = async (req, res) => {
    var links = await getAllPublicImagesUrlAndName().catch(console.error); 

    var datas = {};
    for ( const [key, value] of Object.entries(links)) {
        datas[key.split('_')[1].slice(0, -4)] = value;
    }

    res.render('photos', {datas: datas});
}

export const uploadFile = (req, res) => {
    uploadFileInBucket(req.params.filename).catch(console.error);

    res.send("Import dans le bucket ok chef");
}

export const downloadFile = (req, res) => {
    uploadFileInBucket(req.file.originalname).catch(console.error);

    res.send("Download du fichier + export dans le bucket GCP");
}