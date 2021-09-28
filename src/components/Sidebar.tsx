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

export const Sidebar: React.FC = () => (
  <Box flexBasis="320px" borderRight="1px solid">
    <Accordion allowMultiple defaultIndex={[0]}>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Entry level posts
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <List>
            <ListItem>
              <Link href="/">
                <CharkaLink>Blog post 1</CharkaLink>
              </Link>
            </ListItem>
          </List>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Advanced posts
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <List>
            <ListItem>
              <Link href="/">
                <CharkaLink>Blog post 1</CharkaLink>
              </Link>
            </ListItem>
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </Box>
);
