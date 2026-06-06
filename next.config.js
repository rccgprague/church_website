/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, nextRuntime, webpack }) => {
    // Clerk v7 uses node: URI scheme (node:path, node:fs, node:async_hooks).
    // Babel disables tree-shaking so server-only Clerk code leaks into edge/client
    // bundles. Step 1: strip the node: prefix before webpack's scheme detector runs.
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      })
    );
    // Step 2: stub out the resulting bare Node.js built-in names for environments
    // that don't have them (edge runtime and browser).
    if (nextRuntime === 'edge' || !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
        fs: false,
        path: false,
      };
    }
    return config;
  },
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
