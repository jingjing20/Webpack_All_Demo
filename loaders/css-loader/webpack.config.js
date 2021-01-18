const HtmlWebpackPlugin = require('html-webpack-plugin');
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
	module: {
		rules: [
			{
				test: /\.(jpg|png|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 2048000, // 文件大小限制：小于这个值采用 url-loader 直接以base64格式打包在main.js中，否则采用file-loader单独打包
						outputPath: 'image/', // 文件超出大小限制值使用 file-loader 打包时文件的输出路径
						name: '[name].[ext]', // 文件超出大小限制值使用 file-loader 打包时输出的文件名
					},
				},
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new CleanWebpackPlugin(),
	],
};

module.exports = config;
