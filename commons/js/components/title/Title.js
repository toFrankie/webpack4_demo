import React, { Component } from 'react'
import { Toast } from 'antd-mobile'
import style from './Title.scss'

class Title extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let { bgColor, isLine, text } = this.props
    return (
      <div className={style.titleBox} style={{ background: bgColor }}>
        <div className={style.title} style={isLine ? { borderBottom: '1PX solid #e5e5e5' } : { borderBottom: 0 }}>
          <i />
          {text}
        </div>
      </div>
    )
  }
}

Title.defaultProps = {}

export default Title
