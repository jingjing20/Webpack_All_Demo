var HtmlWebpackPlugin = require('html-webpack-plugin');

// import { Configuration } from 'webpack';
/**
 * @type {Configuration}
 */
const config = {
	mode: 'development',
	entry: {
		main: './src/index.js',
	},
	module: {
		rules: [
			{
				test: /\.jpg$/,
				use: {
					loader: 'file-loader',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
	],
};

module.exports = config;
