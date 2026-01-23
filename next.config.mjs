/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Generate source maps in production for debugging
  productionBrowserSourceMaps: true,
  // Enable modern JavaScript output and minimize legacy code
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    localPatterns: [
      {
        pathname: "/api/gbv/image-proxy",
      },
      {
        pathname: "/gbv-cache/**",
      },
      {
        pathname: "/gbv-members/**",
      },
      {
        pathname: "/gbv-albums/**",
      },
      {
        pathname: "/noise-bird.png",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.mlbstatic.com",
      },
      {
        protocol: "https",
        hostname: "*.mlbstatic.com",
      },
      {
        protocol: "https",
        hostname: "www.mlbstatic.com",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "i.discogs.com",
      },
      {
        protocol: "https",
        hostname: "img.discogs.com",
      },
      {
        protocol: "https",
        hostname: "st.discogs.com",
      },
      {
        protocol: "https",
        hostname: "s.discogs.com",
      },
      {
        protocol: "https",
        hostname: "*.discogs.com",
      },
      {
        protocol: "https",
        hostname: "coverartarchive.org",
      },
      {
        protocol: "https",
        hostname: "*.archive.org",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },
  async headers() {
    return [
      // Cache GBV API responses
      {
        source: "/api/gbv/discogs",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/api/gbv/cover-art",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/api/gbv/commons-image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/api/gbv/image-proxy",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache static assets (SVGs, images, fonts)
      {
        source: "/:path*.(svg|png|jpg|jpeg|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache JS and CSS (Next.js adds hashes to filenames)
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Default for all other routes
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ]
  },
}

export default nextConfig
