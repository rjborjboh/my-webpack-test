'use strick'

const webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlug('jquery.js');

module.exports = {
    //插件项
    plugins:[commonsPlugin],
    // 页面入口文件配置
    entry: {
        page1: "./page1",
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        page2: ["./entry1", "./entry2"]
    },
    //入口文件输出配置
    output: {
        path: 'dist/js/page',
        // 该段代码最终会生成一个 page1.bundle.js 和 page2.bundle.js，并存放到 ./dist/js/page 文件夹下。
        filename:[name].bundle.js
    },
    module: {
         // 加载器 "-loader"其实是可以省略不写的，多个loader之间用“!”连接起来。
         // 注意所有的加载器都需要通过 npm 来加载
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            //.js 文件使用 jsx-loader 来编译处理
            {test: /\.js$/, loader: 'jsx-loade?harmony'},
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            // 配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式（其实应该说超过8kb的才使用 url-loader 来映射到文件，否则转为data url形式）。
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其他解决方案
    resolve: {
        //查找module的话从这里开始查找
        root: 'E:/github/flux-example/src', // 绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            //后续直接 require('AppStore') 即可
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
};

