/** @type {import('next').NextConfig} */

/**
 * Remote applist add
 */
const NextFederationPlugin = require("@module-federation/nextjs-mf");

const remote = (isServer) => {
  /**
   * Developer
   */
  const location = isServer && false ? "ssr" : "chunks";
  return {
    App1: `App1@http://localhost:3005/_next/static/${location}/remoteEntry.js`,
  };
};
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "DASHBOARD",
        filename: "static/chunks/remoteEntry.js",
        exposes: { 
          /**
           * other apps component
           * dashboard no
           */
        },
        remotes: remote(options.isServer),
        shared: {},
        extraOptions: {
          automaticAsyncBoundary: true,
        },
      })
    );
    return config;
  },
};
module.exports = nextConfig;
