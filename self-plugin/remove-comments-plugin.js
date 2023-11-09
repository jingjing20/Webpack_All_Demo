const { ConcatSource } = require('webpack-sources');

class RemoveCommentsPlugin {
  constructor(options) {
    // 可以接受参数，来自于插件配置项 options
    console.log(options); //jing-log
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('RemoveCommentsPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'RemoveCommentsPlugin',
          stage: compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
        },
        () => {
          for (const name in compilation.assets) {
            if (name.endsWith('.js')) {
              const originalSource = compilation.assets[name].source();
              const noCommentsSource = originalSource.replace(/\/\*{2,}\/\s?/g, '');

              compilation.updateAsset(name, new ConcatSource(noCommentsSource));
            }
          }
        },
      );
    });
  }
}

module.exports = RemoveCommentsPlugin;
