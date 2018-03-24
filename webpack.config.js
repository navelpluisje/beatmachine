const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    beatmachine: [
      'babel-polyfill',
      './src/index.js',
    ],
    worker: [
      './assets/worker/worker.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      title: 'Beatmachine',
      template: path.join(__dirname, 'src/html/index.ejs'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => (
        module.context.indexOf('node_modules') >= 0
      ),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0',
          },
          {
            loader: 'eslint-loader',
            options: {
              failOnError: false,
            },
          },
          {
            loader: 'source-map-loader',
          },
        ],
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            useRelativePath: true,
          },
        }],
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      }, {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    compress: true,
    port: 9000,
  },
};
