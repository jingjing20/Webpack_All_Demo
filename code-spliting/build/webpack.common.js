const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
    new BundleAnalyzerPlugin({
      // 可以是`server`，`static`或`disabled`。
      // 在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
      // 在“静态”模式下，会生成带有报告的单个HTML文件。
      // 在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
      analyzerMode: 'static',
      // 将在“服务器”模式下使用的主机启动HTTP服务器。
      analyzerHost: '127.0.0.1',
      // 将在“服务器”模式下使用的端口启动HTTP服务器。
      analyzerPort: 8888,
      // 路径捆绑，将在`static`模式下生成的报告文件。
      // 相对于捆绑输出目录。
      reportFilename: './report.html',
      // 模块大小默认显示在报告中。
      // 应该是`stat`，`parsed`或者`gzip`中的一个。
      // 有关更多信息，请参见“定义”一节。
      defaultSizes: 'parsed',
      // 在默认浏览器中自动打开报告
      openAnalyzer: false,
      // 如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
      generateStatsFile: false,
      // 如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
      // 相对于捆绑输出目录。
      statsFilename: 'stats.json',
      // stats.toJson（）方法的选项。
      // 例如，您可以使用`source：false`选项排除统计文件中模块的来源。
      // 在这里查看更多选项：https： //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      logLevel: 'info', // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
    }),
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
