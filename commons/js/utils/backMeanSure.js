class BackMeanSure {
  constructor(callBack, key) {
    this.key = key
    // 缓存中存在绑定数据时，先移除函数防止二次绑定
    if (BackMeanSure.callBackList[key]) {
      window.removeEventListener('popstate', BackMeanSure.callBackList[key], false)
    }
    BackMeanSure.callBackList[key] = e => {
      if (e.state && e.state.target == this.key + 'MeanSure') {
        callBack(this.back.bind(this), this.stay.bind(this), this.toUrl.bind(this))
      }
    }
  }

  // 跳转到页面，接受页面地址或者回调函数
  toUrl(url) {
    // 首先跳回顶点，防止多次添加记录
    window.history.pushState({ target: this.key + 'Final' }, '', '')
    if (typeof url == 'string') {
      location.href = url
    } else if (typeof url == 'function') {
      url()
    }
  }

  // 回退到上一级
  back() {
    let backCount = history.state.target == this.key + 'Final' ? -3 : -2
    history.go(backCount)
  }

  // 停留在本级
  stay() {
    history.forward()
  }

  // 绑定事件
  bindBackMeansure() {
    // 此处添加500毫秒延迟，目的是等待历史记录变化之后再添加空地址，使空地址能准确添加到栈顶，防止出错
    setTimeout(() => {
      if (!(history.state && history.state.target == this.key + 'Final')) {
        window.history.pushState({ target: this.key + 'MeanSure', random: Math.random() }, '', '')
        window.history.pushState({ target: this.key + 'Final', random: Math.random() }, '', '')
      }
      window.addEventListener('popstate', BackMeanSure.callBackList[this.key], false)
    }, 500)
  }
}

// 事件队列，用于判断当前事件绑定是否有多次重复
if (!BackMeanSure.callBackList) {
  BackMeanSure.callBackList = {}
}

export default BackMeanSure
