import { Post } from "./types";
import { createRequiredContext } from "./utils";

export const [PostsProvider, usePosts] = createRequiredContext<Post[]>("Posts");
