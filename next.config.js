/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    //Replace typescript if not work
    ignoreBuildErrors: true,
  }, 
  experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ["mongoose"],
      },
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "img.clerk.com",
          },
          {
            protocol: "https",
            hostname: "images.clerk.dev",
          },
          {
            protocol: "https",
            hostname: "uploadthing.com",
          },
          {
            protocol: "https",
            hostname: "placehold.co",
          },
        ],
      },
    };


module.exports = nextConfig
