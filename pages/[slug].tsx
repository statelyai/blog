import { serialize } from "next-mdx-remote/serialize";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkPrism from "remark-prism";
import { MDXRemote } from "next-mdx-remote";
import { Post } from "../src/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts } from "../src/posts";
import { Layout } from "../src/components/Layout";
import {
  Box,
  Heading,
  Text,
  HStack,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Tweet, YouTube } from "mdx-embed";

type MDX = ReturnType<typeof serialize>;

const components = {
  p: (props) => <Text {...props} as="p" />,
  h1: (props) => <Heading {...props} as="h1" />,
  h2: (props) => <Heading {...props} as="h2" />,
  h3: (props) => <Heading {...props} as="h3" />,
  h4: (props) => <Heading {...props} as="h4" />,
  h5: (props) => <Heading {...props} as="h5" />,
  h6: (props) => <Heading {...props} as="h6" />,
  ul: (props) => <ul {...props} style={{ paddingLeft: "1rem" }} />,
  Tweet: ({ id, ...props }) => (
    <Tweet
      {...props}
      hideConversation
      tweetLink={`anyuser/status/${id}`}
      theme="dark"
      align="center"
    />
  ),
  Youtube: ({ id, ...props }) => (
    <Box marginY="5">
      <YouTube {...props} youTubeId={id} />
    </Box>
  ),
};

const PostPage: React.FC<{ posts: Post[]; post: Post; mdx: any }> = ({
  posts,
  post,
  mdx,
}) => {
  const router = useRouter();
  return (
    <Layout posts={posts}>
      <Box as="article" padding="12" maxW="4xl" className="blog-post">
        <Button
          as="a"
          onClick={() => {
            router.back();
          }}
          marginBottom="8"
          cursor="pointer"
          textDecoration="none"
        >
          &lt; Back
        </Button>
        <Heading size="xl" as="h1" fontWeight="medium">
          {post.title}
        </Heading>
        <HStack marginTop="5">
          <Link href={`/authors/${post.author}`} passHref>
            <ChakraLink color="gray.200">{post.author}</ChakraLink>
          </Link>
          <span>{post.publishedAt}</span>
          <HStack as="small" width="auto">
            {post.keywords.map((keyword) => (
              <Link href={`/keyword/${keyword}`} passHref key={keyword}>
                <ChakraLink color="gray.200">{`#${keyword}`}</ChakraLink>
              </Link>
            ))}
          </HStack>
        </HStack>
        <Box paddingTop="2">
          <MDXRemote {...mdx} components={components} />
        </Box>
      </Box>
    </Layout>
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

  function serializePost(post: Post): Promise<MDX | null> {
    return new Promise((resolve) => {
      try {
        resolve(
          serialize(post.content, {
            mdxOptions: {
              remarkPlugins: [[remarkPrism as any]],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  {
                    behavior: "wrap",
                    properties: {
                      className: "anchor",
                    },
                  },
                ],
                [
                  rehypeExternalLinks,
                  {
                    targte: "_blank",
                    rel: ["nofollow", "noreferrer", "noopener"],
                  },
                ],
              ],
            },
          })
        );
      } catch (err) {
        console.log("Post can not be serialized: " + post.title);
        resolve(null);
      }
    });
  }
  return {
    props: {
      posts,
      post,
      mdx: await serializePost(post),
    },
  };
};

export default PostPage;
