const loaderUtils = require('loader-utils');

module.exports = function (source) {
	// 写法一
	// const options = loaderUtils.getOptions(this); // loaderUtils.getOptions(this) 能帮我们把 this.query 里面的所有参数解析出来
	// return source.replace('haohao', options.name);

	// 写法二 借助 api this.callback()
	// const options = loaderUtils.getOptions(this);
	// const result = source.replace('haohao', options.name);
	// this.callback(null, result);

	// 像下面这种异步操作会报错
	// const options = loaderUtils.getOptions(this);
	// setTimeout(() => {
	// 	return source.replace('haohao', options.name);
	// }, 5000);

	// 正确的异步写法
	const options = loaderUtils.getOptions(this);
	const callback = this.async();
	setTimeout(() => {
		const result = source.replace('haohao', options.name);
		callback(null, result);
	}, 5000);
};
