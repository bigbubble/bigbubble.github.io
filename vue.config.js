const titles = require('./title.js');
const glob = require('glob');
const pages = {};
glob.sync('./src/**/app.js').forEach(path => {
    console.log(path);
    const chunk = path.split('./src/')[1].split('/app.js')[0];
    pages[chunk] = {
        entry: path,
        template: 'public/index.html',
        title: titles[chunk],
        chunks: ['chunk-vendors', 'chunk-common', chunk]
    }
});

module.exports = {
    publicPath: '/',
    outputDir: 'dist/',
    pages,
    css: { // 配置css模块
        loaderOptions: { // 向预处理器 Loader 传递配置选项
            less: { // 配置less（其他样式解析用法一致）
                javascriptEnabled: true // 设置为true
            }
        }
    },
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/*.do': {
                target: 'http://localhost:9999',
                changeOrigin: true,
                pathRewrite: { '^/': '' }
            }
        }
    }
};