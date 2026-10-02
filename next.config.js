const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skillicons.dev",
        pathname: "/icons",
      },
    ],
  },
};

export default nextConfig;
