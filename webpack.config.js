const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const ESLintPlugin = require('eslint-webpack-plugin')

const config = {
  target: 'web',
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
    contentBase: false,
    publicPath: '/',
    hot: true, // 启用 webpack 的 HMR 功能。需要注意的是，要完全启用 HMR，需要 webpack.HotModuleReplacementPlugin
    open: true,
    host: '0.0.0.0',
    // inline: true, // 默认值 true，选择 iframe 模式的话，设置为 false。
    useLocalIp: true,
    compress: true, // 启用 gzip 压缩
    proxy: {
      'http://192.168.1.100:8080/': {
        // target: 'https://test-emsc.cx580.com',
        target: 'http://192.168.1.100:3001',
        // pathRewrite: { '^/api': '' },
        // secure: false,
        changeOrigin: true
      }
    }
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
      'process.env.NODE_ENV': JSON.stringify('development') // '"development"'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@js': path.resolve(__dirname, 'src/js'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@images': path.resolve(__dirname, 'src/images'),
      app: path.resolve(__dirname, 'commons/js'),
      style: path.resolve(__dirname, 'commons/styles'),
      'react-dom': '@hot-loader/react-dom'
    }
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader'
      },
      {
        test: /\.js|jsx$/,
        enforce: 'pre', // 确保要比 babel-loader 执行，因为 eslint-loader 要检测的是 babel 之前的代码
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'eslint-loader',
        options: {
          fix: true, // 启用 ESLint autofix 自动修复，注意此选项将更改源文件。
          cache: true
        }
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true, // 启用/禁用 url() 处理
              import: false, // 启用/禁用 url() 处理
              modules: {
                mode: 'local', // local / global
                localIdentName: '[local]-[hash:5]' // 通过 [local] 只取css命名，实现公用样式的效果
              },
              localsConvention: 'camelCase', // Only dashes in class names will be camelized
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        // antd-mobile
        test: /\.less$/,
        include: path.resolve(__dirname, 'node_modules/antd-mobile'),
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        // Ant-Design 是一套设计语言，所以 antd 会引入一套 fork 自 normalize.css 的浏览器默认样式重置库。
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
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
