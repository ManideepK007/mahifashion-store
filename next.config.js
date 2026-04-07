/** @type {import('next').NextConfig} */
const nextConfig = {
  // KEEP THIS: Essential for your OokoKaka banners
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // FIX: Remove or comment out 'reactCompiler' if the install doesn't work
  experimental: {
    // reactCompiler: true, // Only enable after 'npm install babel-plugin-react-compiler'
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;