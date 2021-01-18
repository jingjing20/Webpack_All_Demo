# Webpack_All_Demo

## Webpack loader

-   webpack 内部只能对 js 文件进行打包，想要处理其他文件就必须借助 loader。

### 图片打包

-   采用了 url-loader 时如果设置了 limit 限制了文件大小，则必须同时装 file-loader。因为超过了设定值时需要采用 file-loader 来打包文件。

### 样式打包

-   打包 css 文件的时候，我们会同时装上 css-loader 和 style-loader。他们具体什么用处呢？

-   css-loader：帮助我们解析 css 文件之间的关联关系，同时生成样式文件。
-   style-loader：帮助我们把 css-loader 生成的样式文件挂到页面的 head 标签上去。从而使样式生效。
