import React from "react";
import ReactDOMServer from "react-dom/server";
import { Feed } from "feed";
import { MDXRemote } from "next-mdx-remote";
import { ChakraProvider } from "@chakra-ui/react";
import { makeMetadata } from "../content/metadata";
import { Post } from "./types";
import theme from "./theme";
import { MDXComponents } from "./components/MDXComponents";
import { stripHtml } from "string-strip-html";
import { serializePost } from "./serializePost";

/*
    TODO: think of:
    - Versioning the feeds
    - Best time to update the feed
*/
export const generateFeed = async (posts: Post[]): Promise<Feed> => {
  const {
    title,
    openGraph: { url },
    description,
    authors,
  } = makeMetadata();
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
        <MDXRemote {...mdx.serializedContent} components={MDXComponents} />
      </ChakraProvider>
    );
    const cleanHtmlContent = stripHtml(htmlContent, {
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
