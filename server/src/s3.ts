import {S3} from 'aws-sdk/clients/s3'
const fs = require('fs')
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
    region: 'us-west-1',
    apiVersion: "2012-10-17",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})


export const uploadFile = async (file) => {
    const fileStream = fs.createReadStream(file.path)

    const params = {
        Bucket: 'abletubtest',
        Body: fileStream,
        Key: 'first-upload'
    }
    console.log('triggered')
    const mys3 = new S3(client)
    return await mys3.putObject(params)
}