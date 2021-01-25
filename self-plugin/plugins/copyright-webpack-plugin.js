class CopyrightWebpackPlugin {
	// constructor(options) {	可以接受参数，来自于插件配置项 options
	// 	console.log(options); //jing-log
	// }

	apply(compiler) {
		compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
			console.log('compiler');
		});

		compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
			compilation.assets['copyright.txt'] = {
				source: function () {
					return 'copyright by jing hao';
				},
				size: function () {
					return 21;
				},
			};
			cb();
		});
	}
}

module.exports = CopyrightWebpackPlugin;
