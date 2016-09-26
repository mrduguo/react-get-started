const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const config = {
  devtool: 'source-map',
  entry: [path.join(__dirname, '/src/index.js')],
  module: {
    loaders: [
      {test: /\.json$/, loader: 'json'},
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [path.resolve(__dirname, 'node_modules')],
      }, {
        test: /\.png$/,
        loader: "url-loader?limit=1&name=files/[hash].[ext]"
      }, {
        test: /\.(eot|ttf|woff(2)?)/,
        loader: 'file-loader?name=files/[hash].[ext]'
      }, {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=_[hash:base64:5]!postcss!sass?sourceMap')
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'app.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('app.css', { allChunks: true}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, 'src')),
    new TransferWebpackPlugin([
      {from: 'www-production'},
    ], path.resolve(__dirname, 'src')),
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
};

module.exports = config;
