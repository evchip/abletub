
import { _Post } from 'generated/graphql';
import React, { ReactElement, useEffect, useState } from 'react'
import { Web3Storage } from "web3.storage";
import { Box, Image } from "@chakra-ui/react";
import PlayPauseAudioFC from "./PlayPauseAudioFC";

interface Props {
    post: Pick<_Post, "id" | "createdAt" | "updatedAt" | "title" | "points" | "audioFileName" | "imageFileName" | "text" | "voteStatus"> | undefined;

}

function IPFSImage({post}: Props): ReactElement {
    const [CID, setCID] = useState("")

    const requestHandler = async () => {
        return await retrieve(post?.imageFileName!)
    }

    const getAccessToken = () => {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY5RGIxZDcwNzI2NjBCNjM4YjI0QWIwQjFGOEQ5OGFGZWNhZTlERUYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzIxNjk0NTI3NjcsIm5hbWUiOiJhYmxldHViIn0.fFhf0CfKqDOST6pADwgrffCz4P2AU5_FwmLOcMcxws4" as string;
      }

    const makeStorageClient = () => {
        const client = new Web3Storage({ token: getAccessToken() })
        return client
      }

    const retrieve = async (cid: string) => {
        const client = makeStorageClient()
        const res = await client.get(cid)
        console.log(`Got a response! [${res.status}] ${res.statusText}`)
        if (!res.ok) {
          throw new Error(`failed to get ${cid}`)
        }
        const files = await res?.files()
        const CIDConcat = `https://${files[0].cid}.ipfs.dweb.link/`
        setCID(CIDConcat)
      }

    useEffect(() => {
        requestHandler()
    }, [CID])
    return (
        <Box>
            <div className="port-cont-hov tile scale-anm">
                <Image
                    boxSize={["40", "72"]}
                    borderRadius="2rem"
                    className="portfolio-img"
                    src={CID}
                    alt=""
                    objectFit="cover"
                />
                <Box className="port-img-overlay" borderRadius="2rem">
                    <div className="port-text">
                    { post.audioFileName ? ( 
                    <PlayPauseAudioFC
                        post={post}
                    />) : (null)}
                    
                    </div>
                </Box>
            </div>
        </Box>
    )
}

export default IPFSImage
