/**
 * 图片共用资源配置，比如共用组件的图片
 */

const resProduction = window.location.host.indexOf('emsc.cx580.com') > -1 && window.location.href.indexOf('index.html') > -1 // 前端静态资源是否为生产环境

export default {
  resourceUrl: resProduction ? 'https://yzres.cx580.com/h5resource/pro/public/' : 'https://yzres.cx580.com/h5resource/test/public/'
}
