'use strick'

const path = require('path');
const webpack = require('webpack');

const cleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode: 'production',
    plugins: [
        new cleanWebpackPlugin(['libraries']),
        new webpack.NamedModulesPlugin()
    ],
    entry: path.resolve(__dirname, 'script/num2word.js'),
    output: {
        path: path.resolve(__dirname, 'libraries'),
        filename: 'webpack-numbers.js',
        library: 'webpackNumbers',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    }
};