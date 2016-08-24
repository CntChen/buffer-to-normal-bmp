var path = require('path');

var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');

var plugins = [
  new CleanPlugin('dist'),
];

module.exports = {
  entry: './src',
  output: {
    path: 'dist/',
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    library: 'BufferToNormalBmp',
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.js$/,
      include: /src/,
      loader: 'babel-loader',
    }, ],
  }
};