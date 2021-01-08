import React, { Component } from 'react'
import style from './index.scss'
const PropTypes = React.PropTypes

class MyCellOrderInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    data: PropTypes.array // 展示数据
  }

  componentDidMount() {}

  render() {
    let { data } = this.props

    return (
      <div className={style.cellOrderInfo}>
        {data &&
          data.map((item, index) => {
            let elem = !item.disabled ? (
              <div className={style.cellOrderInfoItem} key={item + index}>
                <div className={style.itemTitle}>{item.title}</div>
                <div className={style.itemValue}>{item.value}</div>
              </div>
            ) : null
            return elem
          })}
      </div>
    )
  }
}

MyCellOrderInfo.defaultProps = {}

export default MyCellOrderInfo
