# Webpack_All_Demo

## Webpack loader

-   webpack 内部只能对 js 文件进行打包，想要处理其他文件就必须借助 loader。

### 图片打包

-   采用了 url-loader 时如果设置了 limit 限制了文件大小，则必须同时装 file-loader。因为超过了设定值时需要采用 file-loader 来打包文件。

### 样式打包

-   打包 css 文件的时候，我们会同时装上 css-loader 和 style-loader。他们具体什么用处呢？

-   css-loader：帮助我们解析 css 文件之间的关联关系，同时生成样式文件。
-   style-loader：帮助我们把 css-loader 生成的样式文件挂到页面的 head 标签上去。从而使样式生效。

-   postcss postcss-loader 能帮助我们给浏览器不兼容的样式代码自动加上兼容性前缀。

## Webpack plugins

-   各种插件，直接查阅官方文档。

-   html 模板插件、自动清除打包文件夹插件、压缩文件插件等等。

## babel

-   `polyfill` 一开始如果直接像下面这样配置的话，`babel` 会帮我们把所有的 es5 打包到 `main.js` 中。造成 `main.js` 文件太大的后果。

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

-   进一步配置如下之后，`babel` 会自动检测我们写的代码里面有哪些 `es6` 代码需要转换成 `es5` 代码，然后只帮助我们把写到的 `es6` 代码转换打包。打包后的 `main.js `小一些。

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

-   更进一步配置如下，babel 会根据 targets 里面配置的浏览器版本是否已经支持 es6 来打包 es5 代码。打包后的代码更小了。

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

-   只支持静态引入的方法（ES Module），不支持动态引入的方式（Common Js）。
-   只会把用到的代码打包，没用到的会被剔除。

## webpack-merge 使用

-   把公共的配置提取到 webpack.common.js 里面，然后在 webpack.dev.js 和 webpack.prod.js 里面引入 webpack.common.js，同时采用 webpack-merge 把他们两个合并后再导出。
