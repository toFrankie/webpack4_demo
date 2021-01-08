import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './index.scss'
const PropTypes = React.PropTypes

class MyNoticeBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    data: PropTypes.array, // 展示数据
    titleWidth: PropTypes.string // 左边label宽度
  }

  componentDidMount() {
    let eleBox = document.getElementById('__noticeBox')
    let ele = document.getElementById('__notice')
    console.log(eleBox.offsetWidth, ele.offsetWidth)
  }

  render() {
    let { type, background, color, icon, speed, text } = this.props

    let noticeBackground = background
      ? { background }
      : type == 'warn'
      ? { background: '#fefcec' }
      : type == 'info'
      ? { background: '#EFF9F6' }
      : { background: 'fffae8' }

    return (
      <div className={style.myNoticeBar}>
        <div className={style.noticeBox} style={noticeBackground}>
          <div className={style.imgBox} style={noticeBackground}>
            {icon ? (
              <img className={style.img} src={icon} />
            ) : type == 'warn' ? (
              <img className={style.img} src="https://yzres.cx580.com/wx/images/public/commonlyIcon/icon-notice-orange-32.png" />
            ) : type == 'info' ? (
              <img className={style.img} src="https://yzres.cx580.com/wx/images/public/commonlyIcon/icon-notice-green-32.png" />
            ) : (
              <img className={style.img} src="https://yzres.cx580.com/wx/images/public/commonlyIcon/icon-laba-48-52.png" />
            )}
          </div>
          <div id="__noticeBox" className={style.textBox}>
            <span
              id="__notice"
              className={style.text}
              style={color ? { color } : type == 'warn' ? { color: '#fd8525' } : type == 'info' ? { color: '#1a1a1a' } : { color: '#fd8525' }}
            >
              {text}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

MyNoticeBar.defaultProps = {}

export default MyNoticeBar
