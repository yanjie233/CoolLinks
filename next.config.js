/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['react-icons'],
    webpack: (config) => {
      config.resolve.fallback = { fs: false };
      return config;
    }
  }
  
  module.exports = nextConfig