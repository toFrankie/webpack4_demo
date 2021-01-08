/**
 * Created by 小敏哥 on 2017/11/27.
 * 此处提供通用的fetch访问接口
 */
import ReModal from '../components/reModal'

require('isomorphic-fetch')
let tokenState = 0

class ApiHelper {
  constructor() {
    // this.baseApiUrl = window.location.host.indexOf('emsc.cx580.com') > -1 ? window.location.protocol + '//' + window.location.host + '/' : 'http://14.23.146.234:7000/' // 测试地址 http://192.168.11.38:8888/，此地址修改后不要上传
    this.baseApiUrl = this._getBaseApiUrl()
  }

  // 根据不同环境自动获取api访问根地址
  _getBaseApiUrl() {
    console.log(process.env.NODE_ENV)
    console.log(process.env.apiUrl)
    let isLocal = process.env.NODE_ENV === 'development'
    if (isLocal) {
      return process.env.apiUrl ? process.env.apiUrl : 'http://14.23.146.234:7000/'
    } else {
      return window.location.host.indexOf('emsc.cx580.com') > -1 ? window.location.protocol + '//' + window.location.host + '/' : 'http://14.23.146.234:7000/'
    }
  }

  /**
   * 获取 HTTP 头
   */
  _getHeaders() {
    return {
      Accept: '*/*'
      // "Accept": "application/json",
      // "authorization": "Basic Y3h5aW06Y3g1ODBjeDU4MGN4NTgws",
    }
  }

  /**
   * 将键值对转为URL参数
   */
  _toQueryPair(key, value) {
    // /<summary>将键值对转为URL参数</summary>
    if (typeof value == 'undefined') {
      return key
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value))
    // return key + '=' + (value == null ? '' : String(value));
  }

  /**
   * 将对象转为URL参数
   */
  toQueryString(obj) {
    let ret = []
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        key = encodeURIComponent(key)
        let values = obj[key]
        if (values && values.constructor === Array) {
          // 数组
          let queryValues = []
          for (let i = 0, len = values.length, value; i < len; i++) {
            value = values[i]
            queryValues.push(this._toQueryPair(key + '[' + i + ']', value))
          }
          ret = ret.concat(queryValues)
        } else {
          // 字符串
          ret.push(this._toQueryPair(key, values))
        }
      }
    }
    return ret.join('&')
  }

  /**
   * 封装fetch
   */
  fetch(requestParam) {
    let setTimeNum = 0 // 默认延迟250毫秒请求数据 兼容APP处理

    let resolveId = -1
    let rejectId = -1
    let requestHeader = {}
    let request
    let promise = new Promise((resolve, reject) => {
      // 用于支付宝 不需要延迟请求
      resolveId = setTimeout(() => {
        requestParam.data.method = requestParam.data.method || 'get'
        requestParam.data.headers = requestParam.data.headers || {}
        requestParam.data.mode = 'cors'
        requestParam.data.credentials = 'include'
        Object.assign(requestParam.data.headers, this._getHeaders())

        requestParam.data.body = requestParam.data.body || {}
        // 此处增加FormData格式提交的兼容,fordata提交不自定义请求头，且不对数据进行序列化
        if (requestParam.data.body.constructor.name != 'FormData') {
          if (requestParam.data.method.trim().toLowerCase() == 'post') {
            requestParam.data.headers['Content-Type'] = 'application/x-www-form-urlencoded'
          }
          requestParam.data.body = this.toQueryString(requestParam.data.body)
          requestHeader = { headers: requestParam.data.headers }
        }

        // get请求不能有body,否则会报错
        if (requestParam.data.method.trim().toLowerCase() == 'get') {
          request = new Request(requestParam.url + '?' + requestParam.data.body, {
            credentials: 'include',
            mode: 'cors'
          })
        } else {
          request = new Request(requestParam.url, requestParam.data)
        }
        let result = window
          .fetch(request, requestHeader)
          .then(function (response) {
            let resp = response.json()
            resp.then(function (data) {
              if (data.code == 4006 || data.code == 4003) {
                if (tokenState == 0) {
                  tokenState = 1
                  ReModal.alert('页面信息超时，请退出当前页面再重新打开')
                }
              }
            })
            clearTimeout(rejectId)
            return resp
          })
          .catch(function (e) {
            clearTimeout(rejectId)
            console.error('fetch 请求出错了')
            console.dir(e)
            // throw e; //使用saga后 这里不能抛错误，应该把错误信息返回给对应的接口，让接口自行处理
            return e
          })

        resolve(result)
      }, setTimeNum)

      // 网络超时
      rejectId = setTimeout(() => {
        clearTimeout(resolveId)
        console.error('网络错误')
        reject(new Error('网络错误'))
      }, 30000)
    })
    return promise
  }
}

// 实例化后再导出
export default new ApiHelper()
