class Common {
  // 清除ant弹框
  closeAliModal() {
    let div = document.querySelector('.am-modal-wrap')
    if (div) {
      div = div.parentNode
      if (div) {
        div.style.display = 'none'
      }
    }
  }

  /**
   *
   * @param timestamp  一般是时间戳
   * @param fmt 默认格式为 yyyy-MM-dd hh:mm:ss
   * @returns {*}
   */
  format(timestamp, fmt = 'yyyy-MM-dd hh:mm:ss') {
    // 时间格式化
    if (!timestamp || typeof timestamp !== 'number') return timestamp

    let millisecs = timestamp.toString().length == 10 ? timestamp * 1000 : timestamp
    let time_obj = new Date(millisecs) // 参数是 时间戳转换的毫秒
    let o = {
      'M+': time_obj.getMonth() + 1, // 月份
      'd+': time_obj.getDate(), // 日
      'h+': time_obj.getHours(), // 小时
      'm+': time_obj.getMinutes(), // 分
      's+': time_obj.getSeconds(), // 秒
      'q+': Math.floor((time_obj.getMonth() + 3) / 3), // 季度
      S: time_obj.getMilliseconds() // 毫秒
    }

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, String(time_obj.getFullYear()).substr(4 - RegExp.$1.length))
    for (let k in o)
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(String(o[k]).length))
    return fmt
  }

  /**
   * 获取网址
   */
  getUrl() {
    let urlOfNow = window.location.href
    let baseUrl = urlOfNow.replace(window.location.hash, '')
    return baseUrl + '#/' // react项目的路径
  }

  /**
   * 获取userType
   */
  getUserType() {
    var userType = ''
    var ua = navigator.userAgent
    if (ua.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
      userType = 'weixin'
    } else if (ua.indexOf('cxy') !== -1) {
      userType = 'app'
    } else if (ua.indexOf('AlipayClient') !== -1) {
      userType = 'alipay'
    } else if (ua.indexOf('QQ') !== -1) {
      userType = 'qq'
    }
    return userType
  }

  /**
   * 获取当前网址的根路径 返回的数据为：http.../#/
   */
  getRootUrl() {
    let this_url = window.location.href // 当前网址
    let substrNum = this_url.indexOf('#') + 1 // 获取到哈希路由当前的位置 + 1
    let url = this_url.substr(0, substrNum) + '/'
    return url
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
   * 设置浏览器标题 兼容IOS 后退title不修改的bug
   */
  setViewTitle(title) {
    let body = document.getElementsByTagName('body')[0]
    document.title = title
    // if (navigator.userAgent.indexOf("AlipayClient") !== -1) {
    //     AlipayJSBridge.call("setTitle", {
    //         title: title
    //     });
    // }
    let iframe = document.createElement('iframe')
    iframe.setAttribute('src', 'https://yzres.cx580.com/h5resource/pro/public/images/favicon.ico')
    iframe.style.display = 'none'
    iframe.addEventListener('load', function () {
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 10)
    })
    document.body.appendChild(iframe)
  }

  /**
   * 获取安卓系统的版本号 非安卓手机则返回false
   */
  getAndroidVersion() {
    let re = /Android\s([^;]+)/gi
    let _version = re.exec(navigator.userAgent)
    if (_version) {
      _version = _version[1]
    } else {
      _version = false
    }
    return _version
  }

  browser = function () {
    let u = navigator.userAgent
    // app = navigator.appVersion;
    return {
      versions: {
        // 移动终端浏览器版本信息
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // android终端或uc浏览器
      }
    }
  }

  /**
   * 检测当前浏览器是否为iPhone(Safari)
   */
  isIPhone = function () {
    // eslint-disable-next-line no-invalid-this
    let browser = this.browser()
    if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
      return true
    }
    return false
  }

  /**
   * 检测当前浏览器是否为Android(Chrome)
   */
  isAndroid = function () {
    // eslint-disable-next-line no-invalid-this
    let browser = this.browser()
    if (browser.versions.android) {
      return true
    }
    return false
  }

  // 构建时间格式，yyyy-MM-dd hh:mm:ss
  transfromDateTime(dateTime) {
    let date = dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()
    let month = dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1
    let hour = dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()
    let minute = dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes()
    let second = dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds()
    return dateTime.getFullYear() + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  }

  // 构建时间格式，yyyy-MM-dd
  transfromDateTimeYMD(dateTime) {
    console.log(dateTime)
    let date = dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()
    let month = dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1
    return dateTime.getFullYear() + '-' + month + '-' + date
  }

  // 将字符串中间部分隐藏起来
  hideString(str, hideLength) {
    let start = parseInt((str.length - hideLength) / 2, 10) + 1
    let startStr = str.substr(0, start)
    let endStr = str.substr(start + hideLength)
    let hideStr = ''
    for (let i = 0; i < hideLength; i++) {
      hideStr += '*'
    }
    return startStr + hideStr + endStr
  }

  /**
   * 车牌前缀和地址都是东莞则是到付
   * prefix 粤S  cityId 441900
   */
  isToPay(prefix, cityId) {
    // if(prefix == '粤S'&&cityId == 441900){
    //     return true
    // }else{
    return false
    // }
  }

  checkForm(list) {
    let flag = true
    if (!list || (typeof list == 'object' && list.length == 0)) return flag
    let len = list.length
    for (let i = 0; i < len; i++) {
      let item = list[i]
      if (!item.fn(item.value)) {
        flag = false
        break
      }
    }
    return flag
  }

  identityCodeValid(code) {
    if (!code || typeof code !== 'string') return false
    let city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    let tip = ''
    let pass = true

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
      tip = '身份证号格式错误'
      pass = false
    } else if (!city[code.substr(0, 2)]) {
      tip = '地址编码错误'
      pass = false
    } else {
      // 18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('')
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        // 校验位
        let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
        let sum = 0
        let ai = 0
        let wi = 0
        for (let i = 0; i < 17; i++) {
          ai = code[i]
          wi = factor[i]
          sum += ai * wi
        }
        let last = parity[sum % 11]
        if (parity[sum % 11] != code[17]) {
          tip = '校验位错误'
          pass = false
        }
      }
    }
    return pass
  }

  /**
   * 检测是否为邮证app
   * iOS端、Android端 UA 区别较大，通过 cxy 匹配判断
   * @returns {Boolean} true or false
   */
  isYZApp() {
    return navigator.userAgent.indexOf('cxy') > -1 ? true : false
  }
}

// 实例化后再导出
export default new Common()
