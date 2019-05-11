module.exports =
    {
        "presets": [
            "@vue/app",
            "@vue/babel-preset-jsx"
        ],
        "plugins": [
            "@babel/plugin-syntax-dynamic-import",
            [
                "import",
                {
                    "libraryName": "iview",
                    "libraryDirectory": "src/components"
                }
            ]
        ]
    }