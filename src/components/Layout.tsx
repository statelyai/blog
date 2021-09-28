import React from "react";
import { Box } from "@chakra-ui/react";
import { PageHeader } from "./PageHeader";
import { Sidebar } from "./Sidebar";
import { Post } from "../types";

export const Layout: React.FC<{ posts: Post[] }> = ({ posts, children }) => (
  <Box display="flex" flexDir="column" height="100%">
    <PageHeader />
    <Box as="main" flex="1" display="flex">
      <Sidebar posts={posts} />
      {children}
    </Box>
  </Box>
);
