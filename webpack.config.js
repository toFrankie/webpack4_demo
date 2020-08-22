const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    index: path.resolve(__dirname, './src/index.js')
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    open: true
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
    // 新版无需再指定删除目录，默认删除 output 目录
    new CleanWebpackPlugin(),
    // 热更新
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}

module.exports = config