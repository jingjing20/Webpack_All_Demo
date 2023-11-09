const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// import { Configuration } from 'webpack';
/**
 * @type {Configuration}
 */
const config = {
  mode: 'development',

  // sourceMap 配置
  devtool: '#@cheap-module-eval-source-map',
  // development devtool: 'cheap-module-eval-source-map',
  // production devtool: 'cheap-module-source-map',

  // devServer 配置
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: true, // 打开浏览器
    port: 8888, // 开启服务的端口
  },

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
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};

module.exports = config;
