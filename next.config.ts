import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
    NEXT_AUTH_URL: process.env.NEXT_AUTH_URL,
    API_URL: process.env.API_URL,
  },
  experimental: {
    // Example: allowedOrigins and bodySizeLimit can be set here if needed
    // allowedOrigins: ["https://example.com"],
    // bodySizeLimit: "2mb",
  },
  // Add middleware matcher
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/login",
    "/signup",
    "/", // include this to catch the home page `/`
    "/onboarding",
  ],
};

export default nextConfig;
