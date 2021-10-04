import { Flex, Box, Text } from "@chakra-ui/layout";
import { CloseButton } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import TextLoop from "react-text-loop";

interface Props {}

function Banner({}: Props): ReactElement {
  const [isClosed, setIsClosed] = useState(false);
  return (
    <>
      {!isClosed ? (
        <Flex
          zIndex={40}
          position="sticky"
          top={0}
          bgColor="mediumslateblue"
          align="center"
        >
          <Flex flex={1} m="auto" maxWidth={1400} justifyContent="space-between" align="center">
              <Text
                fontSize={["xs", "sm", "md"]}
                py={2}
                px={2}
                ml={3}
                width={["20rem", "30rem", "50rem"]}
              >
                <TextLoop interval={5000} noWrap={false} className="text-loop">
                  <span className="loop-text">
                    abletub uses IPFS: a decentralized network protocol.
                  </span>
                  <span className="loop-text">
                    while content delivery speed isn't quite there yet...
                  </span>
                  <span className="loop-text">
                    abletub streams music without a single server!
                  </span>
                </TextLoop>{" "}
              </Text>
              <CloseButton
                mr={3}
                onClick={() => {
                  setIsClosed(true);
                }}
              />
          </Flex>
        </Flex>
      ) : null}
    </>
  );
}

export default Banner;
