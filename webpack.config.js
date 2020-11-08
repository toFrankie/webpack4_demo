const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const ESLintPlugin = require('eslint-webpack-plugin')

const config = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // 生产：cheap-module-source-map
  entry: ['react-hot-loader/patch', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js', // 入口文件打包名称
    chunkFilename: '[chunkhash].bundle.js' // 非入口文件但参与构建
  },
  devServer: {
    // contentBase只和我们的静态资源相关也就是图片，数据等，
    // 需要和output.publicPath和output.path做一个区分。
    // 后面两者指定的是我们打包出文件存放的路径，output.path是我们实际的存放路径，设置的output.publicPath会在我们打包出的html用以替换path路径，但是它所指向的也是我们的output.path打包的文件。
    // contentBase主要是指定静态资源的根目录的，意思就是不受webpack控制的资源文件。视频中的案例并没有涉及到这种文件，所以加与不加都可以的。如果涉及到了非webpack受控的资源文件就需要指定这个contentBase字段了。
    // contentBase: path.resolve(__dirname, 'dist'),
    // contentBase: false,
    // publicPath: '/', // 确保 devServer.publicPath 总是以斜杠(/)开头和结尾。
    hot: true, // 启用 webpack 的 HMR 功能。需要注意的是，要完全启用 HMR，需要 webpack.HotModuleReplacementPlugin
    open: true,
    port: 8081,
    inline: true // 默认值 true，选择 iframe 模式的话，设置为 false。
  },
  optimization: {
    // 告知 webpack 使用可读取模块标识符，来帮助更好地调试，开发模式默认开启。简单地说，禁用时看到的是一个数字 id，而不是一个包括路径的具体模块名称
    namedModules: true
  },
  plugins: [
    // new ESLintPlugin({
    //   fix: true
    // }),

    // 创建 HTML 文件
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
    // 如果使用 --hot 选项启动 webpack 或 webpack-dev-server，该插件将自动添加，此时你可能不需要将其添加到 webpack.config.js 中。
    new webpack.HotModuleReplacementPlugin(),

    // 允许在编译时(compile time)配置的全局常量
    new webpack.DefinePlugin({
      // PRODUCTION: JSON.stringify(true),
      // 注意，因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。通常，有两种方式来达到这个效果，使用 '"production"', 或者使用 JSON.stringify('production')。
      // 'process.env.NODE_ENV': JSON.stringify('development') // '"development"'
    })
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
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        enforce: 'pre', // 确保要比 babel-loader 执行，因为 eslint-loader 要检测的是 babel 之前的代码
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'eslint-loader',
        options: {
          fix: true, // 启用 ESLint autofix 自动修复，注意此选项将更改源文件。
          cache: true
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|gif|jpg|jpeg|bmp|webp)$/i,
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: '[name].[ext]'
        }
      }
    ]
  }
}

module.exports = config
