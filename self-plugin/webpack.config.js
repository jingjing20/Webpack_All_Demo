const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RemoveCommentsPlugin = require('./remove-comments-plugin');

/**
 * @type {import('webpack').Configuration}
 **/

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.js'), //打包入口
  output: {
    //打包到哪里去
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js', //默认文件名main.js
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'), //需要被打包的html
      filename: 'index.html', //文件打包名
      title: 'webpack-self-plugin', //html传进去的变量
    }),
    new RemoveCommentsPlugin({
      name: 'jingjing',
    }),
  ],
};
