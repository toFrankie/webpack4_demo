const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hi', // 模板要使用 <title><%= htmlWebpackPlugin.options.title %></title> 配置才生效
      template: './src/index.html', // 模板路径
      filename: 'index.html', // 输出 HTML 文件名称
      inject: 'body', // 插入的 script 标签位于 body 底部，true 同理
      hash: true, // 加上 hash 值
      favicon: './src/favicon.ico'
    })
  ]
}

module.exports = config