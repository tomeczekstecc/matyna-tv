/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com","picsum.photos"],
  },
  experimental: {
    esmExternals: false, // THIS IS THE FLAG THAT MATTERS
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
