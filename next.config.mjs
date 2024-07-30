/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
                port: '',
                pathname: '/vi/**',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
                port: '',
                pathname: '/*/**',
            },
        ],
    },
    rewrites: async () => {
        return [
            {
                source: "/api/:path*",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8000/api/:path*"
                        : "/api/",
            }
        ];
    },
};

export default nextConfig;
