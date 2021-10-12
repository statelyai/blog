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

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout posts={posts}>
      <Box padding={{ base: "3", md: "12" }} display="flex" flexDirection="column" align="center">
        <Heading as="h1" padding="4" paddingBottom={{ base: "8", md: "12" }} align="left">Stately Engineering Blog</Heading>
        <List spacing="8" maxW="4xl" align="left">
          {posts.map((post) => (
            <ListItem key={post.id}>
              <Heading size="2">
                <Link href={post.slug} passHref>
                  <ChakraLink
                    padding="4"
                    _hover={{ bg: "whiteAlpha.100" }}
                    display="block"
                  >
                    {post.title}{" "}
                    <HStack as="p" display="block" color="gray.500" size="smaller">
                      <span>{post.publishedAt}</span><span>by {post.author}</span>
                    </HStack>
                  </ChakraLink>
                </Link>
              </Heading>
            </ListItem>
          ))}
        </List>
      </Box>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllPosts();
  return { props: { posts } };
};

export default Home;
