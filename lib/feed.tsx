import ReactDOMServer from "react-dom/server";
import fs from "fs";
import { Feed } from "feed";
import { MDXRemote } from "next-mdx-remote";
import { ChakraProvider } from "@chakra-ui/react";
import { makeMetadata } from "../content/metadata";
import { Post } from "../src/types";
import theme from "../src/theme";
import { MDXComponents } from "../src/components/MDXComponents";
import * as strip from "string-strip-html";
import { serializePost } from "../src/serializePost";
import { getAllPosts } from "../src/posts";

/*
    TODO: think of:
    - Versioning the feeds
    - Best time to update the feed
*/
export const generateFeed = async (posts: Post[]): Promise<Feed> => {
  const { title, canonical: url, description, authors } = makeMetadata();
  //   Base feed
  const feed = new Feed({
    title,
    description,
    id: url,
    link: url,
    language: "en",
    feedLinks: {
      rss2: `${url}/rss.xml`,
    },
    copyright: "All rights reserved to Stately.ai",
  });

  authors.forEach((author) => {
    feed.addContributor({ name: author.name, link: author.twitterHandle });
  });

  for (let post of posts) {
    const postUrl = `${url}/${post.slug}`;
    const mdx = await serializePost(post);
    const htmlContent = ReactDOMServer.renderToStaticMarkup(
      <ChakraProvider resetCSS theme={theme}>
        <MDXRemote {...mdx} components={MDXComponents} />
      </ChakraProvider>
    );
    const cleanHtmlContent = strip.stripHtml(htmlContent, {
      onlyStripTags: ["script", "style"],
      stripTogetherWithTheirContents: ["script", "style"],
    }).result;

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.description,
      content: cleanHtmlContent,
      author: [{ name: post.author }],
      published: new Date(post.publishedAt),
      date: new Date(),
    });
  }

  return feed;
};

(async function main() {
  const posts = await getAllPosts();
  const feed = await generateFeed(posts);

  fs.mkdirSync("public/feeds/", { recursive: true });
  fs.writeFileSync("public/feeds/rss.xml", feed.rss2());
  fs.writeFileSync("public/feeds/feed.json", feed.json1());
  fs.writeFileSync("public/feeds/atom.xml", feed.atom1());
})();
