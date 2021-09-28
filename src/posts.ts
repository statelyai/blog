import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Post } from "./types";
import { v4 } from "uuid";
import { stringHashCode } from "./utils";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

const getPostFrontMatter = async (fileName: string) => {
  return matter(await fs.readFile(path.join(POSTS_DIR, fileName)));
};

const makeSlugFromTitle = (title: string): string =>
  title.toLowerCase().replace(/\s/g, "-");

export const getAllPosts = async (): Promise<Array<Post>> => {
  let posts = [];
  const files = (await fs.readdir(POSTS_DIR)).filter((name) =>
    name.endsWith(".mdx")
  );
  for (let fileName of files) {
    const {
      data: { title, keywords, ...frontMatter },
      excerpt,
      content,
    } = await getPostFrontMatter(fileName);
    const id = stringHashCode(title).toString();
    posts.push({
      ...frontMatter,
      id,
      title,
      slug: makeSlugFromTitle(title),
      keywords: keywords.split(" "),
      excerpt,
      content,
    });
  }
  return posts as Post[];
};
