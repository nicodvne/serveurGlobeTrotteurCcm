import {Storage} from '@google-cloud/storage';
import { createBucketWithStorageClassAndLocation, dowloadAllFilesFromStorage } from '../services/googleCloudMethods.js';

export const createBucket = (req, res) => {
    createBucketWithStorageClassAndLocation(req.params.name).catch(console.error);

    res.send("normalement c'est bon mec");
}

export const getFiles = (req, res) => {
    dowloadAllFilesFromStorage().catch(console.error);
    
    res.send("Telechargement ok chef")
}