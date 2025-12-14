/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module?.rules?.push({
      test: /\.whl$/,
      use: "null-loader",
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
