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
      <Box padding="24">
        <List spacing="8">
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
                    <HStack as="span" display="block" color="gray.500">
                      <small>{post.author}</small>
                      <small>{post.publishedAt}</small>
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
