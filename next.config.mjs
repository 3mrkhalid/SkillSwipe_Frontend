// next.config.mjs
export default {
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://skillswipebackend-production.up.railway.app/:path*',
      },
    ];
  },
}