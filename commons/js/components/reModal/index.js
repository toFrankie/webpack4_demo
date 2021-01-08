/**
 * Created by 小敏哥 on 2017/7/7.
 * 此处提供一个通用的弹框
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import ReAlert from './reAlert'
class ReModal {
  constructor() {
    if (!document.getElementById('home_blank')) {
      let div = document.createElement('div')
      div.id = 'home_blank'
      document.body.appendChild(div)
    }
    render(<ReAlert />, document.getElementById('home_blank'))
  }
  /**
   * text:显示文字
   * okCallBack：确认回调,可选
   * config：相关配置信息（okText：确认按钮文字）,可选
   */
  alert(text, okCallBack, config) {
    ReAlert.alert(text, okCallBack, config)
  }

  /**
   * @param {*} text 显示文字
   * @param {*} okCallBack 确认回调,可选
   * @param {*} cancelCallBack 取消回调,可选
   * @param {*} config 相关配置信息（okText：确认按钮文字,cancelText：取消按钮文字）,可选
   */
  // eslint-disable-next-line max-params
  confirm(text, okCallBack, cancelCallBack, config) {
    ReAlert.confirm(text, okCallBack, cancelCallBack, config)
  }

  // 展示组件
  showComponent(component) {
    ReAlert.showComponent(component)
  }

  // 无边框展示组件，无右上角关闭按钮
  showOnlyComponent(component) {
    ReAlert.showOnlyComponent(component)
  }

  // 关闭
  close() {
    ReAlert.close()
  }
}

export default new ReModal()
