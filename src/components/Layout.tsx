import React from "react";
import { Box } from "@chakra-ui/react";
import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";
import { Post } from "../types";

export const Layout: React.FC<{ posts: Post[] }> = ({ posts, children }) => (
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
      {children}
    </Box>
    <PageFooter />
  </Box>
);
