const { override, fixBabelImports, addLessLoader, addWebpackAlias, addPostcssPlugins } = require('customize-cra');
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
console.log('使用新编译')

module.exports = override(
    addWebpackAlias({
        '@': resolve('src')
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1A73E8' },
        localIdentName: '[local]--[hash:base64:5]'
    }),
    addPostcssPlugins([
        require('autoprefixer')({
            flexbox: true
        }),
        require('postcss-preset-env'),
        require("postcss-write-svg"),
        require('postcss-cssnext')({
            mainColor: "#1A73E8",
            altColor: "red"
        }),
        require('postcss-import'),
        require('postcss-url'),
    ]),
    () => config => {
        config.output.publicPath = './'
        return config
    }
);