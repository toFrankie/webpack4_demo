/**
 * Created by 小敏哥 on 2017/4/25.
 */
class TypeOfBrowser {
  // 通过userAgent识别浏览器所在的渠道,仅识别渠道，不识别特定浏览器
  getChannelOfBrowser() {
    let channel = ''
    // 支付宝
    if (navigator.userAgent.indexOf('AlipayClient') !== -1) {
      channel = 'aliPay'
    }
    // app
    else if (navigator.userAgent.indexOf('appname_cxycwz') > -1) {
      channel = 'app'
    } else if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
      channel = 'weixin'
    } else if (navigator.userAgent.indexOf('QQ') > -1) {
      channel = 'qq'
    } else {
      channel = 'unKnown'
    }
    return channel
  }

  // 通过url识别到特定的细分渠道
  getDetailChannelOfBrowser() {}
}
export default new TypeOfBrowser()
