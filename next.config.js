/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["stately.ai"],
  },
  unstable_runtimeJS: false,
  basePath: "/blog",
  async rewrites() {
    return [
      {
        source: `/`,
        destination: `https://landing-page-prod.stately.ai`,
        basePath: false,
      },
    ];
  },
};
