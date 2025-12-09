const AutoImport = require('unplugin-auto-import/webpack')

module.exports = {
  publicPath: './',
  outputDir: 'dist', //build输出目录
  assetsDir: 'assets', //静态资源目录（js, css, img）
  lintOnSave: false, //是否开启eslint
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-imports.d.ts',
      }),
    ],
  },
}