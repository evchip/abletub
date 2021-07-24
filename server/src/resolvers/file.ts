import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Payload } from "../entities/File";
import { isAuth } from "../middleware/isAuth";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";


@Resolver(S3Payload)
export class FileResolver {
    
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async signS3(
        @Arg('filename') filename: string,
        @Arg('filetype') filetype: number,
    ) {
        
        process.env.AWS_SECRET_ACCESS_KEY

        const objectParams = {
            Bucket: 'abletubtest',
            Key: filename,
            expires: 60,
            ContentType: filetype,
            ACL: 'public-read'
        }

        const client = new S3Client({
            signingRegion: 'us-west-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        })

        const command = new GetObjectCommand(objectParams);
        const signedRequest = await getSignedUrl(client, command)
        const url = `https://abletubtest.us-west-1.s3.amazonaws.com/${filename}`

        return {
            signedRequest,
            url
        }
        
    }

}