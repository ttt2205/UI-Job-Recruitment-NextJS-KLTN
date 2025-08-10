/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http', // dùng http nếu chạy local
                hostname: 'localhost',
                port: '3000', // nếu bạn chạy server Next.js trên cổng 3000
                pathname: '/**',
            },
        ],
    }
}

module.exports = nextConfig
