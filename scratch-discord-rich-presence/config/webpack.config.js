'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

const webpack = require("webpack");
const { resolve } = require('../build/contentScript.js');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    entry: {
      popup: PATHS.src + '/popup.js',
      contentScript: PATHS.src + '/contentScript.js',
      background: PATHS.src + '/background.js',
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    resolve: {
      fallback: { 
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "crypto": require.resolve("crypto-browserify"),
        "timers": require.resolve('timers-browserify'),
        "buffer": require.resolve("buffer/"),
        "stream": require.resolve("stream-browserify"),
        "process": require.resolve("process/browser"),
        "net": require.resolve("net-browserify")
      },
      alias: {
        path: "path-webpack"
      }
    },
    target: "node",
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser'
      }),
      new webpack.DefinePlugin({
        "global": {}
      })
    ]
  });

module.exports = config;
