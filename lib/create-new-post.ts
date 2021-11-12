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

const getAvailableKeywords = () =>
  posts
    .then((posts) => {
      return posts.map((p) => p.keywords);
    })
    .then((keywords) => {
      // keywords is a 2d array
      return makeSetFromArray(keywords.flat());
    });

const getAvailableAuthors = () =>
  posts
    .then((posts) => {
      return posts.map((p) => p.author);
    })
    .then((authors) => makeSetFromArray(authors));

const createQuestions: (
  keywords: Post["keywords"],
  authors: Post["author"][]
) => prompts.PromptObject[] = (keywords, authors) => [
  {
    type: "text",
    name: "title",
    message: "Title of the post",
    validate: (value) => (!value ? "Title is required" : true),
  },
  {
    type: "text",
    name: "description",
    message: "Description of the post",
    validate: (value) => (!value ? "Description is required" : true),
  },
  {
    type: "multiselect",
    name: "keywords",
    message:
      "Pick from available keywords(Add new keywords in the next question)",
    choices: keywords.map((ch) => ({ title: ch, value: ch })),
    hint: "- Space to select. Return to submit",
    format: (value) => (value.length > 0 ? value.map((w) => w.trim()) : []),
  },
  {
    type: "text",
    name: "newKeywords",
    message: "Add new keywords, comma sepatared",
    format: (value) =>
      value.length > 0
        ? makeSetFromArray(value.split(",").map((w) => w.trim()))
        : "",
  },
  {
    type: "multiselect",
    name: "author",
    message: "Pick from available authors (skip this if you're a new author)",
    choices: authors.map((ch) => ({ title: ch, value: ch })),
    max: 1, // Change this to support multiple authors
    hint: "- Space to select. Return to submit",
  },
  {
    type: (prev) => (prev.length === 0 ? "text" : null), // hide this questions if author is picked from the previous question
    name: "newAuthor",
    message: "Write your full name, space separated: e.g John Doe",
    validate: (value) => (!value ? "Author is required" : true),
  },
];

(async function main() {
  try {
    const keywords = await getAvailableKeywords();
    const authors = await getAvailableAuthors();
    const answers = await prompts(createQuestions(keywords, authors));

    const newPost = answers as Post;

    newPost.author = answers.newAuthor || answers.author;
    newPost.keywords = answers.newKeywords.concat(answers.keywords);
    newPost.excerpt = "";
    newPost.publishedAt = formatDate(
      new Intl.DateTimeFormat().formatToParts(new Date())
    );

    writePostToDisk(omit(newPost, ["newAuthor", "newKeywords"]) as Post);
  } catch (_) {
    console.error(_);
    process.exitCode = 1;
  }
})();
