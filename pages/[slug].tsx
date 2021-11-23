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
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MDXComponents } from "../src/components/MDXComponents";
import { Seo } from "../src/Seo";
import { DEFAULT_URL } from "../content/metadata";
import { ArrowLeftIcon } from "@chakra-ui/icons";
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
        article={{
          authors: [post.author],
          publishedTime: post.publishedAt,
          modifiedTime: post.updatedAt,
          tags: post.keywords,
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
            leftIcon={<ArrowLeftIcon />}
          >
            All blog posts
          </Button>
          <Heading size="xl" as="h1" fontWeight="medium">
            {post.title}
          </Heading>
          <Wrap
            marginTop="5"
            direction={{ base: "column", md: "row" }}
            alignItems={{ base: "left", md: "center" }}
          >
            <Box as="p">
              By&nbsp;
              <Link href={`/authors/${post.author}`} passHref>
                <ChakraLink color="gray.200">{post.author}</ChakraLink>
              </Link>
              &nbsp;on&nbsp;
              <span>{post.publishedAt}</span>
            </Box>
            <UnorderedList
              width="auto"
              fontSize="smaller"
              listStyleType="none"
              display="flex"
              wrap="row"
              flexDirection={{ base: "column", md: "row" }}
              gridGap="1"
            >
              {post.keywords.map((keyword) => (
                <ListItem key={keyword}>
                  <Link href={`/keyword/${keyword}`} passHref key={keyword}>
                    <ChakraLink color="gray.200">{`#${keyword}`}</ChakraLink>
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>
          </Wrap>
          <Divider marginBlock="4" />
          <Box paddingTop="2" className="blog-post-content">
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
