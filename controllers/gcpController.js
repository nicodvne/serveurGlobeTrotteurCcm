import {Storage} from '@google-cloud/storage';



export const createBucket = (req, res) => {
    createBucketWithStorageClassAndLocation(req.params.name).catch(console.error);

    res.send("normalement c'est bon mec");
}

export const getFiles = (req, res) => {
    dowloadAllFilesFromStorage().catch(console.error);
    
    res.send("Telechargement ok chef")
}

//https://cloud.google.com/storage/docs/creating-buckets
async function createBucketWithStorageClassAndLocation(bucketName) {
    const storage = new Storage();

    console.log(bucketName);

    // The name of a storage class
    const storageClass = process.env.STORAGE_CLASS;

    // The name of a location
    const location = process.env.LOCATION;

    const [bucket] = await storage.createBucket(bucketName, {
        location,
        [storageClass]: true,
    });

    console.log(
        `${bucket.name} created with ${storageClass} class in ${location}`
    );
}

//https://cloud.google.com/storage/docs/listing-objects#code-samples
async function dowloadAllFilesFromStorage() {
    const bucketName = process.env.BUCKET_NAME;
    const storage = new Storage();

    const [files] = await storage.bucket(bucketName).getFiles();

    console.log('Files:');
    files.forEach(file => {
        makeFilePublicInBucket(file.name);
        dowloadFileFromStorage(file.name);
    });
}

//https://cloud.google.com/storage/docs/downloading-objects#storage-download-object-nodejs
async function dowloadFileFromStorage(fileName) {
    // The ID of your GCS bucket
    const bucketName = process.env.BUCKET_NAME;

    // The path to which the file should be downloaded
    const destFileName = `images/${fileName}`;

    const storage = new Storage();

    const options = {
        destination: destFileName,
      };

    await storage.bucket(bucketName).file(fileName).download(options);

    console.log(
        `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
    );
}

//https://cloud.google.com/storage/docs/access-control/making-data-public#storage-make-object-public-nodejs
async function makeFilePublicInBucket(fileName) {
    const bucketName = process.env.BUCKET_NAME;

    const storage = new Storage();
    await storage.bucket(bucketName).file(fileName).makePublic();

    console.log(`gs://${bucketName}/${fileName} is now public.`);
}