import { MetadataOverrides } from "../src/types";

export const DEFAULT_TITLE = "Stately Engineering Blog";
export const DEFAULT_DESCRIPTION =
  "The official engineering blog of Stately.ai";
export const DEFAULT_URL = "https://stately.ai/blog";
export const DEFAULT_OG_IMAGE = {
  url: "https://stately.ai/blog/og-image.png", // needs to be absolute URL
  width: 0,
  height: 0,
  alt: DEFAULT_TITLE,
  type: "image/png", // change based on actual OG image type
};

export const AUTHORS = [
  { name: "Farzad Yousefzadeh", twitterHandle: "@farzad_yz" },
  { name: "Laura Kalbag", twitterHandle: "@lauraKalbag" },
  { name: "Matt Pocock", twitterHandle: "@mpocock1" },
  { name: "David K. 🎹", twitterHandle: "@DavidKPiano" },
  { name: "Andarist", twitterHandle: "@AndaristRake" },
  { name: "Jenny Truong", twitterHandle: "@jen_ayy_" },
] as const;

export const makeMetadata = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  url = DEFAULT_URL,
  originalURL,
  article,
  ogImage = DEFAULT_OG_IMAGE.url,
}: MetadataOverrides | undefined = {}) => ({
  title,
  description,
  authors: AUTHORS,
  canonical: originalURL,
  openGraph: {
    url,
    title,
    description,
    type: article ? "article" : "website",
    locale: "en_US",
    site_name: DEFAULT_TITLE,
    images: [
      {
        url: ogImage, // needs to be absolute URL
        width: 0,
        height: 0,
        alt: title,
        type: "image/png",
      },
    ],
    article,
  },
  twitter: {
    handle: "@statelyai",
    site: "@statelyai",
    cardType: "summary_large_image",
    creator: article?.authors?.[0],
  },
});
