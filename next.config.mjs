/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        unoptimized: true,
    },
    cacheComponents: false,
    experimental: {
        useCache: true,
    },
};

export default nextConfig;

