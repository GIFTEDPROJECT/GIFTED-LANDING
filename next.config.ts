import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    BREVO_LIST_ID: process.env.BREVO_LIST_ID,
  },
};

export default nextConfig;
