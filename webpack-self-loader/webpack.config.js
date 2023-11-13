/**
 * @type {import('webpack').Configuration}
 **/
export default {
  devtool: false,
  mode: 'development',
  // 样式文件路径
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 根据打包过程中所遇到文件路径匹配是否使用这个 loader
        // 对同一个模块使用多个 loader，注意顺序
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.md$/,
        // 直接使用相对路径
        use: './markdown-loader'
      }
    ]
  }
};
