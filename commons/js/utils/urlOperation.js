/**
 * Created by zhangqiang on 2017/5/5.
 */
class UrlOperation {
  constructor() {
    this.urlInformation = {
      protocol: window.location.protocol, // 协议
      host: window.location.host, // 主机部分
      port: window.location.port, // 端口
      pathname: window.location.pathname, // 文件地址
      search: window.location.search // 问号以及之后的地址
    }
  }

  // 获取链接参数，返回对象
  getParameters() {
    let parameters = this.urlInformation.search.replace('?', '').replace('/', '')
    let parameterArray = parameters.split('&')
    let parameterResult = {}
    for (let i = 0; i < parameterArray.length; i++) {
      let result = parameterArray[i].split('=')
      parameterResult[result[0]] = result[1]
    }
    return parameterResult
  }

  // 取得某个url参数 /#/在前面
  getUrlParam(name, url) {
    /*    return urlOperation.getParameters()[name]; */
    if (!window.location.href.split('?')[1]) {
      return false
    }
    let urlSearch = '?' + window.location.href.split('?')[1].split('/#/')[0]
    let search = url || urlSearch.substr(1)

    if (search != '') {
      let re = new RegExp('(^|&|\\?)' + name + '=([^&]*)($|&)')
      let arr = search.match(re)
      if (arr !== null) {
        return decodeURI(arr[2])
      }
    }
    return ''
  }
}

export default UrlOperation
