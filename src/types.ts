import { NextSeoProps, OpenGraphArticle } from "next-seo";

export interface PostFrontmatter {
  title: string;
  description: string;
  keywords: string[];
  category?: string; // TODO: make this a union
  author: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
}

export type Metadata = Pick<
  NextSeoProps,
  "title" | "description" | "canonical" | "openGraph" | "twitter"
>;

export type MetadataOverrides = Partial<{
  title: string;
  description: string;
  url: string;
  article: OpenGraphArticle;
}>;
