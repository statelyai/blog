# Official Stately.ai engineering blog

A [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- [Install](#install)
- [Run locally](#run-locally)
- [Create a new blog post](#create-a-new-blog-post)

## Install

1. Clone the engineering blog repository to your machine:<br/>
`$ git clone git@github.com:statelyai/eng-blog.git`
2. Navigate into the engineering blog folder:<br/>
`$ cd eng-blog`
3. Install [yarn package manager](https://yarnpkg.com) globally if you don’t already have yarn installed on your machine:<br/>
`$ npm install -g yarn`
4. Install the dependencies for this project:<br/>
`$ yarn`
5. You’re ready to run the engineering blog

## Run locally

1. Run the development server to spawn a local server on port 3000:<br/>
`$ yarn dev`
2. Visit [http://localhost:3000/](http://localhost:3000/) to find your server running.

## Create a new blog post

Blog posts are stored inside [content/posts](content/posts).

1. Create and checkout a new Git branch for your blog post:<br/>
`$ git checkout -b my-blog-post-branch-name`
2. Use `yarn post:create` to create a blog post following the CLI (command-line interface) prompts:<br/>
`$ yarn post:create`
3. Find your new blog post inside [content/posts](content/posts) and write your blog post content using [markdown format](https://www.markdownguide.org/basic-syntax).
5. Save your file to live refresh the local server and preview your post at [http://localhost:3000/](http://localhost:3000/). If your changes aren”t visible, you may need to stop and restart the local server to trigger a rebuild:<br/>
`$ ^C`<br/>
`$ yarn dev`
6. Commit and push your Git branch to the eng-blog repository:<br/>
`$ git commit -am "Add new blog post"`<br/>
`$ git push origin my-blog-post-branch-name`
7. [Create a pull request on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) for your Git branch to the eng-blog repository to request that the post is published to the live site.

### Edit existing post

Use `yarn post:edit` to update an existing blog post’s updatedAt frontmatter field. Follow the CLI prompts to choose an existing blog post from the list.

### Blog post frontmatter options

property | description
-|-
title | post title
description | post description that shows on blog list view
keywords | keywords or tags relevant to the blog post
author | post author
publishedAt | date the post was first published
updatedAt | date the post was last updated