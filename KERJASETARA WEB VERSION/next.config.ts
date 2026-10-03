import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin root ke folder proyek agar Next tidak menelusuri package-lock.json
  // di C:\Users\s7n0c (di luar repo git) — menghilangkan warning build & start.
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
