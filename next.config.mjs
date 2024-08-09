/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
            remotePatterns: [
                {protocol: 'https',
        hostname: 'lovely-flamingo-139.convex.cloud',},
        {protocol: 'https',
            hostname: 'utfs.io',}
        ],
          
    },
    typescript:{
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },  
};

export default nextConfig;
