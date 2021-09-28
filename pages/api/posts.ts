// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

type Data = {
  posts: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const postsDir = path.join(process.cwd(), "content/posts");
  let blogPosts = await fs.readdir(postsDir);
  // blogPosts = blogPosts.filter(fileName => fs.stat(path.join(postsDir, fileName)));
  res.status(200).json({ posts: blogPosts });
}
