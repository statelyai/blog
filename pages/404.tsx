import { NextPage } from "next";
import React from "react";
import { Post } from "../src/types";
import { Box, Heading, Link as ChakraLink } from "@chakra-ui/react";
import { PageHeader } from "../src/components/PageHeader";
import { PageFooter } from "../src/components/PageFooter";

const NotFound: NextPage<{ posts: Post[] }> = ({ posts }) => (
  <Box
    display="flex"
    flexDirection="column"
    height="100%"
    maxWidth="1300"
    marginLeft="auto"
    marginRight="auto"
  >
    <PageHeader posts={posts} />
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      alignItems={{ base: "left", md: "center" }}
      flex="1"
    >
      <Heading
        as="h1"
        padding="6"
        marginTop={{ base: "0", md: "10" }}
        marginBottom={{ base: "6", md: "12" }}
        textAlign="left"
        fontWeight="normal"
        fontSize={{ base: "4xl", md: "5xl" }}
      >
        Page not found
      </Heading>
      <Box as="p" textAlign="left" padding="6">
        Sorry we can’t find that page.{" "}
        <ChakraLink href="/" color="primary.300" textDecoration="underline">
          Return to all blog posts
        </ChakraLink>{" "}
        or use the search box above.
      </Box>
    </Box>
    <PageFooter />
  </Box>
);

export default NotFound;
