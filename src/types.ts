export interface PostFrontmatter {
  title: string;
  description: string;
  keywords: string[];
  category: string; // TODO: make this a union
  author: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
}
