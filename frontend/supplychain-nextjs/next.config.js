/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(mov|mp4)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }  
        }
      ]
    })

    return config
  },
}