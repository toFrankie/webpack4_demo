/**
 * Created by 小敏哥 on 2017/11/27.
 * 此处对基于thunk的get和post请求做了简单的封装
 */

import commonService from '../services/commonService'
import { Toast } from 'antd-mobile'

class CommonAction {
  /**
   * GET 请求
   *
   * @param {*} data 传入参数
   * @param {*} apiUrl 请求url
   * @param {*} dataAction 最终回调函数
   * @param {*} callBack 请求完成后修改数据的action
   */
  // eslint-disable-next-line max-params
  simpleGet(data, apiUrl, dataAction, callBack) {
    return (dispatch, getState) => {
      Toast.hide()
      Toast.loading('', 30, () => Toast.info('网络错误', 2))
      commonService
        .get(data, apiUrl)
        .then(resultData => {
          Toast.hide()
          if (resultData.code == '1000') {
            dataAction && dispatch(dataAction(resultData.body))
            callBack && callBack(resultData.body)
          } else {
            Toast.info(resultData.msg ? resultData.msg : '网络错误', 2)
          }
        })
        .catch(e => {
          Toast.info('网络错误', 2)
          throw e
        })
    }
  }

  /**
   * POST 请求
   *
   * @param {*} data 传入参数
   * @param {*} apiUrl 请求url
   * @param {*} dataAction 请求完成后修改数据的action
   * @param {*} callBack 最终回调函数
   */
  // eslint-disable-next-line max-params
  simplePost(data, apiUrl, dataAction, callBack) {
    return (dispatch, getState) => {
      Toast.hide()
      Toast.loading('', 30, () => Toast.info('网络错误', 2))
      commonService.post(data, apiUrl).then(resultData => {
        Toast.hide()

        if (resultData.code == '1000') {
          dataAction && dispatch(dataAction(resultData.body || resultData.data))
          callBack && callBack(resultData.body || resultData.data)
        } else {
          // alert(JSON.stringify(resultData))
          Toast.info(resultData.msg ? resultData.msg : '网络错误', 2)
        }
      })
    }
  }
}

export default new CommonAction()
