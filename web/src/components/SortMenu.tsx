import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface Props {
  handleSort(cursorProp: string): void;
}

function SortMenu({handleSort}: Props): ReactElement {
  return (
    <Flex justifyContent="flex-start" mt={5}>
      <Menu>
        <MenuButton
          fontSize={{ base: "12px", md: "14px", lg: "16px" }}
          as={Button}
          rightIcon={<ChevronDownIcon />}
          px={4}
          py={2}
          color="white"
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          borderColor="pink.200"
          _hover={{ bg: "pink.400" }}
          _expanded={{ bg: "white", color: "black" }}
          _focus={{ boxShadow: "outline" }}
          defaultValue="new"
        >
          sort
        </MenuButton>
        <MenuList bgColor="black">
          <MenuItem
            onClick={() => {
                handleSort("DESC")
            }}
            _hover={{ bg: "gray.400" }}
            value="new"
          >
            new
          </MenuItem>
          <MenuItem
            onClick={() => {
                handleSort("ASC")
            }}
            _hover={{ bg: "gray.400" }}
            value="old"
          >
            old
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default SortMenu;
