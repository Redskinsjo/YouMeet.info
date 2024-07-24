const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: { allowedOrigins: ["localhost", "*.youmeet.info"] },
  },
  swcMinify: true,
  headers: async () => [
    {
      source: "/",
      headers: [
        {
          key: "access-control-allow-origin",
          value:
            process.env.NODE_ENV === "development"
              ? `${process.env.API_DEV_DOMAIN}`
              : `${process.env.API_PROD_DOMAIN}`,
        },
        {
          key: "access-control-allow-methods",
          value: "GET,POST,OPTIONS",
        },
      ],
    },
  ],
  images: {
    loaderFile: "./imagesLoader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: `${process.env.MONGODB_URI}`,
        port: "",
      },
      {
        protocol: "https",
        hostname: "s.gravatar.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media-exp1.licdn.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        port: "",
      },
    ],
  },
  env: {
    APP: process.env.APP,
    PRO_DOMAIN: process.env.PRO_DOMAIN,
    PRO_URI: process.env.PRO_URI,
    API_URI: process.env.API_URI,
    API_DOMAIN: process.env.API_DOMAIN,
    GMAIL_ADDRESS: process.env.GMAIL_ADDRESS,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    MONGODB_URI: process.env.MONGODB_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CTS_TENANT_ID: process.env.GOOGLE_CTS_TENANT_ID,
    GOOGLE_CTS_PROJECT_ID: process.env.GOOGLE_CTS_PROJECT_ID,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    CONNECTIONS_DEV_URI: process.env.CONNECTIONS_DEV_URI,
    PHANTOM_USERNAME: process.env.PHANTOM_USERNAME,
    PHANTOM_PASSWORD: process.env.PHANTOM_PASSWORD,
    PHANTOM_SECRET: process.env.PHANTOM_SECRET,
    STRIPE_KEY: process.env.STRIPE_KEY,
    STRIPE_KEY_PROD: process.env.STRIPE_KEY_PROD,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    STRIPE_SECRET_PROD: process.env.STRIPE_SECRET_PROD,
    STRIPE_ENDPOINT_SECRET: process.env.STRIPE_ENDPOINT_SECRET,
    OPENAI_SECRET: process.env.OPENAI_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    SENDINBLUE_APIKEY: process.env.SENDINBLUE_APIKEY,
    TRACKING_ID: process.env.TRACKING_ID,
    SENTRY_IGNORE_API_RESOLUTION_ERROR:
      process.env.SENTRY_IGNORE_API_RESOLUTION_ERROR,
    LINKEDIN_OAUTH_CLIENT_SECRET: process.env.LINKEDIN_OAUTH_CLIENT_SECRET,
    LINKEDIN_OAUTH_CLIENT_ID: process.env.LINKEDIN_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  },
  webpack: (config, { dev, isServer }) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;

    if (dev || isServer) {
      config.devtool = "source-map";
    }

    return config;
  },
  basePath: "",
};

module.exports = withBundleAnalyzer(nextConfig);

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "youmeet",
    project: "javascript-nextjs",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
