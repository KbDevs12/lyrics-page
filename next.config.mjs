/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "cdn-images.dzcdn.net"
            }
        ]
    }
};

export default nextConfig;
