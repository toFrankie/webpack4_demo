module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('autoprefixer'),
    require('postcss-pxtorem')({
      rootValue: 100, // 如 100rpx => 1rem
      propWhiteList: [],
      minPixelValue: 2
    })
  ]
}
