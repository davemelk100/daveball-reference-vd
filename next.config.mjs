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
        pathname: "/**",
      },
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
        pathname: "/noise-bird.svg",
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
        hostname: "majorleaguenumbers.com",
      },
      {
        protocol: "https",
        hostname: "www.majorleaguenumbers.com",
      },
      {
        protocol: "https",
        hostname: "coverartarchive.org",
      },
      {
        protocol: "https",
        hostname: "*.archive.org",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "bigtakeover.com",
      },
      {
        protocol: "https",
        hostname: "f4.bcbits.com",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "i.ebayimg.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "timebomb.co.jp",
      },
      {
        protocol: "https",
        hostname: "www.chokebore.net",
      },
      {
        protocol: "https",
        hostname: "metallipromo.com",
      },
      {
        protocol: "https",
        hostname: "www.metalmusicarchives.com",
      },
      {
        protocol: "https",
        hostname: "www.shoxop.com",
      },
      {
        protocol: "https",
        hostname: "themelvins.net",
      },
      {
        protocol: "https",
        hostname: "assets.nhle.com",
      },
      {
        protocol: "https",
        hostname: "cms.nhl.bamgrid.com",
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
      // Security headers for all routes
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
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
