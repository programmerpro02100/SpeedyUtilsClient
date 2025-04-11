import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // serverURL: process.env.NODE_ENV === "production" 
    //   ? "https://server.speedyutils.com" 
    //   : "http://localhost:8080",
    serverURL : "https://server.speedyutils.com",
    baseUrl: process.env.NODE_ENV === "production" 
      ? "https://speedyutils.com" 
      : "http://localhost:3000",
    secret: "jlkdjfldskj]o[p5432io4jp]p]01412343nliqnmsiwqtdkn,a.n;iet",
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      use: "worker-loader",
    });
    return config;
  },
  async rewrites() {
    const serverURL=  process.env.NODE_ENV === "production" 
    ? "https://server.speedyutils.com" 
    : "http://localhost:8080"
    return [
      {
        source: "/sitemap-main.xml",
        destination: `${serverURL}/sitemap-main.xml` ,
      },
      {
        source: "/sitemap-tools.xml",
        destination: `${serverURL}/sitemap-tools.xml`,
      }
    ];
  },
};

export default nextConfig;
