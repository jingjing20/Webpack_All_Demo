const fs = require('fs');
const path = require('path');

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

// 分析一个模块的依赖关系
const moduleAnalyser = (filename) => {
	const content = fs.readFileSync(filename, 'utf-8');
	// 借助  babel 的 parser 模块解析文件
	const ast = parser.parse(content, {
		sourceType: 'module',
	});

	// 定义保存依赖关系的对象
	const dependencies = {};

	traverse(ast, {
		ImportDeclaration({ node }) {
			const dirname = path.dirname(filename);
			const newFile = './' + path.join(dirname, node.source.value);
			dependencies[node.source.value] = newFile;
		},
	});

	// 把 ast 语法书转换成浏览器能执行的代码
	const { code } = babel.transformFromAst(ast, null, {
		presets: ['@babel/preset-env'],
	});

	return {
		filename,
		dependencies,
		code,
	};
};

const makeDependenciesGraph = (entry) => {
	// 调用 moduleAnalyser 函数分析出入口文件的依赖关系
	const entryModule = moduleAnalyser(entry);

	const graphArray = [entryModule];
	for (let i = 0; i < graphArray.length; i++) {
		const item = graphArray[i];
		const { dependencies } = item;
		if (dependencies) {
			for (const j in dependencies) {
				graphArray.push(moduleAnalyser(dependencies[j]));
			}
		}
	}
	const graph = {};
	graphArray.forEach((item) => {
		graph[item.filename] = {
			dependencies: item.dependencies,
			code: item.code,
		};
	});
	return graph;
};

const moduleInfo = makeDependenciesGraph('./src/index.js');
console.log(moduleInfo); //jing-log
