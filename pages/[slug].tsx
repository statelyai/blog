import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Post } from "../src/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts } from "../src/posts";
import { Layout } from "../src/components/Layout";
import {
  Box,
  Heading,
  Wrap,
  Button,
  UnorderedList,
  ListItem,
  Link as ChakraLink,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  EditIcon
} from "@chakra-ui/icons";
import { useRouter } from "next/router";
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
  const router = useRouter();
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
      />
      <Layout posts={posts}>
        <Box
          as="article"
          className="blog-post"
          textAlign="left"
          padding="4"
          maxW="3xl"
        >
          <Button
            as="a"
            onClick={() => {
              router.back();
            }}
            marginBottom="8"
            cursor="pointer"
            textDecoration="none"
            leftIcon={<ArrowBackIcon />}
          >
            All blog posts
          </Button>
          <Heading size="xl" as="h1" fontWeight="medium">
            {post.title}
          </Heading>
          <Wrap
            marginTop="5"
            direction={{ base: "column", md: "row" }}
            alignItems={{ base: "left", md: "flex-end" }}
          >
            <Box as="p" color="gray.400">
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
                display={{ base: "block", md: "inline" }}
              >
                <EditIcon w={4} h={4} role="presentation" marginTop="-0.2em"/> Edit this page on GitHub
              </ChakraLink>
            </Box>
            <UnorderedList
              width="auto"
              fontSize="smaller"
              display="flex"
              wrap="row"
              flexDirection="row"
              flexWrap="wrap"
              margin="0"
              gridGap="1"
              paddingTop="1"
              color="gray.400"
              style={{ listStyleType: "none" }}
            >
              {post.tags.map((keyword) => (
                <ListItem
                  key={keyword}
                  marginRight="1"
                >{`#${keyword}`}</ListItem>
              ))}
            </UnorderedList>
          </Wrap>
          <Box
            paddingTop="2"
            marginTop="3"
            className="blog-post-content"
            borderTopWidth="1px"
            borderStyle="solid"
            borderColor="gray.700"
          >
            <MDXRemote {...mdx} components={MDXComponents} lazy />
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
