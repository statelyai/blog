import React, { ReactNode } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { PageHeader } from "./PageHeader";
import { PageFooter } from "./PageFooter";
import { Post } from "../types";

const LayoutSidebar: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      as="aside"
      marginInlineEnd="32"
      opacity="0.5"
      transition="opacity 0.25s ease"
      maxWidth="300px"
      _hover={{
        opacity: 1,
      }}
    >
      <Box
        as="section"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        {children}
      </Box>
    </Box>
  );
};

export const Layout: React.FC<{
  posts: Post[];
  renderSidebar?: () => ReactNode;
}> = ({ posts, renderSidebar, children }) => (
  <Box
    display="flex"
    flexDirection="column"
    height="100%"
    maxWidth="1300"
    marginLeft="auto"
    marginRight="auto"
  >
    <PageHeader posts={posts} />
    {typeof renderSidebar === "function" ? (
      <Box
        as="main"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        paddingInline={{ md: "6" }}
      >
        <LayoutSidebar display={{ base: "none", md: "block" }}>
          {renderSidebar()}
        </LayoutSidebar>
        {children}
      </Box>
    ) : (
      <Box
        as="main"
        display="flex"
        flexDirection="column"
        alignItems={{ base: "left", md: "center" }}
        flex="1"
        paddingInline="6"
      >
        {children}
      </Box>
    )}
    <PageFooter />
  </Box>
);
