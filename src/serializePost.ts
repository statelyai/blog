import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkPrism from "remark-prism";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { Post } from "./types";

export function serializePost(post: Post): Promise<MDXRemoteSerializeResult> {
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
      resolve({ compiledSource: "" });
    }
  });
}
