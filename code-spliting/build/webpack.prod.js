// import { Configuration } from 'webpack';
/**
 * @type {Configuration}
 */

const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
  mode: 'production',
  // sourceMap 配置
  devtool: 'cheap-module-source-map',
  // development devtool: 'cheap-module-eval-source-map',
  // production devtool: 'cheap-module-source-map',
};

module.exports = merge(commonConfig, prodConfig);
