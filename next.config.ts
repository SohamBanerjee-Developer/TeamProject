import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        // For Next.js 12 and below or simple domain allowlist
        domains: ['res.cloudinary.com'],

        // For Next.js 13+ you can use remotePatterns for more control
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },

};

export default nextConfig;
