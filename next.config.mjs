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
      {
        protocol: "https",
        hostname: "hbapi.jisender.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "api.jisender.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
