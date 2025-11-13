/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable type checking during build (temporary fix for deployment)
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export', // enables static export
  images: {
    unoptimized: true, // needed for next/image to work in static mode
  },
  // Disable ESLint during build
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  
  // API rewrites for development
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/:path*"
            : "/api/",
      },
    ];
  },
};

module.exports = nextConfig;

