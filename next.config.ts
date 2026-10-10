import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Preserve SEO — 301 redirects for legacy URLs
      { source: "/category/wildlife-diaries", destination: "/travel-guides", permanent: true },
      { source: "/our-team", destination: "/about-us", permanent: true },

      // WordPress artifacts and unused pages — permanently removed
      { source: "/sample-page", destination: "/", permanent: true },
      { source: "/shop", destination: "/", permanent: true },
      { source: "/cart", destination: "/", permanent: true },
      { source: "/checkout", destination: "/", permanent: true },
      { source: "/my-account", destination: "/", permanent: true },
      { source: "/search", destination: "/", permanent: true },
      { source: "/404-page", destination: "/", permanent: true },
      { source: "/author/:slug", destination: "/", permanent: true },
    ];
  },
};