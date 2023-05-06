/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
  experimental: {
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: {subsets: ["latin"]},
      },

    ],
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs", "bcrypt"],
  },
}

export default nextConfig
