import React from "react";
import { Box } from "@chakra-ui/react";
import { PageHeader } from "./PageHeader";
import { Sidebar } from "./Sidebar";
import { Post } from "../types";

export const Layout: React.FC<{ posts: Post[] }> = ({ posts, children }) => (
  <Box display="flex" flexDir="column" height="100%">
    <PageHeader />
    <Box
      as="main"
      display="flex"
      justifyContent="center"
      flexDir={{ base: "column", md: "row" }}
      flex="1"
    >
      {/* <Sidebar posts={posts} /> */}
      {children}
    </Box>
  </Box>
);
