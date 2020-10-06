class UserHelper {
  // 延迟函数
  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  // 获取数据
  fetchData(status) {
    return new Promise((resolve, reject) => {
      const response = { status: 'success', response: { name: 'Frankie', age: 20 } }
      const error = { status: 'error', error: 'oops' }
      status ? resolve(response) : reject(error)
    })
  }

  // 请求用户数据（异步场景）
  async getUser(data) {
    try {
      const res = await this.fetchData(data)
      await this.delay(2000)
      return res
    } catch (e) {
      await this.delay(1000)
      throw e
    }
  }
}

export default new UserHelper()
