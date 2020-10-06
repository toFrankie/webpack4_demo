const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: ['react-hot-loader/patch', './src/js/index.js'],
  devServer: {
    contentBase: './dist',
    hot: true, // 启用 webpack 的 HMR 功能。需要注意的是，要完全启用 HMR，需要 webpack.HotModuleReplacementPlugin
    open: true
  },
  optimization: {
    // 告知 webpack 使用可读取模块标识符，来帮助更好地调试，开发模式默认开启。简单地说，禁用时看到的是一个数字 id，而不是一个包括路径的具体模块名称
    namedModules: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '开发环境', // 模板要使用 <title><%= htmlWebpackPlugin.options.title %></title> 配置才生效
      template: './src/index.html', // 模板路径
      filename: 'index.html', // 输出 HTML 文件名称
      inject: 'body', // 插入的 script 标签位于 body 底部，true 同理
      hash: true, // 加上 hash 值
      favicon: './src/favicon.ico'
    }),
    // 新版无需再指定删除目录，默认删除 output 的目录
    new CleanWebpackPlugin(),
    // 通过它启用 HMR 之后，它的接口将被暴露在 module.hot 属性下面
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}

module.exports = config
