import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './index.scss'
const PropTypes = React.PropTypes

class MyCell extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    data: PropTypes.array, // 展示数据
    titleWidth: PropTypes.string // 左边label宽度
  }

  componentDidMount() {}

  render() {
    let { label, value, labelColor, valueColor } = this.props
    let labelStyle = labelColor ? { color: labelColor } : {}
    let valueStyle = valueColor ? { color: valueColor } : {}

    return (
      <div className={style.myCell}>
        <div className={style.cellLabel + ' ' + style.textEllipsis} style={labelStyle}>
          {label}
        </div>
        <div className={style.cellValue + ' ' + style.textEllipsis} style={valueStyle}>
          {value}
        </div>
      </div>
    )
  }
}

MyCell.defaultProps = {}

export default MyCell
