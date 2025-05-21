// webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/scripts/index.js', // entry utama
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader', // diganti di production
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // sumber html utama
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
