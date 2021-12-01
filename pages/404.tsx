import { NextPage } from "next";
import React from "react";
import {
  Box,
  Heading
} from "@chakra-ui/react";
import { PageHeader } from "../src/components/PageHeader";
import { PageFooter } from "../src/components/PageFooter";

const NotFound: NextPage = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="100%"
    maxWidth="1300"
    marginLeft="auto"
    marginRight="auto"
  >
    <PageHeader />
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
      <Box
        textAlign="left"
        padding="6"
      >
        <p>Sorry we can’t find that page.</p>
        <p><a href="/">Return to all blog posts</a> or use <a href="#search">the search box above</a>.</p>
      </Box>
    </Box>
    <PageFooter />
  </Box>
);

export default NotFound;
