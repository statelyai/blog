import {
  Box,
  Link as ChakraLink,
  Stack,
  List,
  Input,
  Wrap,
  ListItem,
  useOutsideClick,
  FormLabel,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useClipboard,
  IconProps,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Post } from "../types";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import FuzzySearch from "fuzzy-search";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";

const useSearch = (
  posts: Post[],
  containerRef: RefObject<HTMLDivElement>
): {
  result: Post[];
  searchValue: string;
  setSearchValue(newValue: string): void;
} => {
  const searcherRef = useRef(
    new FuzzySearch(posts, ["title", "description", "tags"], {
      caseSensitive: false,
    })
  );
  const [q, setQ] = useState("");
  const foundPosts = useMemo(
    () => (q ? searcherRef.current.search(q) : []),
    [q]
  );
  useOutsideClick({
    ref: containerRef,
    handler: () => {
      setQ("");
    },
  });
  // Clear on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQ("");
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);
  return { result: foundPosts, searchValue: q, setSearchValue: setQ };
};

function useFeeds() {
  const RSS = useClipboard("https://stately.ai/blog/feeds/rss.xml");
  const Atom = useClipboard("https://stately.ai/blog/feeds/atom.xml");
  const JSON = useClipboard("https://stately.ai/blog/feeds/feed.json");

  return {
    RSS,
    Atom,
    JSON,
  };
}

// Cherrypick whatever props we need from IconProps to avoid TS rabbit hole
const FeedIcon: React.FC<Pick<IconProps, "mt">> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="RSSicon"
    viewBox="0 0 8 8"
    width="20"
    height="20"
    {...props}
  >
    <rect
      className="button"
      stroke="none"
      fill="white"
      width="8"
      height="8"
      rx="1.5"
    />
    <circle
      className="symbol"
      stroke="none"
      fill="var(--chakra-colors-black)"
      cx="2"
      cy="6"
      r="1"
    />
    <path
      className="symbol"
      stroke="none"
      fill="var(--chakra-colors-black)"
      d="m 1,4 a 3,3 0 0 1 3,3 h 1 a 4,4 0 0 0 -4,-4 z"
    />
    <path
      className="symbol"
      stroke="none"
      fill="var(--chakra-colors-black)"
      d="m 1,2 a 5,5 0 0 1 5,5 h 1 a 6,6 0 0 0 -6,-6 z"
    />
  </svg>
);

export const PageHeader: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const { result, setSearchValue, searchValue } = useSearch(
    posts,
    searchResultsRef
  );
  const feeds = useFeeds();

  return (
    <Stack
      as="header"
      py="4"
      px={{ base: "4", md: "6" }}
      display="flex"
      justifyContent="space-between"
      alignItems="left"
      direction={{ base: "column", md: "row" }}
    >
      <Logo />
      <Box as="nav">
        <Wrap
          spacing="4"
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "left", md: "center" }}
        >
          <form style={{ position: "relative" }} id="search">
            <Input
              id="search-input"
              size="md"
              type="search"
              rounded="none"
              marginTop={{ base: "3", md: "0" }}
              borderColor="gray.700"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <FormLabel
              style={{ position: "absolute", top: "0" }}
              padding="2"
              paddingLeft="3"
              marginTop={{ base: "3", md: "0" }}
              htmlFor="search-input"
            >
              Search
            </FormLabel>
            {result.length > 0 && (
              <Box
                ref={searchResultsRef}
                position="absolute"
                top="100%"
                left="0"
                width={{ base: "100%", md: "400px" }}
                padding="2"
                bg="gray.900"
                border="1px solid"
                borderColor="gray.700"
              >
                <List alignItems="flex-start">
                  {result.map((p) => (
                    <ListItem
                      key={p.slug}
                      marginInlineStart="0"
                      padding="2"
                      lineHeight="1.1"
                    >
                      <Link href={`/${p.slug}`} passHref>
                        <ChakraLink
                          _hover={{
                            color: "white",
                            textDecoration: "underline",
                          }}
                        >
                          {p.title}
                        </ChakraLink>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </form>
          <Wrap as={List} listStyleType="none" direction="row" wrap="wrap">
            <Box as="li">
              <ChakraLink
                href="https://xstate.js.org/docs"
                isExternal
                display="block"
                padding="2"
                color="gray.300"
                _hover={{ color: "white", textDecoration: "underline" }}
              >
                Documentation
              </ChakraLink>
            </Box>
            <Box as="li">
              <ChakraLink
                href="https://github.com/statelyai/eng-blog"
                display="block"
                padding="2"
                color="gray.300"
                _hover={{ color: "white", textDecoration: "underline" }}
              >
                Github
              </ChakraLink>
            </Box>
            <Menu closeOnSelect={false}>
              <MenuButton
                variant="unstyled"
                as={Button}
                display="inline-flex"
                rightIcon={<FeedIcon mt="4px" />}
              >
                Subscribe
              </MenuButton>
              <MenuList bg="gray.900" borderColor="gray.700">
                {Object.entries(feeds).map(([feed, { onCopy, hasCopied }]) => (
                  <MenuItem
                    onClick={onCopy}
                    key={feed}
                    title="copy"
                    icon={
                      hasCopied ? <CheckIcon color="green.400" /> : <CopyIcon />
                    }
                  >
                    <Flex
                      as="span"
                      justifyContent="space-between"
                      alignItems="baseline"
                    >
                      {feed}{" "}
                      {hasCopied && (
                        <Text as="em" fontSize="small">
                          copied
                        </Text>
                      )}
                    </Flex>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Wrap>
        </Wrap>
      </Box>
    </Stack>
  );
};
