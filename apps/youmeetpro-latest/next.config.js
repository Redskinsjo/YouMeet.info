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
    STRIPE_DEV_WEBHOOK_SECRET: process.env.STRIPE_DEV_WEBHOOK_SECRET,
    TEST: process.env.TEST,
    APP: process.env.APP,
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
    GOOGLE_PRIVATE_KEY_ID: process.env.GOOGLE_PRIVATE_KEY_ID,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_AUTH_URI: process.env.GOOGLE_AUTH_URI,
    GOOGLE_TOKEN_URI: process.env.GOOGLE_TOKEN_URI,
    GOOGLE_AUTH_PROVIDER_X509_CERT_URL:
      process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    GOOGLE_CLIENT_X509_CERT_URL: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    GOOGLE_UNIVERSE_DOMAIN: process.env.GOOGLE_UNIVERSE_DOMAIN,
    API_URI: process.env.API_URI,
    API_DOMAIN: process.env.API_DOMAIN,
    CANDIDATE_URI: process.env.CANDIDATE_URI,
    CANDIDATE_DOMAIN: process.env.CANDIDATE_DOMAIN,
    MONGODB_URI: process.env.MONGODB_URI,
    GMAIL_ADDRESS: process.env.GMAIL_ADDRESS,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GOOGLE_CTS_TENANT_ID: process.env.GOOGLE_CTS_TENANT_ID,
    GOOGLE_CTS_PROJECT_ID: process.env.GOOGLE_CTS_PROJECT_ID,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    TURBO_REMOTE_CACHE_SIGNATURE_KEY:
      process.env.TURBO_REMOTE_CACHE_SIGNATURE_KEY,
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
    OPENAI_PROJECT: process.env.OPENAI_PROJECT,
    OPENAI_ORGANIZATION: process.env.OPENAI_ORGANIZATION,
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
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "@graphql-tools/webpack-loader",
        },
      ],
    });

    if (dev || isServer) {
      config.devtool = "source-map";
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
