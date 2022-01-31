import React from "react";
import { Box, Link as ChakraLink, Wrap } from "@chakra-ui/react";

export const PageFooter: React.FC = () => (
  <Box
    as="footer"
    display="flex"
    flexDirection="column"
    alignItems={{ base: "stretch", md: "center" }}
    marginTop="6"
    marginBottom="6"
    textAlign="center"
  >
    <Box
      as="nav"
      borderTopWidth="1px"
      borderStyle="solid"
      borderColor="gray.700"
      marginTop="6"
      width="100%"
      maxW="3xl"
    >
      <Wrap
        direction={{ base: "column", md: "row" }}
        wrap="wrap"
        marginBottom={{ base: "6", md: "12" }}
        paddingTop={{ base: "6", md: "0" }}
        spacing="0"
        justify="center"
      >
        <Box as="li" margin="0">
          <ChakraLink
            href="https://stately.ai/privacy"
            display="block"
            padding="5"
            paddingBottom={{ base: "5", md: "0" }}
            color="gray.300"
            borderRightWidth={{ base: "0", md: "1px" }}
            borderBottomWidth={{ base: "1px", md: "0" }}
            borderStyle="solid"
            borderColor="gray.700"
            _hover={{ color: "white", textDecoration: "underline" }}
          >
            Privacy policy
          </ChakraLink>
        </Box>
        <Box as="li">
          <ChakraLink
            href="https://xstate.js.org/docs"
            display="block"
            padding="5"
            paddingBottom={{ base: "5", md: "0" }}
            color="gray.300"
            borderRightWidth={{ base: "0", md: "1px" }}
            borderBottomWidth={{ base: "1px", md: "0" }}
            borderStyle="solid"
            borderColor="gray.700"
            _hover={{ color: "white", textDecoration: "underline" }}
          >
            Documentation
          </ChakraLink>
        </Box>
        <Box as="li">
          <ChakraLink
            href="https://twitter.com/statelyai"
            display="block"
            padding="5"
            paddingBottom={{ base: "5", md: "0" }}
            color="gray.300"
            borderRightWidth={{ base: "0", md: "1px" }}
            borderBottomWidth={{ base: "1px", md: "0" }}
            borderStyle="solid"
            borderColor="gray.700"
            _hover={{ color: "white", textDecoration: "underline" }}
          >
            Twitter
          </ChakraLink>
        </Box>
        <Box as="li">
          <ChakraLink
            href="https://youtube.com/c/statelyai"
            display="block"
            padding="5"
            paddingBottom={{ base: "5", md: "0" }}
            color="gray.300"
            borderRightWidth={{ base: "0", md: "1px" }}
            borderBottomWidth={{ base: "1px", md: "0" }}
            borderStyle="solid"
            borderColor="gray.700"
            _hover={{ color: "white", textDecoration: "underline" }}
          >
            YouTube
          </ChakraLink>
        </Box>
        <Box as="li">
          <ChakraLink
            href="https://discord.gg/xstate"
            display="block"
            padding="5"
            paddingBottom={{ base: "5", md: "0" }}
            color="gray.300"
            _hover={{ color: "white", textDecoration: "underline" }}
          >
            Discord community
          </ChakraLink>
        </Box>
      </Wrap>
    </Box>
    <Box>
      <Box
        as="small"
        color="gray.400"
        textTransform="uppercase"
        letterSpacing="0.1em"
      >
        Copyright &copy; Stately, {new Date().getFullYear()}
      </Box>
    </Box>
  </Box>
);
