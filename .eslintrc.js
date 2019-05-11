module.exports = {
    root: true,
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
        'no-undef': 'off',
        'semi': [0, 'always'], // 语句强制分号结尾
        'semi-spacing': [0, { 'before': false, 'after': true }],
        'indent': 0,
        'space-before-function-paren': [0, 'always'], // 函数定义时括号前面要不要有空格
        "object-curly-spacing": 'off',//大括号内是否允许不必要的空格
        'eol-last': 0, // 文件以单一的换行符结束
        "eqeqeq": 0, // 必须使用全等
        "no-unneeded-ternary": 0,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
    }
}
