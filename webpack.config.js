'use strick'

const package = require('./package.json');

const path = require('path');
const webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCss = new ExtractTextPlugin("css/[name]-[hash]-css.css");
var extractLess = new ExtractTextPlugin("css/[name]-[hash]-less.css");
var extractSass = new ExtractTextPlugin("css/[name]-[hash]-sass.css");

module.exports = {
    context: __dirname,
    performance: {
        hints: false
    },
    mode: 'development', // 未压缩(开发环境)
   // mode: 'production', // 压缩(线上环境)
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 8081,
        publicPath: 'http://localhost:8081/',
        hot: true,
        historyApiFallback: true,
        inline: true
    },
    plugins:[
        extractCss, extractLess, extractSass,
        new HtmlWebpackPlugin({
            //template: __dirname + '/html/index.html',
            title: 'Hot Module Replacement',
            minify: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                preserveLineBreaks: true,
                useShortDoctype: true,
                html5: true
            },
            inject: true
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(), // devServer--hot:true
        new webpack.NamedModulesPlugin()
    ],
    // 配置打包入口文件
    entry: {
        vendors: Object.keys(package.dependencies).concat(['./common/common.js', './libraries/webpack-numbers.js']), // 分离公共依赖①
        page1: './script/a.js',
        page2: './script/b.js'
    },
    // 配置打包输出规则(在哪输出以及如何输出)
    output: {
        //publicPath: '/',
        // 配置打包输出目录
        path: path.resolve(__dirname, 'dist'),
        // 配置打包输出文件格式规则
        // filename: '[name].bundle.js' // 使用入口名称
        // filename: '[id].bundle.js' // 使用内部 chunk id
        // filename: '[name].[hash].bundle.js' // 使用入口名称
        // filename: '[name].[hash].bundle.js' // 使用每次构建过程中，唯一的 hash 生成
        filename: 'script/[name].[hash].bundle.js' // 使用基于每个 chunk 内容的 hash
    },
    optimization: {
        splitChunks: { // 分离公共依赖②
            cacheGroups: {
                vendors: {
                    test: /[\\/](common|node_modules|libraries)[\\/]/,
                    name: 'vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {test: /\.js$/i, use: 'babel-loader',exclude:/node_modules/},
            {test: /\.css$/i,
             use: extractCss.extract({
                 fallback: "style-loader",
                 use: "css-loader"
             })
            },
            {test: /\.less$/i,
             use: extractLess.extract({
                 fallback: "style-loader",
                 use: ["less-loader", "css-loader"]
             })
            },
            {test: /\.scss$/i,
             use: extractLess.extract({
                 fallback: "style-loader",
                 use: ["sass-loader", "css-loader"]
             })
            },
            {test: /\.(png|jpg|gif)$/i, use: 'url-loader?limit=8192'}
        ]
    },
    resolve: {
        extensions: ['.js', '.css', '.json'],
        alias: {
            cAlia$: path.resolve(__dirname, 'script/c.js'),
            common$: path.resolve(__dirname, 'common/common.js'),
            numWord$: path.resolve(__dirname, 'libraries/webpack-numbers.js')
        }
    }
};

