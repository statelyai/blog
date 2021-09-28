import React from "react";
import {
  Box,
  AccordionItem,
  Accordion,
  List,
  ListItem,
  Link as CharkaLink,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { groupPostsByCategory } from "../utils";
import { Post } from "../types";

export const Sidebar: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const postsByCategory = groupPostsByCategory(posts);
  return (
    <Box flexBasis="320px" borderRight="1px solid">
      <Accordion allowMultiple defaultIndex={[0]}>
        {Object.keys(postsByCategory).map((category) => (
          <AccordionItem key={category}>
            <AccordionButton>
              <Box flex="1" textAlign="left" as="h2" textTransform="capitalize">
                <strong>{category}</strong>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <List>
                {postsByCategory[category].map((post) => (
                  <ListItem key={post.slug}>
                    <Link href={post.slug} passHref>
                      <CharkaLink display="block" paddingX="4" paddingY="2">
                        {post.title}
                      </CharkaLink>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};
