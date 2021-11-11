export interface PostFrontmatter {
  title: string;
  description: string;
  keywords: string;
  category: string; // TODO: make this a union
  author: string;
  excerpt: string;
  publishedAt: string;
}

export interface Post extends PostFrontmatter {
  id: string;
  slug: string;
  content: string;
}
