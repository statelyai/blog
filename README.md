# Official Stately.ai engineering blog

A [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- [Install](#install)
- [Run locally](#run-locally)
- [Create a new blog post](#create-a-new-blog-post)
- [Shortcodes](#shortcodes)

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
4. Save your file to live refresh the local server and preview your post at [http://localhost:3000/](http://localhost:3000/). If your changes aren”t visible, you may need to stop and restart the local server to trigger a rebuild:<br/>
   `$ ^C`<br/>
   `$ yarn dev`
5. Commit and push your Git branch to the eng-blog repository:<br/>
   `$ git commit -am "Add new blog post"`<br/>
   `$ git push origin my-blog-post-branch-name`
6. [Create a pull request on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) for your Git branch to the eng-blog repository to request that the post is published to the live site.

### Edit existing post

Use `yarn post:edit` to update an existing blog post’s updatedAt frontmatter field. Follow the CLI prompts to choose an existing blog post from the list.

### Blog post frontmatter options

| property    | description                                                     |
| ----------- | --------------------------------------------------------------- |
| title       | post title                                                      |
| description | post description that shows on blog list view                   |
| tags        | tags relevant to the blog post                                  |
| author      | post author                                                     |
| publishedAt | date the post was first published                               |
| updatedAt   | date the post was last updated                                  |
| originalURL | original post URL if post has been copied from another platform |
| ogImage     | absolute URL for the post’s open graph image                    |

### Open Graph images

By default, a post will use the blog’s default open graph image (`/public/og-image.png`) for the social media `meta` elements.

Images must be in `.png` file format. Use the open graph templates in Canva, or ask @laurakalbag to create an image for you.

To override the default image with a new image:

1. Save your image in the `/public` folder with the same filename as its corresponding blog post. _Note: the corresponding filename is not necessary for the functioning of the open graph images, but improves the maintainability of the public folder._
2. Add the `ogImage` field to the frontmatter of the blog post using the absolute URL:

```
  ogImage: "https://stately.ai/blog/2019-11-13-no-disabling-a-button-is-not-app-logic.png"
```

#### Creating your own image using Figma

We have a Figma file containing the images used for the blog posts. You can use this as a template to create your custom image. To create an image, you need to:

1. Install our desktop font from the [assets repo](https://github.com/statelyai/assets/tree/main/fonts/desktop-fonts).
2. Install [Figma Desktop](https://www.figma.com/downloads/) on your machine (this needs to run on your device at least once for Figma to pick up the font you installed in step 1).
3. Open [our Figma file](https://www.figma.com/file/M1xwuMVxii1MRKL14yGFIP/Stately-Social-Media?node-id=13%3A317) and look under the "Open Graph" page.
4. Clone an existing image, adjust it to your liking and export it as a png file. See example:

### Test meta tags and Open Graph locally

1. Run the development server to spawn a local server on port 3000:<br/>
   `$ yarn dev`
2. In another terminal tab, run `yarn test:meta` to spawn an instance of localtunnel listening to the same port as the development server:<br/>
   `$ yarn test:meta`
3. The localtunnel process will show a URL in the terminal for a temporary deployment of the development server:
   `your url is: https://exampleurl.com`
4. Use this URL with the social media platforms (or any other platform using [Open Graph](https://ogp.me)) below to test how they’d preview the home page or any post page meta information:

- [Twitter card validator](https://cards-dev.twitter.com/validator)
- [LinkedIn post inspector](https://www.linkedin.com/post-inspector/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (requires Facebook login)

## Shortcodes

There are a few shortcodes you can use to embed content in markdown.

### Tweets

Use the tweet id for the `id` attribute. For example, in `https://twitter.com/statelyai/status/1461727317429043201`, `1461727317429043201` is the ID.

```
<Tweet id="1461727317429043201" />
```

### YouTube

Use the YouTube ID for the `id` attribute. For example in `https://www.youtube.com/watch?v=y6aGu0N8z9Q`, `y6aGu0N8z9Q` is the ID.

```
<Youtube id="y6aGu0N8z9Q" />
```

### Visualizer

Use the Visualizer ID for the `id` attribute. For example in `https://stately.ai/viz/5c325385-a0f4-4eaa-b215-712424369cc2`, `5c325385-a0f4-4eaa-b215-712424369cc2` is the ID.

A `title` is also required to describe your visualization for accessibility and testing purposes:

```
<Viz id="7c0ec648-09d6-46fe-a912-fc0e46da5094" title="Data fetching modeled as a statechart." />
```

Configure how the visualization embed displays by passing the options below.

`1` is show, `0` is hide:

| Option           | Default value | Available values                    |
| ---------------- | ------------- | ----------------------------------- |
| mode             | "viz"         | "viz", "full", "panels"             |
| panel            | "code"        | "code", "state", "events", "actors" |
| showOriginalLink | 1             | 1, 0                                |
| readOnly         | 1             | 1, 0                                |
| pan              | 0             | 1, 0                                |
| zoom             | 0             | 1, 0                                |
| controls         | 1             | 1, 0                                |

```
// Display in visualization mode
<Viz id="5c325385-a0f4-4eaa-b215-712424369cc2" title="Data fetching modeled as a statechart." />

// Display in panels mode showing the state panel without the link to the visualizer
<Viz id="7c0ec648-09d6-46fe-a912-fc0e46da5094" title="Data fetching modeled as a statechart." mode="panels" panels="state" showOriginalLink="0" />

// Display in visualization mode without any controls
<Viz id="5c325385-a0f4-4eaa-b215-712424369cc2" title="Data fetching modeled as a statechart." controls="0" />
```
