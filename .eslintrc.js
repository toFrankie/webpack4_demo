module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'alloy',
    'alloy/react' // eslint-config-alloy/react
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true // 启用 JSX
    }
  },
  settings: {
    react: {
      version: 'detect' // 自动选择你已安装的版本
    }
  },
  // 插件名称可以省略 eslint-plugin- 前缀。
  plugins: [],
  // 环境变量（包含多个预定义的全局变量）
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true
  },
  // 全局变量（设置为 false 表示它不允许被重新赋值）
  globals: {},
  // 自定义规则
  rules: {
    'react/prop-types': [0],
    'default-case-last': 0,
    'no-unused-vars': 0,
    'no-var': 0,
    'no-irregular-whitespace': 0,
    'use-isnan': 2,
    'no-alert': 2,
    'no-eval': 2,
    'spaced-comment': 2,
    'react/self-closing-comp': 0,
    indent: ['error', 2, { SwitchCase: 1 }]
  }
}
