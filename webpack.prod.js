const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // does not work with es6 code
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    plugins: [
        // clear the dist folder before each build
        new CleanWebpackPlugin(['dist']),
        // The MiniCssExtractPlugin plugin extracts CSS into separate files.
        // It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[contenthash].css', // [name] defined in entry object in webpack.common.js
            chunkFilename: '[id].[contenthash].css'
        })
    ],
    // While webpack 5 is likely to come with a CSS minimizer built-in, with webpack 4 you need to bring your
    // own. To minify the output, use a plugin like optimize-css-assets-webpack-plugin. Setting
    // optimization.minimizer overrides the defaults provided by webpack, so make sure to also specify a JS minimizer:
    optimization: {
        minimizer: [
            new UglifyJsPlugin({ // does not work with es6 code, need to use babel-loader to convert to es5
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
});

