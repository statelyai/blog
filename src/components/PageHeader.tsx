import { Box, Link, HStack, List } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Logo } from "./Logo";

export const PageHeader: React.FC = () => (
  <Box
    as="header"
    height="60px"
    padding="6"
    borderBottom="1px solid"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >
    <Logo />
    <Box as="nav">
      <HStack as={List} spacing="6" listStyleType="none">
        <li>
          <Link href="https://stately.ai" isExternal>
            Stately.ai <ExternalLinkIcon />
          </Link>
        </li>
        <li>
          <Link href="https://github.com/stately.ai/eng-blog" isExternal>
            Github <ExternalLinkIcon />
          </Link>
        </li>
      </HStack>
    </Box>
  </Box>
);
