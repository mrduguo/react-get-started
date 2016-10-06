const webpack = require('webpack');
const path = require('path');

const config = {
    devtool: 'eval',
    devServer: {
        contentBase: 'src/www',
        devtool: 'eval',
        hot: true,
        inline: true,
        port: 3000,
        host: '0.0.0.0', // Change to '0.0.0.0' for external facing server
        proxy: {
            "/api": {
                "target": {
                    "host": "api.github.com",
                    "protocol": 'https:',
                    "port": 443
                },
                pathRewrite: {'^/api': ''},
                changeOrigin: true,
                secure: false
            }
        },
    },
    entry: [
        'react-hot-loader/patch',
        path.join(__dirname, '/src/index.js'),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot-loader/webpack', 'babel-loader'],
                exclude: [path.resolve(__dirname, 'node_modules')],
            },
            {
                test: /(\.scss|\.css)$/,
                loaders: ['react-hot-loader/webpack', 'style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]_[hash:base64:5]!postcss!sass?sourceMap']
            },
            {
                test: /\.json$/, 
                loader: 'json'
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=1000000"
            },
            {
                test: /\.(eot|ttf|woff(2)?)/,
                loader: 'file-loader'
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
