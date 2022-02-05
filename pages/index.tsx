import {
  Box,
  List,
  ListItem,
  Heading,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import fs from "fs";
import { Layout } from "../src/components/Layout";
import { getAllPosts } from "../src/posts";
import { Post } from "../src/types";
import Link from "next/link";
import { Seo } from "../src/Seo";
import { formatDate } from "../src/utils";
import { generateFeed } from "../src/feed";

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <Seo />
      <Layout posts={posts}>
        <Box maxW="3xl" display="flex" flexDirection="column" align="center">
          <Heading
            as="h1"
            padding="4"
            marginTop={{ base: "3", md: "24" }}
            marginBottom={{ base: "6", md: "8" }}
            textAlign="left"
            fontWeight="normal"
            fontSize={{ base: "4xl", md: "5xl" }}
          >
            Engineering Blog
          </Heading>
          <List
            spacing="4"
            maxW="3xl"
            align="left"
            textAlign="left"
            listStyleType="none"
            width={{ xl: "3xl" }}
          >
            {posts.map((post) => (
              <ListItem key={post.slug} marginTop="0">
                {/* Formatting href makes server and client rendered hrefs consistent */}
                <Link href={`/${post.slug}`} passHref>
                  <ChakraLink
                    padding="4"
                    _hover={{ bg: "gray.800", borderRadius: "0.5em" }}
                    display="block"
                    color="gray.500"
                  >
                    <Heading size="2" fontSize="2xl">
                      {post.title}{" "}
                    </Heading>
                    <HStack as="p" display="block" color="gray.400">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>by {post.author}</span>
                    </HStack>
                  </ChakraLink>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  // TODO: Generate the feed only when there is a change in the posts
  const posts = await getAllPosts({ withContent: true });

  if (process.env.NODE_ENV === "production") {
    const feed = await generateFeed(posts);

    fs.mkdirSync("public/feeds/", { recursive: true });
    fs.writeFileSync("public/feeds/rss.xml", feed.rss2());
    fs.writeFileSync("public/feeds/feed.json", feed.json1());
    fs.writeFileSync("public/feeds/atom.xml", feed.atom1());
  }

  return { props: { posts } };
};

export default Home;
