import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkPrism from "remark-prism";
import rehypeToc from "@jsdevtools/rehype-toc";
import visit from "unist-util-visit";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import type { Post, ElementNode, TextNode } from "./types";
import { isElementNode } from "./utils";

export async function serializePost(post: Post): Promise<{
  serializedContent: MDXRemoteSerializeResult;
  toc: ElementNode | null;
}> {
  try {
    let tocRef: ElementNode | null = null;
    const serializedContent = await serialize(post.content, {
      mdxOptions: {
        remarkPlugins: [[remarkPrism as any]],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeToc,
            {
              listElement: "ul",
              customizeTOC: (toc: ElementNode) => {
                visit(toc, "element", (node) => {
                  // Delete it as it only contains MDX related data. We render it as text in the TOC
                  delete node.data?.hookArgs;
                });
                tocRef = toc;
                return false;
              },
            },
          ],
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
    });

    return { serializedContent, toc: tocRef };
  } catch (err) {
    console.log("Post can not be serialized: " + post.title);
    return { serializedContent: { compiledSource: "" }, toc: null };
  }
}
