/**
 * 自定义 Switch 组件 (因为 Ant 组件的本身不满足设计要求，且难以控制大小，所以自己写了一个)
 *
 * 支持禁用、自定义颜色
 * <MySwitch disabled checked={true} checkColor="#00b488" uncheckColor="#d8d8d8" onChange={() => {}} />
 */
import React, { Component } from 'react'
import style from './index.scss'
const PropTypes = React.PropTypes

class MySwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curStatus: typeof props.checked !== 'undefined' ? props.checked : false
    }
  }

  componentDidUpdate() {
    if (this.props.checked != this.state.curStatus) {
      this.setState({ curStatus: !!this.props.checked })
    }
  }

  static propTypes = {
    checked: PropTypes.oneOfType([
      // 状态，布尔型或者 0 和 1
      PropTypes.bool,
      PropTypes.number
    ]),
    onChange: PropTypes.func, // 切换事件
    checkColor: PropTypes.string, // 选中时背景颜色，默认 #00b488
    uncheckColor: PropTypes.string, // 未选时组件颜色，默认 #d8d8d8
    disabled: PropTypes.bool // 是否禁用
  }

  /**
   * 返回 Boolean 类型
   */
  toggleCheck(status) {
    if (this.props.disabled) return
    this.setState({ curStatus: !status })
    this.props.onChange && this.props.onChange(!status)
  }

  render() {
    let { curStatus } = this.state
    let { checkColor, uncheckColor, disabled } = this.props

    // switch 整体样式
    let switchBoxClass = curStatus ? style.checked : style.unchecked

    // switch 背景样式
    let checkStyle = curStatus && checkColor ? { background: checkColor } : !curStatus && uncheckColor ? { background: uncheckColor } : {}

    // 禁用组件是，设置透明度 80%
    let mySwitchStyle = disabled ? { opacity: '0.6' } : {}

    // 根据状态设置小按钮位置
    let toggleStyle =
      curStatus && !disabled
        ? { left: '.48rem' }
        : curStatus && disabled
        ? { left: '.48rem', opacity: '0.8' }
        : !curStatus && disabled
        ? { left: '.48rem', opacity: '0.8' }
        : { left: '.04rem' }

    return (
      <div className={style.mySwitch} style={mySwitchStyle}>
        <div
          className={switchBoxClass}
          style={checkStyle}
          onClick={e => {
            this.toggleCheck(curStatus)
          }}
        >
          <div className={style.toggleItem} style={toggleStyle} />
        </div>
      </div>
    )
  }
}

MySwitch.defaultProps = {
  checked: false,
  disabled: false
}

export default MySwitch
