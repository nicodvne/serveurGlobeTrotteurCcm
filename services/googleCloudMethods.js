import pkg from "@google-cloud/storage";
const { Storage } = pkg;

export async function getAllPublicImagesUrlAndName() {
    const bucketName = process.env.BUCKET_NAME;
    const storage = new Storage();

    const [files] = await storage.bucket(bucketName).getFiles();


    const links = {}

    for(const file of Object.entries(files)) {
        makeFilePublicInBucket(file[1].metadata.name);
        links[file[1].metadata.name] = file[1].publicUrl();
    }
    
    return links;
}


//https://cloud.google.com/storage/docs/access-control/making-data-public#storage-make-object-public-nodejs
async function makeFilePublicInBucket(fileName) {
    const bucketName = process.env.BUCKET_NAME;

    const storage = new Storage();
    await storage.bucket(bucketName).file(fileName).makePublic();

    console.log(`gs://${bucketName}/${fileName} is now public.`);
}

export async function uploadFileInBucket(filename) {
    // The ID of your GCS bucket
    const bucketName = process.env.BUCKET_NAME;

    const storage = new Storage();

    await storage.bucket(bucketName).upload(`to_upload_image/${filename}`, {
        destination: `${Date.now()}_${filename}`,
    });
    
    console.log(`${filename} uploaded to ${bucketName}`);
}
