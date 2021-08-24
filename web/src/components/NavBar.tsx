import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Box, Button, Flex, Heading, Link, Menu,
    MenuButton, MenuItem, MenuList
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';



interface NavBarProps {
    
}

const NavBar: React.FC<NavBarProps> = ({}) => {
    const router = useRouter()
    const [{fetching: logoutFetching}, logout] = useLogoutMutation()
    const [{data, fetching}] = useMeQuery({
        pause: isServer()
    })
    let body = null

    // data is loading
    if (fetching) {

        // user not logged in
    } else if (!data?.me) { body = ( 
        <>
        <NextLink href="/login">
            <Link color='white' mr={4}>Login</Link>
        </NextLink>
        <NextLink href="/register">
            <Link color='white'>Register</Link>
        </NextLink>
        </>
    )

        // user is logged in
    } else {
        body = (
            <Flex align="center">
                <Menu >
                <MenuButton
                    fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                    as={Button} 
                    rightIcon={<ChevronDownIcon />}
                    bgColor="whiteAlpha.600"
                    px={4}
                    py={2}
                    transition="all 0.2s"
                    borderRadius="md"
                    borderWidth="1px"
                    _hover={{ bg: "gray.400" }}
                    _expanded={{ bg: "blue.400" }}
                    _focus={{ boxShadow: "outline" }}
                >
                    {data.me.username}
                </MenuButton>
                <MenuList bgColor="white">
                    <NextLink href='/create-post'>
                        <MenuItem
                            as={Link}
                            style={{ textDecoration: 'none' }}
                            _hover={{ bg: "gray.400" }}
                        >
                            Create Tub
                        </MenuItem>
                    </NextLink>
                    <MenuItem 
                        onClick={async () => {
                            await logout();
                            router.reload();
                        }} 
                        isLoading={logoutFetching}
                        variant="link"
                        _hover={{ bg: "gray.400" }}
                    >
                        Logout
                    </MenuItem>
                </MenuList>
                </Menu>
            </Flex>
        )
    }

    return (
        <Flex zIndex={50} position="sticky" top={0} bg="teal.600" p={4}>
            <Flex flex={1} m='auto' maxWidth={800} align="center">
                <NextLink href="/">
                    <Link>
                    <Heading as="h1" color="whiteAlpha.800" size="2xl">AbleTub</Heading>
                    </Link>
                </NextLink>
                <Box bg='teal.600' p={4} ml={'auto'}>
                    {body}
                </Box>
            </Flex>
        </Flex>
    )
}

export default NavBar
