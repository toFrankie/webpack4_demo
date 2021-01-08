/**
 * 费用展示组件: 可以指定标题、值、值的颜色（默认 #FF721D）
 * data = [{title, value, color}]
 */
import React, { Component } from 'react'
import style from './index.scss'
const PropTypes = React.PropTypes

class MyCellFee extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    data: PropTypes.array // 展示数据
  }

  render() {
    let { data } = this.props

    return (
      <div className={style.cellFee}>
        {data &&
          data.map((item, index) => {
            let elem = null
            if (index != data.length - 1) {
              elem = !item.disabled ? (
                <div className={style.cellFeeItem} key={index}>
                  <div className={style.itemTitle}>{item.title}</div>
                  <div className={style.itemValue + ' ' + style.oneClamp} style={item.color ? { color: item.color } : {}}>
                    {item.value}
                  </div>
                </div>
              ) : null
            } else {
              elem = item ? (
                <div className={style.cellFeeLast} key={index}>
                  {item.map((e, i) => {
                    return !e.disabled ? (
                      <div className={style.cellFeeLastItem} key={e + i}>
                        <div className={style.itemTitle}>{e.title}</div>
                        <div className={style.itemValue + ' ' + style.oneClamp} style={e.color ? { color: e.color } : {}}>
                          {e.value}
                        </div>
                      </div>
                    ) : null
                  })}
                </div>
              ) : null
            }
            return elem
          })}
      </div>
    )
  }
}

MyCellFee.defaultProps = {
  data: []
}

export default MyCellFee
