import React, { Component } from 'react'
import style from './index.scss'
const PropTypes = React.PropTypes

class MyCellContent extends Component {
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
    let { data, titleWidth } = this.props
    let titleStyle = titleWidth ? { width: titleWidth } : {}

    return (
      <div className={style.cellContent}>
        {data &&
          data.map((item, index) => {
            return (
              <div className={style.cellContentItem} key={item + index}>
                <div className={style.itemTitle} style={titleStyle}>
                  {item.title}
                </div>
                <div className={style.itemValue}>{item.value}</div>
              </div>
            )
          })}
      </div>
    )
  }
}

MyCellContent.defaultProps = {}

export default MyCellContent
