/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Hupscale_Finale' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Hupscale_Finale' : '',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './loader.js'
  }
}

module.exports = nextConfig
