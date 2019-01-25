const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    // Since webpack v4, specifying mode automatically configures DefinePlugin which sets process.env.NODE_ENV
    // webpack v4+ will minify your code by default in production mode with the TerserPlugin
    // However, there are other options out there. Here are a few more popular ones:
    // BabelMinifyWebpackPlugin
    // ClosureCompilerPlugin
    // If you decide to try another minification plugin, just make sure your new choice also drops dead code
    // as via tree shaking and provide it as the optimization.minimizer.
    mode: devMode ? 'development' : 'production',
    entry: {
        index: './src/index.js'
    },
    output: {
        // note: [hash]/[chunkhash] should typically be excluded in development
        filename: devMode ? '[name].bundle.js' : '[name].[contenthash].bundle.js', // [name] is from entry object key(s), [contenthash] is the hash of the content of a file and ensures browers use new files when available and not cached ones
        chunkFilename: devMode ? '[name].bundle.js' : '[name].[contenthash].bundle.js', // chunkFilename determines the name of non-entry chunk files
        path: path.resolve(__dirname, 'dist')
    },
    // It's recommended to have source maps enabled in production, as they are useful for debugging as well
    // as running benchmark tests. That said, you should choose one with a fairly quick build speed that's
    // recommended for production use (see https://webpack.js.org/configuration/devtool).
    // Avoid inline-*** and eval-*** use in production as they can increase bundle size and reduce the overall performance. 
    devtool: devMode ? 'inline-source-map' : 'source-map', // also creates maps for any vendor bundles produced by code splitting
    optimization: {
        // Use the SplitChunksPlugin. The CommonsChunkPlugin has been removed in webpack v4 legato.
        // However, this is not needed if doing dynamic imports (the best way to code-split).
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: 'single'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                // use the include field to only apply the loader modules that actually need to be transformed by it
                include: path.resolve(__dirname, 'src'),
                use: [
                    // Usually, it's recommended to extract the style sheets into a dedicated file in production
                    // using the mini-css-extract-plugin. This way your styles are not dependent on JavaScript.
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            { // fonts
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            { // audio
                test: /\.mp3$/,
                use: [
                    'file-loader'
                ]
            },
            { // images
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    'file-loader',
                    'image-webpack-loader' // compresses images
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new FaviconsWebpackPlugin('./src/assets/images/portfolioIcon.svg'),
        // Use webpack.HashedModuleIdsPlugin to prevent vendor bundle's hash from changing when a new local module is added.
        // Improves performance as browser will use cached version instead of downloading duplicate version with different hash.
        // Also available is the NamedModulesPlugin, which will use the path to the module rather than a numerical identifier.
        // While this plugin is useful during development for more readable output, it does take a bit longer to run. The
        // HashedModuleIdsPlugin is recommended for production builds.
        devMode ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin()
    ]
};
