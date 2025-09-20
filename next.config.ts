import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // increase from default 1mb
    },
  },
    images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/demncxfgx/**" 
      },
    ],
  },
};

export default nextConfig;
