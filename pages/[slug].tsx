import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ElementNode, Post, TextNode } from "../src/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts } from "../src/posts";
import { Layout } from "../src/components/Layout";
import {
  Box,
  Button,
  Heading,
  UnorderedList,
  ListItem,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowUpIcon, EditIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { MDXComponents } from "../src/components/MDXComponents";
import { Seo } from "../src/Seo";
import { DEFAULT_URL } from "../content/metadata";
import { formatDate, isElementNode } from "../src/utils";
import { serializePost } from "../src/serializePost";
import React, { ElementType, useEffect } from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";

const TOC: React.FC<{ toc: ElementNode | TextNode }> = ({ toc }) => {
  if (!isElementNode(toc)) {
    return <>{toc.value}</>;
  }

  const Tag =
    toc.tagName === "a"
      ? (props) => (
          <ChakraLink
            {...props}
            display="block"
            padding="2"
            color="gray.300"
            fontSize="md"
            _hover={{ color: "white", textDecoration: "underline" }}
          />
        )
      : (toc.tagName as ElementType);
  return (
    <Tag {...toc.properties}>
      {toc.children.map((child, index) => (
        <TOC key={index} toc={child} />
      ))}
    </Tag>
  );
};

const scrollMachine = createMachine({
  id: "scroll machine",
  initial: "racing",
  exit: ["disableSmoothScroll"],
  states: {
    racing: {
      after: {
        threshold: {
          target: "scrolled",
        },
      },
      invoke: {
        src: "listenToWindowScroll",
      },
      on: {
        scrolled: "scrolled",
      },
    },
    scrolled: {
      entry: ["enableSmoothScroll"],
      on: {
        disableScroll: {
          actions: ["disableSmoothScroll"],
        },
      },
    },
  },
});

const PostPage: React.FC<{
  posts: Post[];
  post: Post;
  mdx: { serializedContent: MDXRemoteSerializeResult; toc: ElementNode | null };
}> = ({ posts, post, mdx }) => {
  // Enable smooth scrolling either after the initial scroll due to existing hash in the URL or 1 second after the page is loaded (safe threshold)
  useMachine(scrollMachine, {
    services: {
      listenToWindowScroll: () => (sendBack) => {
        const onScroll = () => {
          sendBack({ type: "scrolled" });
        };
        window?.addEventListener("scroll", onScroll);
        return () => {
          window?.removeEventListener("scroll", onScroll);
        };
      },
    },
    actions: {
      enableSmoothScroll: () => {
        document.documentElement.style.scrollBehavior = "smooth";
      },
      disableSmoothScroll: () => {
        console.log("disableSmoothScroll");
        document.documentElement.style.scrollBehavior = "auto";
      },
    },
    delays: {
      threshold: 100,
    },
  });

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
      <Layout
        posts={posts}
        renderSidebar={() => (
          <Flex
            flexDirection="column"
            alignItems="flex-start"
            position="sticky"
            bottom="4"
            gap="6"
          >
            <Button
              justifyContent="center"
              aria-label="scroll to top"
              leftIcon={<ArrowUpIcon />}
              as="a"
              textDecoration="none"
              href="#"
            >
              Scroll to top
            </Button>
            <TOC toc={mdx.toc} />
          </Flex>
        )}
      >
        <Box
          as="article"
          className="blog-post"
          textAlign="left"
          padding="4"
          maxW="3xl"
        >
          <Link href="/" passHref>
            <Button as="a" textDecoration="none" marginBottom="8">
              {<ArrowBackIcon marginRight="2" />} All blog posts
            </Button>
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
            <MDXRemote {...mdx.serializedContent} components={MDXComponents} />
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
  const posts = await getAllPosts({ withContent: true });
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
