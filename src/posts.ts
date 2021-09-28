import fs from "fs/promises";
import path from "path";

export const getAllPostNames = async (): Promise<{ posts: string[] }> => {
  const postsDir = path.join(process.cwd(), "content/posts");
  let blogPosts = (await fs.readdir(postsDir)).filter((fileName) =>
    fileName.endsWith(".mdx")
  );
  return { posts: blogPosts };
};
