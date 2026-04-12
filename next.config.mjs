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
        hostname: "hbapi.thehackbio.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "api.thehackbio.com",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "165.22.124.117",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
