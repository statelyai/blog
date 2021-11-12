import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Post } from "./types";
import { slugify } from "./utils";

export const POSTS_DIR = path.join(process.cwd(), "content/posts");

const getPostFrontMatter = async (fileName: string) => {
  return matter(await fs.readFile(path.join(POSTS_DIR, fileName)));
};

export const getAllPosts = async (): Promise<Array<Post>> => {
  let posts = [];
  const files = (await fs.readdir(POSTS_DIR)).filter((name) =>
    name.endsWith(".mdx")
  );
  for (let fileName of files) {
    const {
      data: { title, ...frontMatter },
      excerpt,
      content,
    } = await getPostFrontMatter(fileName);
    posts.push({
      ...frontMatter,
      title,
      slug: slugify(title),
      excerpt,
      content,
    } as Post);
  }

  // Most recent to the oldest
  return posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
};
