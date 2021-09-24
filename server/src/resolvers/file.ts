import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "dotenv-safe";
import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { S3Payload } from "../entities/File";
import { isAuth } from "../middleware/isAuth";
import minimist from "minimist";
import { Web3Storage, getFilesFromPath } from "web3.storage";

@Resolver()
export class FileResolver {
  @Mutation(() => S3Payload)
  @UseMiddleware(isAuth)
  async signS3(
    @Arg("filename") filename: string,
    @Arg("filetype") filetype: string
  ): Promise<S3Payload> {
    const objectParams = {
      Bucket: "abletubtest",
      Key: filename,
      expires: 6000,
      ContentType: filetype,
      ACL: "public-read",
    };

    const client = new S3Client({
      region: "us-west-1",
      apiVersion: "2012-10-17",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new PutObjectCommand(objectParams);
    const signedRequest = await getSignedUrl(client, command);
    const url = "https://abletubtest.s3.amazonaws.com/" + filename;
    return {
      signedRequest,
      url,
    };
  }

}
