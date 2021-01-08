/**
 * 确认页支付按钮
 * 支持类插槽功能（slot），因为很多业务在按钮前面放置一些 warn 提示等
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './index.scss'
const PropTypes = React.PropTypes

class MyPayment extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    children: PropTypes.any, // 类插槽slot
    feeText: PropTypes.string, // 费用文案
    fee: PropTypes.oneOfType([
      // 费用
      PropTypes.string,
      PropTypes.number
    ]),
    payText: PropTypes.string, // 按钮文案
    line: PropTypes.bool // 分割线
  }

  clickEvent() {
    let { clickEvent } = this.props
    typeof clickEvent == 'function' && clickEvent()
  }

  render() {
    let { feeText, fee, payText, children, line } = this.props
    return (
      <div className={style.myPayment}>
        {
          // 支持插槽，<MyPayment>{ child... }</MyPayment>
          children
        }
        {
          // 1px 分割线
          line ? <div className={style.payLine} /> : ''
        }
        <div className={style.payBox}>
          <div className={style.fee}>
            {feeText}：<span style={{ color: '#fd8525' }}>{fee}</span>
          </div>
          <div
            className={style.btn}
            onClick={() => {
              this.clickEvent()
            }}
          >
            {payText}
          </div>
        </div>
      </div>
    )
  }
}

MyPayment.defaultProps = {
  line: false
}

export default MyPayment
