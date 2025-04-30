/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  images: {
    domains: ['localhost'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig; 