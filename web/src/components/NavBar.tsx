import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={4}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );

    // user is logged in
  } else {
    body = (
      <Flex align="center" >
        <Menu >
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            px={4}
            py={2}
            color="white"
            bgColor="black"
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            borderColor="pink.200"
            _hover={{ bg: "pink.400" }}
            _expanded={{ bg: "white", color: "black" }}
            _focus={{ boxShadow: "outline" }}
          >
            {data.me.username}
          </MenuButton>
          <MenuList bgColor="black" borderColor="pink.200" borderWidth="1px">
            <NextLink href="/create-post">
              <MenuItem
                as={Link}
                style={{ textDecoration: "none" }}
                _hover={{ bg: "pink.400" }}
              >
                create tub
              </MenuItem>
            </NextLink>
            <MenuItem
              onClick={async () => {
                await logout();
                router.reload();
              }}
              isLoading={logoutFetching}
              variant="link"
              _hover={{ bg: "pink.400" }}
            >
              logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    );
  }

  return (
    <Flex zIndex={50} position="sticky" top={0} bg="black" p={2}>
      <Flex flex={1} m="auto" maxWidth={1400} align="center">
        <NextLink href="/">
          <Link>
            <Heading
              as="h1"
              letterSpacing=".8rem"
              color="pink.50"
              fontSize={{ sm:"12px", md: "18px", lg: "40px" }}
              pb={0}
              ml={4}
              fontWeight="normal"
              _hover={{ color: "pink.400" }}
              _focus={{ boxShadow: "outline" }}
              style={{textDecoration: "none"}}
            >
              abletub
            </Heading>
          </Link>
        </NextLink>
        <Box p={4} ml={"auto"}>
          {body}
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
