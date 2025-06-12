import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ["i.pravatar.cc"], // ✅ Allow images from this external domain
  },
};

export default nextConfig;
