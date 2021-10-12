import {
  Box,
  Link as ChakraLink,
  Stack,
  List,
  Input,
  ListItem,
  useOutsideClick,
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
      py="3"
      px="6"
      display="flex"
      justifyContent="space-between"
      alignItems="left"
      direction={{ base: "column", md: "row" }}
    >
      <Logo />
      <Box as="nav">
        <Stack
          spacing="4"
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "left", md: "center" }}
        >
          <form style={{ position: "relative" }}>
            <Input
              placeholder="Search"
              size="md"
              type="search"
              rounded="none"
              marginTop={{base: "3", md: "0"}}
              _placeholder={{ color: "white" }}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            {result.length > 0 && (
              <Box
                ref={searchResultsRef}
                position="absolute"
                top="100%"
                left="0"
                width={{base: "100%", md: "400px"}}
                padding="5"
                bg="gray.900"
                border="1px solid"
                borderColor="whiteAlpha.400"
              >
                <List alignItems="flex-start">
                  {result.map((p) => (
                    <ListItem key={p.id} marginInlineStart="0">
                      <Link href={p.slug} passHref>
                        <ChakraLink padding="5">
                          <small>{p.title}</small>
                        </ChakraLink>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </form>
          <Stack as={List} listStyleType="none" direction="row" wrap="wrap">
            <Box as="li">
              <ChakraLink
                href="https://stately.ai"
                isExternal
                display="block"
                padding="2"
                color="gray.400"
              >
                Stately.ai <ExternalLinkIcon />
              </ChakraLink>
            </Box>
            <Box as="li">
              <ChakraLink
                href="https://xstate.js.org/docs"
                isExternal
                display="block"
                padding="2"
                color="gray.400"
              >
                Documentation <ExternalLinkIcon />
              </ChakraLink>
            </Box>
            <Box as="li">
              <ChakraLink
                href="https://github.com/stately.ai/eng-blog"
                isExternal
                display="block"
                padding="2"
                color="gray.400"
              >
                Github <ExternalLinkIcon />
              </ChakraLink>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};
