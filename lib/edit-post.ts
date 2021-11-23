import prompts = require("prompts");
import { getAllPosts, POSTS_DIR } from "../src/posts";
import { Post } from "../src/types";
import fs from "fs";
import path from "path";
import { formatDate, makeFrontmatterFromPost } from "./utils";
import pick = require("lodash.pick");

function updatePostOnDisk(post: Post): void {
  fs.writeFileSync(
    path.join(POSTS_DIR, `${post.publishedAt}-${post.slug}.mdx`),
    makeFrontmatterFromPost(post),
    { encoding: "utf8" }
  );
}

const createQuestions: (posts: Post[]) => prompts.PromptObject[] = (posts) => [
  {
    type: "multiselect",
    max: 1,
    name: "title",
    message: "Pick the title you edited",
    choices: posts
      .map((p) => pick(p, ["title", "author"]))
      .map(({ title, author }) => ({
        title: `${title} <${author}>`,
        value: title,
      })),
    hint: "- Space to select. Return to submit",
  },
];

(async function main() {
  try {
    const posts = await getAllPosts();
    const answers = await prompts(createQuestions(posts));
    const pickedTitle = answers.title[0]; // Since the prompt is of type multiselect but limited to max 1 picked value, it's always a single item array

    const postToEdit = posts.find((p) => p.title === pickedTitle);

    postToEdit.updatedAt = formatDate(
      new Intl.DateTimeFormat().formatToParts(new Date())
    );

    updatePostOnDisk(postToEdit);
  } catch (_) {
    console.log(_);
    process.exitCode = 1;
  }
})();
