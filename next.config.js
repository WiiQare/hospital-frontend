/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'via.placeholder.com',
      'xsgames.co',
      'lh3.googleusercontent.com',
      'ui-avatars.com',
      'i.goopics.net',
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:3000',
    NEXT_PUBLIC_BASE_URL: 'http://localhost:3010',
    NEXTAUTH_URL: 'http://localhost:3010',
  },
};

module.exports = nextConfig;
