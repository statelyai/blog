import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Layout } from "../src/components/Layout";
import { getAllPosts } from "../src/posts";
import { Post } from "../src/types";

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Layout posts={posts}>
      <Box></Box>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllPosts();
  return { props: { posts } };
};

export default Home;
