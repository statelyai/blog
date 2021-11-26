import {
  Box,
  List,
  ListItem,
  Heading,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { Layout } from "../src/components/Layout";
import { getAllPosts } from "../src/posts";
import { Post } from "../src/types";
import Link from "next/link";
import { Seo } from "../src/Seo";
import { useMetadata } from "../src/MetadataContext";
import fs from "fs";
import { generateFeed } from "../src/feed";

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  const {
    default: { title },
  } = useMetadata();
  return (
    <>
      <Seo />
      <Layout posts={posts}>
        <Box
          padding={{ base: "3", md: "12" }}
          display="flex"
          flexDirection="column"
          align="center"
        >
          <Heading
            as="h1"
            padding="4"
            paddingBottom={{ base: "8", md: "12" }}
            textAlign="left"
            fontWeight="normal"
          >
            {title}
          </Heading>
          <List spacing="4" maxW="3xl" align="left" textAlign="left" style={{ listStyleType: "none"}}>
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
                    <Heading size="2" fontSize="2xl">{post.title} </Heading>
                    <HStack
                      as="p"
                      display="block"
                      color="gray.400"
                    >
                      <span>{post.publishedAt}</span>
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
  const posts = await getAllPosts();

  const feed = await generateFeed(posts);

  fs.mkdirSync("public/feeds/", { recursive: true });
  fs.writeFileSync("public/feeds/rss.xml", feed.rss2());
  fs.writeFileSync("public/feeds/feed.json", feed.json1());
  fs.writeFileSync("public/feeds/atom.xml", feed.atom1());

  return { props: { posts } };
};

export default Home;
