const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');
const rootPath=path.resolve(__dirname, '../')
const outputPath=path.resolve(rootPath, 'docs');

var fs = require('fs');
var md5 = require("md5");
var git = require('git-rev')
var moment = require('moment')


const config = {
  devtool: 'source-map',
  entry: [path.join(rootPath, 'src/index.js')],
  module: {
    loaders: [
      {test: /\.json$/, loader: 'json'},
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [path.resolve(rootPath, 'node_modules')],
      }, {
        test: /\.png$/,
        loader: "url-loader?limit=1&name=hashed-files/[hash].[ext]"
      }, {
        test: /\.(eot|ttf|woff(2)?)/,
        loader: 'file-loader?name=hashed-files/[hash].[ext]'
      }, {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=_[hash:base64:5]!postcss!sass?sourceMap',{ publicPath:'../'})
      },
    ],
  },
  output: {
    path: outputPath,
    filename: 'hashed-files/app.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('hashed-files/app.css', { allChunks: true}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(rootPath, 'src')),
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(rootPath, 'config/override')),
    new WebpackOnBuildPlugin(function(stats) {
      var hashedFiles={};
      var outputBase=stats.compilation.compiler.outputPath;
      Object.keys(stats.compilation.assets).forEach(function(k) {
        if(k.endsWith('.js') || k.endsWith('.css')){
          var paths=k.split(/\\|\//);
          if(paths[0]==''){
            paths.shift();
          }
          var sourceMapHashName=null;
          var sourceFileName=paths.pop();
          var extension=sourceFileName.split('.').pop();
          var sourceMapFile=path.join(outputBase, k+'.map');
          try
          {
            var sourceMapData=fs.readFileSync(sourceMapFile, 'utf8');
            sourceMapHashName=md5(sourceMapData)+'.json';
            var sourceMapHashFile=path.join(outputBase+'/'+paths.join('/'), sourceMapHashName);
            fs.writeFile(sourceMapHashFile,sourceMapData);
            fs.unlink(sourceMapFile);
          }
          catch (err){}

          var sourceFile=path.join(outputBase, k);
          var sourceData=fs.readFileSync(sourceFile, 'utf8');
          sourceData=sourceData.replace(new RegExp(sourceFileName+'.map', 'g'), sourceMapHashName);
          sourceData=sourceData.replace(new RegExp('../hashed-files/', 'g'), '');
          var sourceHashPath=paths.join('/')+'/'+md5(sourceData)+'.'+extension;
          var sourceHashFile=path.join(outputBase, sourceHashPath);
          fs.writeFile(sourceHashFile,sourceData);
          fs.unlink(sourceFile);

          hashedFiles[paths.length>0?paths.join('/')+'/'+sourceFileName:sourceFileName]=sourceHashPath;
        }
      });

      git.short(function (gitCommit) {
        var version=moment().format("YYMMDD-HHmmss")+'-'+gitCommit;
        try{
          fs.mkdirSync(outputBase+'/releases');
        }catch(e){}
        try{
          fs.mkdirSync(outputBase+'/releases/'+version);
        }catch(e){}
        var files = fs.readdirSync(outputBase);
        for (var i in files){
          var sourceFile =  outputBase+'/' + files[i];
          if (sourceFile.endsWith('.html') || sourceFile.endsWith('.json')){
            var sourceData=fs.readFileSync(sourceFile, 'utf8');
            Object.keys(hashedFiles).forEach(function(k) {
              sourceData=sourceData.replace(new RegExp(k, 'g'), hashedFiles[k]);
            });
            sourceData=sourceData.replace(new RegExp('VERSION', 'g'), version);
            fs.writeFile(sourceFile,sourceData);


            var releasedFile =  outputBase+'/releases/'+version+'/' + files[i];
            sourceData=sourceData.replace(new RegExp('"hashed-files', 'g'), '"../../hashed-files');
            fs.writeFile(releasedFile,sourceData);
          }
        }
      })
    }),
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
};

module.exports = config;
