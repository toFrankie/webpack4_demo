module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer'),
    require('postcss-pxtorem')({
      rootValue: 100, // 如 100rpx => 1rem
      propWhiteList: [],
      minPixelValue: 2
    })
  ]
}
