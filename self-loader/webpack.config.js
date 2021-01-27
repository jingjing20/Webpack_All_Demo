const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// import { Configuration } from 'webpack';

/**
 * @type {Configuration}
 */
const config = {
	mode: 'development',
	entry: {
		main: './src/index.js',
	},
	plugins: [new CleanWebpackPlugin()],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: path.resolve(__dirname, 'loaders/replaceLoader.js'),
					options: {
						name: 'baobao',
					},
				},
			},
		],
	},
};

module.exports = config;
