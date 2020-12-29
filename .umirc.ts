import { defineConfig, utils } from 'umi';

const { winPath } = utils;

export default defineConfig({
  // 设置路由前缀，通常用于部署到非根目录。
  base: '/',
  // 配置 webpack 的 publicPath。当打包的时候，webpack 会在静态文件路径前面添加 publicPath 的值，当你需要修改静态文件地址时，比如使用 CDN 部署，把 publicPath 的值设为 CDN 的值就可以。
  // 如果使用一些特殊的文件系统，比如混合开发或者 cordova 等技术，可以尝试将 publicPath 设置成 ./ 相对路径。
  publicPath: '/',
  outputPath: 'dist',
  hash: true,
  history: {
    type: 'browser',
  },
  ignoreMomentLocale: true,
  nodeModulesTransform: {
    type: 'none',
  },

  // 配置 html 的输出形式，默认只输出 index.html。
  exportStatic: {
    // htmlSuffix，启用 .html 后缀。
    htmlSuffix: true,
    dynamicRoot: true,
  },
  copy: [{ from: './src/public', to: './public' }],
  locale: {
    default: 'zh-CN',
    baseNavigator: true,
  },
  lessLoader: { javascriptEnabled: true },

  dva: false,

  antd: {
    dark: false,
    compact: true,
  },

  dynamicImport: false,

  theme: {
    'primary-color': '#1DA57A',
    'layout-header-background': '#40a599',
    'layout-trigger-background': '@layout-header-background',
  },
});
