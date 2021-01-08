/**
 * Created by 小敏哥 on 2017/7/7.
 */
import React, { Component } from 'react'
import style from './index.scss'
class ReAlert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'alert', // 弹框类型
      show: false, // 弹框是否显示
      text: '', // 主体提示文字
      ok: null, // 确定按钮回调
      cancel: null, // 取消按钮回调
      component: null, // 传入组件
      maskClose: false, // 点击蒙层是否关闭
      okText: '确定', // 确定按钮文字
      cancelText: '取消' // 取消按钮文字
    }
    ReAlert.alert = ReAlert.alert.bind(this)
    ReAlert.confirm = ReAlert.confirm.bind(this)
    ReAlert.close = ReAlert.close.bind(this)
    ReAlert.showComponent = ReAlert.showComponent.bind(this)
    ReAlert.showOnlyComponent = ReAlert.showOnlyComponent.bind(this)
    this.close = this.close.bind(this)
    this.ok = this.ok.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  flexStyle() {
    return this.state.show ? style.flexContainer : style.flexContainer + ' ' + style.slowHide
  }

  // 蒙层样式
  maskStyle() {
    return this.state.show ? style.mask : style.mask + ' ' + style.hide
  }

  // 弹框样式
  alertStyle() {
    // return this.state.show ? style.alertContainer : style.alertContainer + ' ' + style.slowHide;
    // onlyComponent时，隐藏所有边框样式
    return this.state.type == 'onlyComponent' ? style.alertContainer + ' ' + style.noBorder : style.alertContainer
  }

  // 静态方法，单纯输出框
  static alert(text, okCallBack, config) {
    this.setState({
      type: 'alert',
      show: true,
      text: text,
      maskClose: false,
      ok: okCallBack,
      okText: config && config.okText ? config.okText : '确定'
    })
  }

  // 静态方法，确定取消按钮输出框
  // eslint-disable-next-line max-params
  static confirm(text, okCallBack, cancelCallBack, config) {
    this.setState({
      type: 'confirm',
      show: true,
      text: text,
      maskClose: false,
      ok: okCallBack,
      cancel: cancelCallBack,
      okText: config && config.okText ? config.okText : '确定',
      cancelText: config && config.cancelText ? config.cancelText : '取消'
    })
  }

  // 静态方法，展示特定的组件，不包含底部按钮，包含右上角关闭按钮
  static showComponent(component) {
    this.setState({
      type: 'component',
      show: true,
      maskClose: false,
      component: component
    })
  }

  // 完全空白的弹窗，不包含右上角关闭按钮
  static showOnlyComponent(component) {
    this.setState({
      type: 'onlyComponent',
      show: true,
      component: component,
      maskClose: true
    })
  }

  // 静态方法，关闭
  static close() {
    this.setState({
      show: false
    })
  }

  // 关闭
  close() {
    this.setState({
      show: false
    })
  }

  // 取消
  cancel() {
    this.close()
    this.state.cancel && this.state.cancel()
  }

  // 确定
  ok() {
    this.close()
    this.state.ok && this.state.ok()
  }

  // 窗体整体点击
  contentClick(e) {
    // 停止冒泡到底层，防止点击弹框主体关闭窗体
    e.stopPropagation()
  }

  getAlertContent() {
    if (typeof this.state.text == 'string') {
      return style.content + ' ' + style.alertContent
    } else {
      return style.content
    }
  }

  // 根据类型渲染不同的内容
  renderContentByType() {
    switch (this.state.type) {
      case 'confirm':
        return (
          <div>
            <div className={this.getAlertContent()}>{this.state.text}</div>
            <div className={style.buttonContainer}>
              <button className={style.cancel} onClick={this.cancel}>
                {this.state.cancelText}
              </button>
              <button className={style.ok} onClick={this.ok}>
                {this.state.okText}
              </button>
            </div>
          </div>
        )
      case 'alert':
        return (
          <div>
            <div className={this.getAlertContent()}>{this.state.text}</div>
            <div className={style.buttonContainer}>
              <button className={style.singleButton} onClick={this.ok}>
                {this.state.okText}
              </button>
            </div>
          </div>
        )
      case 'component':
      case 'onlyComponent':
        return <div>{this.state.component}</div>
    }
  }

  componentDidMount() {
    // 页面切换时删除弹框
    window.addEventListener(
      'popstate',
      function (e) {
        ReAlert.close && ReAlert.close()
      },
      false
    )
  }

  // 渲染关闭按钮
  renderCloseContainer() {
    return this.state.type != 'onlyComponent' ? (
      <div className={style.closeContainer}>
        <button className={style.close} onClick={this.cancel} />
      </div>
    ) : (
      ''
    )
  }

  // 蒙层点击关闭
  maskClick() {
    this.state.maskClose && this.close()
  }

  render() {
    return (
      <div>
        <div
          className={this.flexStyle()}
          onClick={() => {
            this.maskClick()
          }}
        >
          <div ref="alert" className={this.alertStyle()} onClick={this.contentClick}>
            {this.renderCloseContainer()}
            {this.renderContentByType()}
          </div>
        </div>

        <div className={this.maskStyle()} />
      </div>
    )
  }
}

export default ReAlert
