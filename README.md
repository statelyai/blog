# Official Stately.ai engineering blog

A [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- [Install](#install)
- [Run locally](#run-locally)
- [Add a new blog post](#add-a-new-blog-post)

## Install

1. Clone the engineering blog repository to your machine:<br/>
`$ git clone git@github.com:statelyai/eng-blog.git`
2. Navigate into the engineering blog folder:<br/>
`$ cd eng-blog`
3. Install [yarn package manager](https://yarnpkg.com) globally if you don’t already have yarn installed on your machine:<br/>
`$ npm install -g yarn`
4. Install [@types/react](https://www.npmjs.com/package/@types/react) if you don’t already have TypeScript for React installed on your machine:<br/>
`$ yarn add --dev @types/react`
5. You’re ready to run the engineering blog

## Run locally

1. Run the development server to spawn a local server on port 3000:<br/>
`$ yarn dev`
2. Visit [http://localhost:3000/](http://localhost:3000/) to find your server running.

## Add a new blog post

Blog posts are stored inside [content/posts](content/posts).

1. Create and checkout a new Git branch for your blog post:<br/>
`$ git checkout -b my-blog-post-branch-name`
2. Create an .mdx file inside the [content/posts](content/posts) folder, with the filename format:<br/>
`YYYY-MM-DD-short-title.mdx`.
3. Write your blog post in the file using [markdown format](https://www.markdownguide.org/basic-syntax).
4. Add frontmatter meta information to the top of your blog post in the [yaml format](https://yaml.org). For example:
```
---
title: "How do you convince your teammates to use XState"
description: "Last week our question of the week was how do you convince your teammates to use XState? Here are some suggestions."
keywords: [blog, teams]
author: "Laura Kalbag"
---
```
5. Save your file to live refresh the local server and preview your post at [http://localhost:3000/](http://localhost:3000/).
6. Commit and push your Git branch to the eng-blog repository:
`$ git commit -am "Add new blog post"`
`$ git push origin my-blog-post-branch-name`
7. [Create a pull request on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) for your Git branch to the eng-blog repository to request that the post is published to the live site.

### Blog post frontmatter options

property | type | description
-|-|-
title | string | post title
description | string | post description that shows on blog list view
keywords | string[] | comma-separated list of keywords or tags relevant to the blog post
author | string | post author
