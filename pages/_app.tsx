import "../styles/globals.css";
import "../styles/nprogress.css";
import "../styles/highlight.css";
import "../styles/post.scss";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theme";
import NProgress from "nprogress";
import Router from "next/router";
import NextHead from "next/head";
import { MetadataProvider } from "../src/MetadataContext";
import { makeMetadata } from "../content/metadata";

/* NProgress */
NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});
/* /NProgress */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetadataProvider
      value={{
        default: makeMetadata(),
        makeMetadata,
      }}
    >
      <ChakraProvider resetCSS theme={theme}>
        <NextHead>
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Subscribe to our blog feed"
            href="/blog/feeds/rss.xml"
          />
          <link
            rel="alternate"
            type="application/atom+xml"
            title="Subscribe to our blog feed"
            href="/blog/feeds/atom.xml"
          />
          <link
            rel="alternate"
            type="application/feed+json"
            title="Subscribe to our blog feed"
            href="/blog/feeds/feed.json"
          />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.webmanifest" />
          <script
            defer
            data-domain="stately.ai"
            src="https://plausible.io/js/plausible.js"
          ></script>
        </NextHead>
        <Component {...pageProps} />
      </ChakraProvider>
    </MetadataProvider>
  );
}
export default MyApp;
