import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PGlite (embedded Postgres used when DATABASE_URL is not set) ships WASM files
  // that must be loaded from node_modules at runtime, not bundled.
  serverExternalPackages: ["@electric-sql/pglite", "pg"],
  // Product and hero photos are discovered by listing public/ at request time,
  // so ship those folders with the server functions on Vercel.
  outputFileTracingIncludes: {
    "/**": ["./public/products/**/*", "./public/hero/**/*"],
  },
  // Hide the floating "N" dev-tools button while developing
  devIndicators: false,
  webpack: (config) => {
    // node-postgres optionally uses a native driver we do not ship. Webpack
    // tries to resolve it anyway when it traces instrumentation.ts, so it is
    // declared external rather than bundled.
    config.externals = [...(config.externals ?? []), "pg-native"];
    return config;
  },
};

export default nextConfig;
