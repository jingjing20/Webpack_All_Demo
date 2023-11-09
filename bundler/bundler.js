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

// 解析所有模块的依赖关系，得到一个依赖图谱
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

// 生成浏览器能执行的代码
const generateCode = (entry) => {
  const graph = JSON.stringify(makeDependenciesGraph(entry));
  return `
        (function(graph){
            function require(module) {
                function localRequire(relativePath) {
                    return require(graph[module].dependencies[relativePath])
                }
                const exports = {};
                (function(require, exports, code) {
                    eval(code)
                })(localRequire, exports, graph[module].code)
                return exports;
            }
            require('${entry}')
        })(${graph})
    `;
};

const code = generateCode('./src/index.js');
console.log(code); //jing-log

// 生成代码的时候注意点：
// 1、因为 makeDependenciesGraph 得到的是一个依赖对象，是一个对象，如果放在一段字符串里面，得到的会是 [Object, Object]。所以得先转成字符串。
// 2、返回的是一段 js 代码，所以返回的是一段字符串。在浏览器执行的代码为了避免全局变量污染一般都会放在一个闭包里面执行。
// 3、依赖对象里面含有 require() 和 exports 对象，我们要自己定义他们。
