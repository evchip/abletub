import { GetBucketAclCommand, PutObjectCommand, S3Client, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "dotenv-safe";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { S3Payload } from "../entities/File";
import { isAuth } from "../middleware/isAuth";
const fs = require('fs')


@Resolver()
export class FileResolver {
    
    @Mutation(() => S3Payload)
    @UseMiddleware(isAuth)
    async signS3(
        @Arg('filename') filename: string,
        @Arg('filetype') filetype: string,
    ): Promise<S3Payload> {
        
        const objectParams = {
            Bucket: 'abletubtest',
            Key: filename,
            expires: 6000,
            ContentType: filetype,
            ACL: 'public-read'
        }

        const region = "us-west-1"
        const bucketName = "abletubtest"
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

        const client = new S3Client({
            region: 'us-west-1',
            apiVersion: "2012-10-17",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        })

        const command = new PutObjectCommand(objectParams);
        const signedRequest = await getSignedUrl(client, command)
        console.log('signed req!!!!!!!', signedRequest)
        const url = 'https://abletubtest.s3.amazonaws.com/' + filename;

        return {
            signedRequest,
            url
        }
        
    }

}