const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./webpack.config.js');

const complie = webpack(config);

const app = express();

app.use(
	webpackDevMiddleware(complie, {
		publicPath: config.output.publicPath,
	})
);

app.listen(3000, () => {
	console.log('服务已开启'); //jing-log
});
