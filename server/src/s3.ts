import aws from "aws-sdk";
import "dotenv-safe";

const region = "us-west-1"
const bucketName = "abletubtest"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export async function generateUploadURL(filename) {
    const params = ({
        Bucket: bucketName,
        Key: filename,
        Expires: 60
    })
    
    const signedRequest = await s3.getSignedUrlPromise('putOject', params)
    const url = 'https://abletubtest.s3.amazonaws.com/' + filename;

    return signedRequest;

}

