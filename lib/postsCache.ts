import Cache from "file-system-cache";
import path from "path";
import * as lzstring from "lz-string";
import { getAllPosts } from "../src/posts";

export const cache = new Cache({
  basePath: path.join(process.cwd(), ".cache"),
});

export const postsCache = {
  arePostsChanged: async () => {
    const prevToken = await cache.get("postsToken", "");
    return (await postsCache.getPostsToken()) !== prevToken;
  },
  updatePostsCache: async () => {
    cache.set("postsToken", await postsCache.getPostsToken());
  },
  getPostsToken: async () => {
    const posts = await getAllPosts({ withContent: true });
    return lzstring.compress(JSON.stringify(posts));
  },
};
