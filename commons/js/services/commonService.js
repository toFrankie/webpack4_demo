/**
 * Created by 小敏哥 on 2017/11/27.
 * 此处对get和post请求做了简单的封装，如有新的请求方式可继续增加
 */
import apiHelper from './apiHelper'

class CommonService {
  get(data, url) {
    let requestParam = {
      url: `${apiHelper.baseApiUrl}${url}`,
      data: {
        method: 'get',
        body: data
      }
    }
    return apiHelper.fetch(requestParam)
  }

  post(data, url) {
    let requestParam = {
      url: `${apiHelper.baseApiUrl}${url}`,
      data: {
        method: 'post',
        body: data
      }
    }
    return apiHelper.fetch(requestParam)
  }
}

export default new CommonService()
