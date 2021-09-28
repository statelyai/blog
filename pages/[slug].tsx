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
import { Box, Heading } from "@chakra-ui/react";

type MDX = ReturnType<typeof serialize>;

const PostPage: React.FC<{ posts: Post[]; post: Post; mdx: any }> = ({
  posts,
  post,
  mdx,
}) => {
  return (
    <Layout posts={posts}>
      <Box as="article" padding="12">
        <Heading size="xl" as="h1">
          {post.title}
        </Heading>
        <Box paddingTop="6">
          <MDXRemote {...mdx} />
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
