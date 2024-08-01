/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
            domains: ['lovely-flamingo-139.convex.cloud','utfs.io'],
          
    },
    typescript:{
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },  
};

export default nextConfig;
