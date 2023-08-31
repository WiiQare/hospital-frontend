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
    NEXT_PUBLIC_API_URL: 'https://api.wiiqare-app.com',
    NEXT_PUBLIC_BASE_URL: 'https://wiiqare-app.com',
    NEXTAUTH_URL: 'https://wiiqare-app.com'
  }
};

module.exports = nextConfig;
