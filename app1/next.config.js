/** @type {import('next').NextConfig} */

/**
 * Remote applist add
 */
 const NextFederationPlugin = require("@module-federation/nextjs-mf"); 
 const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   webpack: (config, options) => {
     config.plugins.push(
       new NextFederationPlugin({
         name: "App1", /** */
         filename: "static/chunks/remoteEntry.js",
         exposes: { 
            './PAGES':"./src/esposes/esposes.tsx"
         },
         remotes: {},
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
 