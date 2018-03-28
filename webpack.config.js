const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GoogleFontsPlugin = require('google-fonts-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    beatmachine: [
      'babel-polyfill',
      './src/index.js',
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: 'src/assets/sounds', to: 'sounds' },
      { from: 'src/assets/favicon.ico', to: '' },
    ]),
    new HtmlWebpackPlugin({
      title: 'Beatmachine',
      template: path.join(__dirname, 'src/html/index.ejs'),
    }),
    new GoogleFontsPlugin({
      fonts: [
        { family: 'Racing Sans One' },
        { family: 'Roboto Condensed', variants: ['400', '300'] },
      ],
      filename: 'css/fonts.css',
      formats: ['woff2'],
      path: 'fonts/',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0',
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
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            limit: 10,
          },
        }],
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
