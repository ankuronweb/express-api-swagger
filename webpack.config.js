const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  entry: {
    server: './src/server.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: './src',
    filename: '[name].js'
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  mode: NODE_ENV || 'development',
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['./']),
    new NodemonPlugin()
  ]
};
