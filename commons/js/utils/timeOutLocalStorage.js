/**
 * Created by 小敏哥 on 2017/6/20.
 */

// 此类对localStorage做了简单封装，实现存放的值自动过期的功能
class TimeOutLocalStorage {
  /* 存值
    key:键
    * value:存放的值
    * exp:键值对存放时长，单位毫秒
    * */
  setItem(key, value, exp) {
    var curTime = new Date().getTime()
    localStorage.setItem(key, JSON.stringify({ data: value, time: curTime, exp: exp }))
  }

  // 通过key值取值
  getItem(key) {
    var data = localStorage.getItem(key)
    try {
      if (data !== null) {
        let dataObj = JSON.parse(data)
        if (new Date().getTime() - dataObj.time > dataObj.exp) {
          // 过期键值对自动销毁
          localStorage.removeItem(key)
          return null
        } else {
          return dataObj.data
        }
      }
      return null
    } catch (e) {
      // JSON.parse转换失败时证明不是系统本身存放的定时缓存，直接不予获取
      return null
    }
  }
}

export default new TimeOutLocalStorage()
