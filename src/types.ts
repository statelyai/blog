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

// Based on available options at https://github.com/garmeeh/next-seo#nextseo-options
export interface Metadata {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    url: string;
    title: string;
    description: string;
    type: string;
    locale: string;
    site_name: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
      type: string; // change based on actual OG image type
    }>;
    article?: Partial<{
      publishedTime: string; // datetime
      modifiedTime: string; // datetime
      authors: string[];
      tags: string[];
    }>;
  };
  twitter: {
    handle: string;
    site: string;
    cardType: string;
  };
}

export type MetadataOverrides = Partial<{
  title: string;
  description: string;
  url: string;
  article: Metadata["openGraph"]["article"];
}>;
