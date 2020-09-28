module.exports = {
  extends: [
    'alloy',
  ],
  plugins: [
    // 插件名称可以省略 'eslint-plugin-' 前缀，比如 'eslint-plugin-prettier' 可以简写为 'prettier'
    //
    // 'prettier'
  ],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则
    //
    // 'off' 或 0 - 关闭规则
    // 'warn' 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    // 'error' 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  },
}
