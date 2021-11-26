import {
  Box,
  Link as ChakraLink,
  Stack,
  List,
  Input,
  Wrap,
  ListItem,
  useOutsideClick,
  FormLabel
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Logo } from "./Logo";
import { Post } from "../types";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import FuzzySearch from "fuzzy-search";

const useSearch = (
  posts: Post[],
  containerRef: RefObject<HTMLDivElement>
): {
  result: Post[];
  searchValue: string;
  setSearchValue(newValue: string): void;
} => {
  const searcherRef = useRef(
    new FuzzySearch(posts, ["title", "description", "keywords"], {
      caseSensitive: false,
    })
  );
  const [q, setQ] = useState("");
  const foundPosts = useMemo(() => (q ? searcherRef.current.search(q) : []), [
    q,
  ]);
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

export const PageHeader: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const { result, setSearchValue, searchValue } = useSearch(
    posts,
    searchResultsRef
  );

  return (
    <Stack
      as="header"
      py="4"
      px="6"
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
              htmlFor="search-input"
              >Search
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
                    <ListItem key={p.slug} marginInlineStart="0" padding="1">
                      <Link href={p.slug} passHref>
                        <ChakraLink
                          _hover={{ color: "white", textDecoration: "underline" }}
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
                href="https://github.com/stately.ai/eng-blog"
                display="block"
                padding="2"
                color="gray.300"
                _hover={{ color: "white", textDecoration: "underline" }}
              >
                Github
              </ChakraLink>
            </Box>
          </Wrap>
        </Wrap>
      </Box>
    </Stack>
  );
};
