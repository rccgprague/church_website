/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "cs"],
    defaultLocale: "en",
    localeDetection: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/cz/:path*",
        destination: "/cs",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
