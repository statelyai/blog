This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## The offical Stately.ai engineering blog

### Run locally

Install dependencies: `yarn`

Run the development server: `yarn start` that will spawn a local server on port 3000. Visit http://localhost:3000/

### Add a new blog post

Blog posts are stored under [content/posts](content/posts). To add a new post, simply create a new MDX file under that directory.

#### Frontmatter

property | type | description
-|-|-
title | string | the title of the blog post
description | string | the description of the blog post
keywords | string[] | the comma separatd list of keywords relevant to the blog post
author | string | the author of the blog post
category | string | one of our post categories, e.g. entry, advanced, etc
