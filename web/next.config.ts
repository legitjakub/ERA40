import type { NextConfig } from "next";

// GITHUB_PAGES=1 → statický export pro GitHub Pages (https://legitjakub.github.io/ERA40/).
// Lokální vývoj a `next start` zůstávají beze změny.
const pages = process.env.GITHUB_PAGES === "1";
const basePath = pages ? "/ERA40" : "";

const nextConfig: NextConfig = {
  devIndicators: false,
  cacheComponents: !pages,
  partialPrefetching: !pages,
  ...(pages && {
    output: "export",
    basePath,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
