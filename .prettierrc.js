/**
 * 参考：https://prettier.io/docs/en/options.html
 */
module.exports = {
  // 与 ESLint 整合
  // eslintIntegration: false,
  // 一行最多 160 字符
  printWidth: 160,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾不需要有分号
  semi: false,
  // 使用单引号（JSX 引号会忽略此选项）
  singleQuote: true,
  // JSX 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // 末尾不需要逗号
  trailingComma: 'none',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // JSX 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，不需要括号
  arrowParens: 'avoid',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 HTML 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // Vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  overrides: [
    {
      files: ['*.wxss', '*.acss'],
      options: {
        parser: 'css'
      }
    }
    // 类似地，如果有需要的话，亦可将 JavaScript 文件使用 flow 来代替默认的 babel 解析器。
    // {
    //   files: '*.js',
    //   options: {
    //     parser: 'flow'
    //   }
    // }
  ]
}
