/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: false,
    images: {
        unoptimized: true,
    },
    cacheComponents: true,
};

export default nextConfig;

