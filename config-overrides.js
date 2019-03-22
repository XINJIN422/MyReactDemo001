const {
    override,
    fixBabelImports,
    addLessLoader
} = require("customize-cra");

module.exports = override(
    fixBabelImports("babel-plugin-import", {
        libraryName: "antd-mobile",
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@brand-primary': '#1CAE82', '@brand-primary-tap': '#1DA57A' }
    })
);