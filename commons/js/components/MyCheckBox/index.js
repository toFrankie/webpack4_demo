import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './index.scss'
const PropTypes = React.PropTypes

class MyCheckBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curStatus: typeof props.checked != 'undefined' ? props.checked : false
    }
  }

  static propTypes = {
    checked: PropTypes.oneOfType([
      // 状态，布尔型或者 0 和 1
      PropTypes.bool,
      PropTypes.number
    ]),
    onChange: PropTypes.func, // 切换事件
    size: PropTypes.any, // 复选框大小
    inlineStyle: PropTypes.object // 组件样式
  }

  /**
   * 返回 Boolean 类型
   */
  toggleCheck(status) {
    this.setState({ curStatus: !status })
    this.props.onChange && this.props.onChange(!status)
  }

  render() {
    let { curStatus } = this.state
    let { size = '.24rem', inlineStyle, style = {} } = this.props

    // 大小尺寸
    let sizeStyle = size ? { width: size, height: size } : { width: '.24rem', height: '.24rem' }
    // 样式
    let checkStyle = inlineStyle ? { ...inlineStyle, ...sizeStyle } : sizeStyle

    return (
      <div className={styles.myCheckBox} style={style}>
        {curStatus ? (
          <div
            className={styles.checked}
            style={checkStyle}
            onClick={() => {
              this.toggleCheck(curStatus)
            }}
          />
        ) : (
          <div
            className={styles.unchecked}
            style={checkStyle}
            onClick={() => {
              this.toggleCheck(curStatus)
            }}
          />
        )}
      </div>
    )
  }
}

MyCheckBox.defaultProps = {
  checked: false
}

export default MyCheckBox
