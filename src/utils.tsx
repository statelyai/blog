import React from "react";
import ReactDOMServer from "react-dom/server";
import { Post } from "./types";
import { Feed } from "feed";
import { blogInfo, authors } from "../content/metadata";
import fs from "fs";
import MDX from "@mdx-js/runtime";
import { MDXProvider } from "@mdx-js/react";

export function createRequiredContext<T>(displayName: string) {
  const context = React.createContext<T | null>(null);
  context.displayName = displayName;

  const useContext = () => {
    const ctx = React.useContext(context);
    if (!ctx) {
      throw new Error(
        `use${displayName} must be used inside ${displayName}Provider`
      );
    }
    return ctx;
  };

  return [context.Provider, useContext] as const;
}

export const groupPostsByCategory = (posts: Post[]): Record<string, Post[]> => {
  return posts.reduce<Record<string, Post[]>>((group, post) => {
    return {
      ...group,
      [post.category]: group[post.category]
        ? group[post.category].concat(post)
        : [post],
    };
  }, {});
};

/**
 *
 * Returns a hash code for a string.
 * (Compatible to Java's String.hashCode())
 *
 * The hash code for a string object is computed as
 *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 * using number arithmetic, where s[i] is the i th character
 * of the given string, n is the length of the string,
 * and ^ indicates exponentiation.
 * (The hash value of the empty string is zero.)
 *
 */
export const stringHashCode = (str: string): number => {
  for (var i = 0, h = 0; i < str.length; i++)
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return h;
};

export const toUrl = (str: string): string => encodeURIComponent(str);

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const generateRSSFeed = async (posts: Post[]) => {
  const feed = new Feed({
    title: blogInfo.title,
    description: blogInfo.description,
    id: blogInfo.url,
    link: blogInfo.url,
    language: "en",
    feedLinks: {
      rss2: `${blogInfo.url}/rss.xml`,
    },
    copyright: "All rights reserved to Stately.ai",
  });

  authors.forEach((author) => {
    feed.addContributor({ name: author.name, link: author.twitterHandle });
  });

  for (const post of posts) {
    const postUrl = `${blogInfo.url}/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.description,
      content: ReactDOMServer.renderToStaticMarkup(
        <MDXProvider
          components={{
            Tweet: ({ id, ...props }: { id: string }) => (
              <a
                {...props}
                href={`twitter.com/anyuser/status/${id}`}
                rel="noopener noreferrer"
              ></a>
            ),
          }}
        >
          <MDX>{post.content}</MDX>
        </MDXProvider>
      ),
      author: [{ name: post.author }],
      published: new Date(post.publishedAt),
      date: new Date(),
    });
  }

  // Write the RSS output to a public file, making it
  // accessible at /rss.xml
  fs.writeFileSync("public/rss.xml", feed.rss2());
};
