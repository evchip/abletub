import { Maybe, User, Post } from "generated/graphql";
import React, { ReactElement, useEffect, useState } from "react";
import { Box, Image, Skeleton } from "@chakra-ui/react";
import PlayPauseAudioFC from "./PlayPauseAudioFC";
import { IPFSRequestHandler } from "../../utils/IPFSUploads/fetchIPFSData";

interface Props {
  post:
    | Maybe<
        { __typename?: "Post" } & Pick<
          Post,
          | "id"
          | "createdAt"
          | "updatedAt"
          | "title"
          | "points"
          | "audioFileName"
          | "imageFileName"
          | "voteStatus"
        > & { creator: { __typename?: "User" } & Pick<User, "id" | "username"> }
      >
    | undefined;
}

function IPFSImage({ post }: Props): ReactElement {
  const [imageCID, setImageCID] = useState("");
  const defaultImageURL =
    "https://bafybeie43scgedoyeiizc7cssktdjendathgqk4oz5cmblulcdubm5qebi.ipfs.dweb.link/";

  useEffect(() => {
    (async () => {
      const CID = (await IPFSRequestHandler(
        defaultImageURL,
        post!.imageFileName
      )) as string;
      setImageCID(CID);
    })();
  }, [imageCID]);

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "https://www.thoughtco.com/thmb/jOJFZeZ6jr4jE336MlwjKml2hEM=/4910x3472/filters:fill(auto,1)/question_mark-166836001-56af9f3c3df78cf772c6c639.jpg";
    event.currentTarget.className = "image-error";
    return (
      <Image
            boxSize={["60", "72"]}
            borderRadius="2rem"
            className="portfolio-img"
            src={event.currentTarget.src}
            alt=""
            objectFit="cover"
          />
    )
  };

  return (
    <Box>
      <div className="port-cont-hov tile scale-anm">
        <Skeleton
          startColor="pink.500"
          endColor="purple.500"
          height={["60", "72"]}
          borderRadius="2em"
          fadeDuration={6}
          isLoaded={imageCID !== "" ? true : false}
        >
          <Image
            boxSize={["60", "72"]}
            borderRadius="2rem"
            className="portfolio-img"
            src={imageCID}
            alt=""
            objectFit="cover"
            onError={imageOnErrorHandler}
          />
          <Box className="port-img-overlay" borderRadius="2rem">
            <Box className="port-text">
              {post && post?.audioFileName !== "" ? (
                <PlayPauseAudioFC post={post} />
              ) : null}
            </Box>
          </Box>
        </Skeleton>
      </div>
    </Box>
  );
}

export default IPFSImage;
