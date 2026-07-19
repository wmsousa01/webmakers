/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Bundle the Growth Kit briefs/config so /painel can read them at runtime on Vercel.
  experimental: {
    outputFileTracingIncludes: {
      "/painel": ["./scripts/growth/briefs/**", "./scripts/growth/config/**"],
    },
  },
}

module.exports = nextConfig
