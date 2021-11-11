import React from "react";
import { Box } from "@chakra-ui/react";
import { PageHeader } from "./PageHeader";
import { Post } from "../types";

export const Layout: React.FC<{ posts: Post[] }> = ({ posts, children }) => (
  <Box display="flex" flexDirection="column" height="100%">
    <PageHeader posts={posts} />
    <Box
      as="main"
      display="flex"
      flexDir="column"
      alignItems={{ base: "left", md: "center" }}
      flex="1"
    >
      {/* <Sidebar posts={posts} /> */}
      {children}
    </Box>
  </Box>
);
