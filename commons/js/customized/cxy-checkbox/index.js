import React, { Component } from 'react'
import styles from './index.scss'
const PropTypes = React.PropTypes

class CxyCheckbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curStatus: typeof props.checked != 'undefined' ? props.checked : false
    }
  }

  static propTypes = {
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]), // 选择状态
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
    const { curStatus } = this.state
    const { size = '.28rem', inlineStyle, style = {} } = this.props
    // 大小尺寸
    const sizeStyle = size ? { width: size, height: size } : { width: '.28rem', height: '.28rem' }
    // 样式
    const checkStyle = inlineStyle ? { ...inlineStyle, ...sizeStyle } : sizeStyle

    return (
      <div className={styles.cxyCheckbox} style={style}>
        {curStatus ? <div className={styles.checked} style={checkStyle} /> : <div className={styles.unchecked} style={checkStyle} />}
        <div
          className={styles.checkBoxClick}
          onClick={() => {
            this.toggleCheck(curStatus)
          }}
        />
      </div>
    )
  }
}

CxyCheckbox.defaultProps = {
  checked: false
}

export default CxyCheckbox
