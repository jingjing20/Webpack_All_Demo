const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// import { Configuration } from 'webpack';
/**
 * @type {Configuration}
 */
const config = {
	entry: {
		main: './src/index.js',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									targets: {
										chrome: '67',
									},
									useBuiltIns: 'usage',
								},
							],
						],
					},
				},
			},
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
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2, // 执行css-loader前执行的loader数量
							modules: true, // 开启css模块化
						},
					},
					{
						loader: 'less-loader',
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new CleanWebpackPlugin(),
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
			minSize: 30000, // 超过这个大小才满足单独打包的要求
			minChunks: 1, // 代表有多少个文件依赖了某个模块就单独打包
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~', // 文件连接符
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
			},
		},
	},
	output: {
		publicPath: '/',
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist'),
	},
};

module.exports = config;
