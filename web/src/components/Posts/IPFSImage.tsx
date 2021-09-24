import { _Post } from "generated/graphql";
import React, { ReactElement, useEffect, useState } from "react";
import { Box, Image, Skeleton } from "@chakra-ui/react";
import PlayPauseAudioFC from "./PlayPauseAudioFC";
import { IPFSRequestHandler } from "../../utils/fetchIPFSData"

interface Props {
  post:
    | Pick<
        _Post,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "title"
        | "points"
        | "audioFileName"
        | "imageFileName"
        | "text"
        | "voteStatus"
      >
    | undefined;
}

function IPFSImage({ post }: Props): ReactElement {
  const [imageCID, setImageCID] = useState("");
  const defaultImageURL =
    "https://bafybeie43scgedoyeiizc7cssktdjendathgqk4oz5cmblulcdubm5qebi.ipfs.dweb.link/";

  useEffect(() => {
    (async () => {
      const CID = (await IPFSRequestHandler(defaultImageURL, post!.imageFileName)) as string;
      setImageCID(CID);
    })();
  }, [imageCID]);

  return (
    <Box>
      <div className="port-cont-hov tile scale-anm">
        <Skeleton
          startColor="pink.500"
          endColor="purple.500"
          height={["40", "72"]}
          borderRadius="2em"
          fadeDuration={6}
          isLoaded={imageCID !== "" ? true : false}
        >
          <Image
            boxSize={["40", "72"]}
            borderRadius="2rem"
            className="portfolio-img"
            src={imageCID}
            alt=""
            objectFit="cover"
          />
          <Box className="port-img-overlay" borderRadius="2rem">
            <div className="port-text">
            {post?.audioFileName !== "" ? <PlayPauseAudioFC post={post} /> : null}
          </div>
          </Box>
        </Skeleton>
      </div>
    </Box>
  );
}

export default IPFSImage;
