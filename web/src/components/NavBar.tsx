import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';


interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({}) => {
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
                <NextLink href='/create-post'>
                    <Button colorScheme="blackAlpha" as={Link} mr={4}>create tub</Button>
                </NextLink>
                <Box color='white' mr={2}>{data.me.username}</Box>
                <Button onClick={() => {
                    logout();
                }} 
                isLoading={logoutFetching}
                variant="link">Logout</Button>
            </Flex>
        )
    }

    return (
        <Flex zIndex={50} position="sticky" top={0} bg="teal.600" p={4}>
            <Flex flex={1} m='auto' maxWidth={800} align="center">
                <NextLink href="/">
                    <Link>
                    <Heading>AbleTub</Heading>
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
