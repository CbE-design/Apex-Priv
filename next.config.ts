<<<<<<< HEAD
import { NormalModuleReplacementPlugin } from 'webpack';

const nextConfig = {
=======
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
>>>>>>> refs/remotes/origin/main
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
<<<<<<< HEAD
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: [],
=======
    ],
  },
>>>>>>> refs/remotes/origin/main
  allowedDevOrigins: [
    "*.replit.dev",
    "*.kirk.replit.dev",
    "*.picard.replit.dev",
    "*.janeway.replit.dev",
    "*.sisko.replit.dev",
    "*.spock.replit.dev",
    "*.repl.co",
    "*.cloudworkstations.dev",
    "*.firebaseapp.com",
    "*.web.app",
    ...(process.env.REPLIT_DEV_DOMAIN ? [process.env.REPLIT_DEV_DOMAIN] : []),
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: [
        "*.replit.dev",
        "*.kirk.replit.dev",
        "*.picard.replit.dev",
        "*.janeway.replit.dev",
        "*.sisko.replit.dev",
        "*.spock.replit.dev",
        "*.repl.co",
        "*.cloudworkstations.dev",
        "localhost:3000",
        "localhost:5000",
        "*.firebaseapp.com",
        "*.web.app",
        ...(process.env.REPLIT_DEV_DOMAIN ? [process.env.REPLIT_DEV_DOMAIN] : []),
      ],
    },
  },
<<<<<<< HEAD
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new NormalModuleReplacementPlugin(
          /firebase\/functions/,
          './empty-module.js'
        )
      );
    }

    return config;
  },
=======
>>>>>>> refs/remotes/origin/main
};

export default nextConfig;
