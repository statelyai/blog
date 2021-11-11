# Official Stately.ai engineering blog

A [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Blog posts are stored under [content/posts](content/posts). To add a new post, simply create a new MDX file under that directory.

### Frontmatter

property | type | description
-|-|-
title | string | the title of the blog post
description | string | the description of the blog post
keywords | string[] | the comma separatd list of keywords relevant to the blog post
author | string | the author of the blog post
category | string | one of our post categories, e.g. entry, advanced, etc
