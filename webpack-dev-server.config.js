const webpack = require('webpack');
const path = require('path');

const config = {
  devServer: {
    contentBase: 'src/www',
    devtool: 'source-map',
    hot: true,
    inline: true,
    port: 3000,
    host: 'localhost', // Change to '0.0.0.0' for external facing server
    proxy: {
      "/api": {
        "target": {
          "host": "api.github.com",
          "protocol": 'https:',
          "port": 443
        },
        pathRewrite: {'^/api' : ''},
        changeOrigin: true,
        secure: false
      }
    },
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.js'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: [path.resolve(__dirname, 'node_modules')],
      }, {
        test: /(\.scss|\.css)$/,
        loaders: ['style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]_[hash:base64:5]!postcss!sass?sourceMap']
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'), // Path of output file
    filename: 'app.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};

module.exports = config;
