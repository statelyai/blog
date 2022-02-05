import prompts = require("prompts");
import { getAllPosts, POSTS_DIR } from "../src/posts";
import { Post } from "../src/types";
import fs from "fs";
import path from "path";
import { formatDate, makeFrontmatterFromPost, makeSetFromArray } from "./utils";
import omit = require("lodash.omit");
import { slugify } from "../src/utils";

function writePostToDisk(post: Post): void {
  fs.writeFileSync(
    path.join(POSTS_DIR, `${post.publishedAt}-${slugify(post.title)}.mdx`),
    makeFrontmatterFromPost(post),
    { encoding: "utf8" }
  );
}

const posts = getAllPosts();

const getAvailableTags = () =>
  posts
    .then((posts) => {
      return posts.map((p) => p.tags);
    })
    .then((tags) => {
      // tags is a 2d array
      return makeSetFromArray(tags.flat());
    });

const getAvailableAuthors = () =>
  posts
    .then((posts) => {
      return posts.map((p) => p.author);
    })
    .then((authors) => makeSetFromArray(authors));

const createQuestions: (
  tags: Post["tags"],
  authors: Post["author"][]
) => prompts.PromptObject[] = (tags, authors) => [
  {
    type: "text",
    name: "title",
    message: "Post title",
    validate: (value) => (!value ? "Title is required" : true),
  },
  {
    type: "text",
    name: "description",
    message: "Post description",
    validate: (value) => (!value ? "Description is required" : true),
  },
  {
    type: "multiselect",
    name: "tags",
    message:
      "Pick from existing tags: (You can add new tags in the next prompt)",
    choices: tags.map((ch) => ({ title: ch, value: ch })),
    hint: "- Space to select. Return to submit",
    format: (value) => (value.length > 0 ? value.map((w) => w.trim()) : []),
  },
  {
    type: "list",
    name: "newTags",
    message: "Add new tags, comma separated",
    hint: "- Enter new tags separated by comma",
    separator: ",",
    format: (value) => makeSetFromArray(value),
  },
  {
    type: "multiselect",
    name: "author",
    message: "Pick from existing authors: (Skip if you're a new author)",
    choices: authors.map((ch) => ({ title: ch, value: ch })),
    max: 1, // Change this to support multiple authors
    hint: "- Space to select. Return to submit",
    format: (value) => value[0], // We only support a single author
  },
  {
    type: (prev) => (prev.length === 0 ? "text" : null), // hide this questions if author is picked from the previous question
    name: "newAuthor",
    message: "Your full name, space separated: (Example: John Doe)",
    validate: (value) => (!value ? "Author is required" : true),
  },
  {
    type: "text",
    name: "originalURL",
    message: "Original URL",
    hint: "Original post URL if post has been copied from another platform",
  },
];

(async function main() {
  try {
    const tags = await getAvailableTags();
    const authors = await getAvailableAuthors();
    const answers = await prompts(createQuestions(tags, authors));

    const newPost = answers as Post;

    newPost.author = answers.newAuthor || answers.author;
    newPost.tags = answers.newTags.concat(answers.tags);
    newPost.excerpt = "";
    newPost.publishedAt = formatDate(
      new Intl.DateTimeFormat().formatToParts(new Date())
    );

    writePostToDisk(omit(newPost, ["newAuthor", "newTags"]) as Post);
  } catch (_) {
    console.error(_);
    process.exitCode = 1;
  }
})();
