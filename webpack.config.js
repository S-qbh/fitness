/**
 * webpack配置文件
 * 
 */


// 导入npm获取路径的包
const path = require('path');
// 导入html打包的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 导入 提取js中的代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 将css文件进行压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

//自动清除dist 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 导出
module.exports = {
    // 入口
    entry: {
        // 引入公共css
        commonCSS: './src/js/commonCSS.js',
        // 引入公共js文件
        // 预加载
        dom: './src/js/common/dom.js',
        // ajax请求
        http: './src/js/common/http.js',
        // 公共js
        utils: './src/js/common/utils.js',
        // 三方插件
        // 验证码(注册)
        captcha: './src/lib/captcha/captcha-mini.js',
        swiper: './src/lib/swiper/swiper-bundle.js',
        weui: './src/lib/weui/weui.js',



        // 一个页面对应一个入口
        //首页
        home: './src/js/home.js',
        //注册页
        register: './src/js/register.js',
        // 广告页
        advertisement: './src/js/advertisement.js',
        // 登录页
        login: './src/js/login.js',
        // 个人中心
        personal: './src/js/personal.js',
        // 运动页
        sports: './src/js/sports.js',
        // 用户信息页
        userInfo: './src/js/userInfo.js',
        // 运动数据页
        sportsData: './src/js/sportsData.js',
        // 课程介绍页
        course: './src/js/course.js',
        // 课程详情页
        details: './src/js/details.js'

    },

    // 出口
    output: {
        // 文件路径
        path: path.resolve(__dirname, 'dist'),
        // 文件名
        filename: './js/[name].js',
        // 设置静态资源请求的相对路径
        publicPath: './'
    },
    // 解释器
    module: {
        rules: [
            // 以什么格式的解释器解释文件
            {
                test: /\.css$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader']
            },
            // 适配less
            {
                test: /\.less$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader', 'less-loader']
            },
            // 适配css中的图片
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',//只有一个参数时使用loader+字符串形式
                // 配置
                options: {
                    // 文件名 hash默认32位，可以设置长度
                    name: '[hash:10].[ext]',
                    // 小于20kb base64压缩 大于20kb不压缩
                    limit: 10 * 1024,
                    esModule: false,//以es6的模块进行打包
                    outputPath: 'img'
                }
            },
            // 适配html中的代码
            { test: /\.html$/, loader: 'html-loader' },
            // 字体图标
            {
                test: /\.(svg|ttf|eot|woff|woff2)$/, loader: 'file-loader',
                options: {
                    outputPath: 'fonts'
                }
            },
            // 打包ES6代码为ES5
            {
                test: /\.js$/,//匹配js文件
                loader: 'babel-loader',//编译ES6为ES5
                exclude: /node_modules/ //排除三方包中的ES6代码
            }

        ]
    },
    //插件
    plugins: [
        // 引入插件
        // home页
        new HtmlWebpackPlugin({
            template: "./src/page/home.html",//引用文件
            filename: 'home.html',//输出名字
            // 应用的模块home.js,和入口处的home.js绑定
            chunks: ['home', 'commonCSS', 'dom', 'http', 'utils', 'swiper']
        }),
        // register注册页
        new HtmlWebpackPlugin({
            template: "./src/page/register.html",
            filename: 'register.html',
            chunks: ['register', 'commonCSS', 'dom', 'http', 'captcha', 'utils']
        }),
        // 广告页
        new HtmlWebpackPlugin({
            template: "./src/page/advertisement.html",
            filename: 'advertisement.html',
            chunks: ['advertisement', 'commonCSS', 'dom']
        }),
        // login登录页
        new HtmlWebpackPlugin({
            template: "./src/page/login.html",
            filename: 'login.html',
            chunks: ['login', 'commonCSS', 'dom', 'http', 'utils']
        }),
        // 个人中心
        new HtmlWebpackPlugin({
            template: './src/page/personal.html',
            filename: 'personal.html',
            chunks: ['personal', 'commonCSS', 'dom', 'http', 'utils']
        }),
        // 运动
        // 个人中心
        new HtmlWebpackPlugin({
            template: './src/page/sports.html',
            filename: 'sports.html',
            chunks: ['sports', 'commonCSS', 'dom', 'http', 'utils']
        }),
        // 用户详细信息
        new HtmlWebpackPlugin({
            template: './src/page/userInfo.html',
            filename: 'userInfo.html',
            chunks: ['userInfo', 'commonCSS', 'dom', 'http', 'utils', 'weui']
        }),
        // 运动数据页
        new HtmlWebpackPlugin({
            template: './src/page/sportsData.html',
            filename: 'sportsData.html',
            chunks: ['sportsData', 'commonCSS', 'dom', 'http', 'utils']
        }),
        // 课程展示页
        new HtmlWebpackPlugin({
            template: './src/page/course.html',
            filename: 'course.html',
            chunks: ['course', 'commonCSS', 'dom', 'http', 'utils']
        }),
        // 课程详情页
        new HtmlWebpackPlugin({
            template: './src/page/details.html',
            filename: 'details.html',
            chunks: ['details', 'commonCSS', 'dom', 'http', 'utils']
        }),

        new MiniCssExtractPlugin({
            // 设置文件名及路径[name]跟随主模块的名字
            filename: 'css/[name].css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        //plugin 添加
        new CleanWebpackPlugin()
    ],
    // 环境
    mode: process.env.NODE_ENV,



    // 开发服务器 配置【】
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 8081,  // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'advertisement.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器
}