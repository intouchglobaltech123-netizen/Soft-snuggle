import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PGlite (embedded Postgres used when DATABASE_URL is not set) ships WASM files
  // that must be loaded from node_modules at runtime, not bundled.
  serverExternalPackages: ["@electric-sql/pglite", "pg"],
  // Hide the floating "N" dev-tools button while developing
  devIndicators: false,
};

export default nextConfig;
