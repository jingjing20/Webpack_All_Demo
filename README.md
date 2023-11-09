# Webpack_All_Demo

## Webpack loader

- webpack 内部只能对 js 文件进行打包，想要处理其他文件就必须借助 loader。
- 当需要使用多个 loader 的时候，注意 webpack 执行 loader 的顺序。 **从下到上，从右到左。**

### 图片打包

- 采用了 url-loader 时如果设置了 limit 限制了文件大小，则必须同时装 file-loader。因为超过了设定值时需要采用 file-loader 来打包文件。

### 样式打包

- 打包 css 文件的时候，我们会同时装上 css-loader 和 style-loader。他们具体什么用处呢？

- css-loader：帮助我们解析 css 文件之间的关联关系，同时生成样式文件。
- style-loader：帮助我们把 css-loader 生成的样式文件挂到页面的 head 标签上去。从而使样式生效。

- postcss postcss-loader 能帮助我们给浏览器不兼容的样式代码自动加上兼容性前缀。

## Webpack plugins

- 各种插件，直接查阅官方文档。

- html 模板插件、自动清除打包文件夹插件、压缩文件插件、样式处理插件等等。

## babel

- `polyfill` 一开始如果直接像下面这样配置的话，`babel` 会帮我们把所有的 es5 打包到 `main.js` 中。造成 `main.js` 文件太大的后果。

```js
{
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
        },
    },
},
```

- 进一步配置如下之后，`babel` 会自动检测我们写的代码里面有哪些 `es6` 代码需要转换成 `es5` 代码，然后只帮助我们把写到的 `es6` 代码转换打包。打包后的 `main.js `小一些。

```js
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
                        useBuiltIns: 'usage',
                    },
                ],
            ],
        },
    },
},
```

- 更进一步配置如下，babel 会根据 targets 里面配置的浏览器版本是否已经支持 es6 来打包 es5 代码。打包后的代码更小了。

```js

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
```

## Tree Shaking

- 只支持静态引入的方法（ES Module），不支持动态引入的方式（Common Js）。
- 只会把用到的代码打包，没用到的会被剔除。
- 在生产模式下会自动开启 tree shaking。

## webpack-merge 使用

- 把公共的配置提取到 webpack.common.js 里面，然后在 webpack.dev.js 和 webpack.prod.js 里面引入 webpack.common.js，同时采用 webpack-merge 把他们两个合并后再导出。

## webpack-bundle-analyzer 参数配置详情

```js
new BundleAnalyzerPlugin({
    // 可以是`server`，`static`或`disabled`。
    // 在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
    // 在“静态”模式下，会生成带有报告的单个HTML文件。
    // 在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
    analyzerMode: 'server',
    // 将在“服务器”模式下使用的主机启动HTTP服务器。
    analyzerHost: '127.0.0.1',
    // 将在“服务器”模式下使用的端口启动HTTP服务器。
    analyzerPort: 8888,
    // 路径捆绑，将在`static`模式下生成的报告文件。
    // 相对于捆绑输出目录。
    reportFilename: 'report.html',
    // 模块大小默认显示在报告中。
    // 应该是`stat`，`parsed`或者`gzip`中的一个。
    // 有关更多信息，请参见“定义”一节。
    defaultSizes: 'parsed',
    // 在默认浏览器中自动打开报告
    openAnalyzer: true,
    // 如果为 true，则 Webpack Stats JSON 文件将在 bundle 输出目录中生成
    generateStatsFile: false,
    // 如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
    // 相对于捆绑输出目录。
    statsFilename: 'stats.json',
    // stats.toJson（）方法的选项。
    // 例如，您可以使用`source：false`选项排除统计文件中模块的来源。
    statsOptions: null,
    logLevel: 'info', // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
}),
```

## webpack 与 预加载

- 如下代码所示，在异步加载某个模块的时候，在里面写上 `/* webpackPrefetch: true */`之后，浏览器会在加载完所有同步加载的文件之后，自动去提前加载异步模块。这样就能提高异步加载模块时的速度，提升用户体验。

```js
document.addEventListener('click', () => {
  import(/* webpackPrefetch: true */ './click.js').then(({ default: func }) => {
    func();
  });
});
```

- 举个例子，比如在某个网站上面，用户首次访问的时候没有登录。当你点击登录时再去加载登录需要使用的文件的话，必然会有所延迟，降低用户体验。当然你也可以在加载网站首页的时候就把登录需要使用的文件也都下载下来，但是这也必然会影响首页加载速度，也会降低用户体验。webpack 提供的这个功能就很好的解决了这些个问题。

## webpack 与 浏览器缓存

- 在浏览器中打开一个打包好的文件，然后回到编辑器中修改一下代码保存重新打包一次。再回到浏览器刷新页面，你会发现页面不会有任何变化。因为浏览器有缓存机制，发现你请求的文件本地已经有一样名字文件缓存下来了，浏览器会直接拿过来用了。解决方式如下：在 `webpack.config.js` 的 `output` 的文件名加上下面的 [contenthash]。

```js
output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
}
```

- 这样配置打包出来的文件名会加上以文件内容生成的 hash 值，所以只要文件有了变化，打包出来的文件名就会不一样，在浏览器加载文件的时候就不会走缓存而是请求新的文件了。

## 提升 webpack 打包速度方法

- 1、尽量使用新版 node npm yarn 等。
- 2、在尽可能少的模块上应用 loader。
- 3、plugin 尽可能精简并确保可靠。
- 4、resolve 参数合理配置。resolve 能帮助我们在引入文件的时候省掉后缀名。但是这也会加长打包时间。

```js
resolve: {
    extensions: ['.js', '.jxs'],
},
```

- 5、使用 DllPlugin 和 DllReferencePlugin 用某种方法实现了拆分 bundles，同时还大幅度提升了构建的速度。"DLL" 一词代表微软最初引入的动态链接库。两者结合可以实现把一些第三方库单独打包到一个文件中，然后下一次打包直接可以应用，不需要再次打包。因为这些第三方模块一般不会改变。
