import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Post } from "../src/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts } from "../src/posts";
import { Layout } from "../src/components/Layout";
import {
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { MDXComponents } from "../src/components/MDXComponents";
import { Seo } from "../src/Seo";
import { DEFAULT_URL } from "../content/metadata";
import { formatDate } from "../src/utils";
import { serializePost } from "../src/serializePost";

const PostPage: React.FC<{
  posts: Post[];
  post: Post;
  mdx: MDXRemoteSerializeResult;
}> = ({ posts, post, mdx }) => {
  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        url={`${[DEFAULT_URL, post.slug].join("/")}`}
        originalURL={post.originalURL}
        article={{
          authors: [post.author],
          publishedTime: post.publishedAt,
          modifiedTime: post.updatedAt,
          tags: post.tags,
        }}
        ogImage={post.ogImage}
      />
      <Layout posts={posts}>
        <Box
          as="article"
          className="blog-post"
          textAlign="left"
          padding="4"
          maxW="3xl"
        >
          <Link href="/" passHref>
            <ChakraLink>All blog posts</ChakraLink>
          </Link>
          <Heading
            size="xl"
            as="h1"
            fontWeight="medium"
            marginTop={{ base: "2", md: "7" }}
          >
            {post.title}
          </Heading>
          <Box as="p" marginTop="5" color="gray.400">
            By&nbsp;
            <span>{post.author}</span>
            &nbsp;on&nbsp;
            <span>{formatDate(post.publishedAt)}</span>.&nbsp;
            <ChakraLink
              isExternal
              href={`https://github.com/statelyai/eng-blog/edit/main/content/posts/${post.fileName}`}
              fontSize="md"
              color="gray.200"
              _hover={{ color: "white", textDecoration: "underline" }}
              marginTop={{ base: "1", md: "0" }}
              marginLeft={{ base: "0", md: "2" }}
              marginRight="2"
              display={{ base: "block", md: "inline" }}
            >
              <EditIcon
                w={4}
                h={4}
                role="presentation"
                marginTop="-0.2em"
                marginRight="1"
              />
              Edit this page on GitHub
            </ChakraLink>
          </Box>
          <UnorderedList
            width="auto"
            fontSize="smaller"
            display="flex"
            wrap="row"
            flexDirection="row"
            flexWrap="wrap"
            marginLeft="0"
            marginTop={{ base: "1", md: "0" }}
            gridGap="1"
            color="gray.400"
            style={{ listStyleType: "none" }}
          >
            {post.tags.map((keyword) => (
              <ListItem key={keyword} marginRight="1">{`#${keyword}`}</ListItem>
            ))}
          </UnorderedList>
          <Box
            paddingTop="2"
            marginTop="3"
            className="blog-post-content"
            borderTopWidth="1px"
            borderStyle="solid"
            borderColor="gray.700"
          >
            <MDXRemote {...mdx} components={MDXComponents} />
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (await getAllPosts()).map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = await getAllPosts();
  const post = posts.find((post) => post.slug === ctx.params.slug);

  return {
    props: {
      posts,
      post,
      mdx: await serializePost(post),
    },
  };
};

export default PostPage;
