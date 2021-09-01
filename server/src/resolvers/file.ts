import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import * as AWS from "@aws-sdk";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "dotenv-safe";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { S3Payload } from "../entities/File";
import { isAuth } from "../middleware/isAuth";
import * as fs from "fs"



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
            ACL: 'public-read',
        }

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
        console.log("url", url)
        return {
            signedRequest,
            url
        }
        
    }

    // @Mutation(() => S3Payload)
    // @UseMiddleware(isAuth)
    // async uploadToS3(
    //     @Arg('filename') filename: string,
    //     @Arg('filetype') filetype: string,
    // ): Promise<S3Payload> {

    //     const s3 = new AWS.S3({
    //         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    //     });

    //     const objectParams = {
    //         Bucket: 'abletubtest',
    //         Key: filename,
    //         expires: 6000,
    //         ContentType: filetype,
    //         ACL: 'public-read',
    //         body: fs.createReadStream(filename)
    //     }

    //     return new Promise(async function(resolve, reject) {
    //         await s3.upload(objectParams, function(s3Err, data) {
    //             if (s3Err){
    //                 reject(s3Err);
    //             }
    //             console.log(`File uploaded successfully at ${data.Location}`);
    //             resolve(data.Location);
    //         });
    //     });

    // }
}