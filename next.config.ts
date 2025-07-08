import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, options) {
    config.module?.rules?.push({
      test: /\.whl$/,
      use: "null-loader"
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**", // Important to allow any path
      },
    ],
  },
};

export default nextConfig;
