import { Metadata, MetadataOverrides } from "../src/types";

export const DEFAULT_TITLE = "Stately Engineering Blog";
export const DEFAULT_DESCRIPTION =
  "The official engineering blog of Stately.ai";
export const DEFAULT_URL = "https://stately.ai/blog";

export const makeMetadata: (overrides: MetadataOverrides) => Metadata = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  url = DEFAULT_URL,
  article,
}) => ({
  title,
  description,
  canonical: url,
  openGraph: {
    url,
    title,
    description,
    type: article ? "article" : "website",
    locale: "en_US",
    site_name: DEFAULT_TITLE,
    images: [
      {
        url,
        width: 0,
        height: 0,
        alt: title,
        type: "image/jpeg", // change based on actual OG image type
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
})
