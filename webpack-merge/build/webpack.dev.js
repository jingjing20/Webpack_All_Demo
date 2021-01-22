// import { Configuration } from 'webpack';
/**
 * @type {Configuration}
 */
const path = require('path');

const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common.js');
const devConfig = {
	mode: 'development',

	// sourceMap 配置
	devtool: 'cheap-module-eval-source-map',
	// development devtool: 'cheap-module-eval-source-map',
	// production devtool: 'cheap-module-source-map',

	// devServer 配置
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		open: true, // 打开浏览器
		port: 8888, // 开启服务的端口
	},
};

module.exports = merge(commonConfig, devConfig);
