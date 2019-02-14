const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

// todo: consolidate with webpack.config.js, partition into shared portion, use webpack-merge

module.exports = {
  entry: {
    tests: './tests/index.js'
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
        test: /\.js$/,
        enforce: 'post',
        exclude: /(node_modules)/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        }
      },
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
  mode: 'none',
  devtool: 'inline-cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin(['./'])
  ]
};
