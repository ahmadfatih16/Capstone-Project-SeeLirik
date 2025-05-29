// webpack.prod.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin'); // Tambahkan ini
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      // Kecualikan manifest.json dan folder public dari pre-caching Workbox.
      // Aset di folder public akan di-cache menggunakan runtimeCaching di bawah.
      exclude: [/\.map$/, /manifest\.json$/, /public\//],
      runtimeCaching: [
        {
          // Cache CDN untuk ikon dan font (Ionicons, Font Awesome, Boxicons, Google Fonts)
          urlPattern: ({ url }) => url.href.startsWith('https://unpkg.com/') || url.href.startsWith('https://cdnjs.cloudflare.com/') || url.href.startsWith('https://fonts.googleapis.com/') || url.href.startsWith('https://fonts.gstatic.com/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'cdn-cache',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 30, // Cache selama 30 hari
              maxEntries: 50,
            },
          },
        },
        {
          // Cache gambar dari folder public/images
          urlPattern: ({ request, url }) => request.destination === 'image' && url.pathname.includes('/public/images/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 30,
              maxEntries: 50,
            },
          },
        },
        {
          // Cache video dari folder public/video
          urlPattern: ({ request, url }) => request.destination === 'video' && url.pathname.includes('/public/video/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'videos-cache',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 30,
              maxEntries: 5,
            },
          },
        },
        {
          // Cache SVG seperti menu.svg
          urlPattern: ({ request, url }) => request.destination === 'image' && url.pathname.includes('/public/') && url.pathname.endsWith('.svg'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'svg-cache',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 30,
              maxEntries: 10,
            },
          },
        },
      ],
    }),
  ],
});