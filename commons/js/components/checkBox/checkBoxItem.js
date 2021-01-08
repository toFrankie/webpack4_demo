/**
 * Created by 小敏哥 on 2017/6/21.
 */
import React, { Component } from 'react'
import style from './checkBoxItem.scss'

class CheckBoxItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: props.checked ? props.checked : false
    }
    this.changeCheckState = this.changeCheckState.bind(this)
  }

  static propTypes = {
    checked: React.PropTypes.bool, // 是否默认选中
    type: React.PropTypes.string, // 按钮类型，check点击完可取消，radio二次点击不取消
    text: React.PropTypes.string, // 按钮文字
    className: React.PropTypes.string, // 从父控件传过来的主样式，可覆盖
    checkedCallBack: React.PropTypes.func, // 点击后回调
    forceChecked: React.PropTypes.bool, // 提供一个从外部控制是否选中的入口，优先级最高
    enable: React.PropTypes.bool // 该checkbox是否可用，false时灰置按钮
  }

  // 修改选中状态
  changeCheckState() {
    if (this.props.enable) {
      let value = this.props.type == 'radio' ? true : !this.state.checked
      this.setState({
        checked: value
      })
      this.props.checkedCallBack(value)
    }
  }

  // 根据点击状态渲染不同的样式
  getCheckStyleByState() {
    if (this.props.enable) {
      let checked = this.props.forceChecked != undefined ? this.props.forceChecked : this.state.checked
      return checked ? style.checkIcon + ' ' + style.checked : style.checkIcon
    } else {
      return style.checkIcon + ' ' + style.unable
    }
  }

  render() {
    return (
      <div className={this.props.className + ' ' + style.CheckBoxItem} onClick={this.changeCheckState}>
        <div className={this.getCheckStyleByState()} />
        {this.props.text ? <div className={style.text}>{this.props.text}</div> : ''}
      </div>
    )
  }
}

CheckBoxItem.defaultProps = {
  enable: true
}

export default CheckBoxItem
