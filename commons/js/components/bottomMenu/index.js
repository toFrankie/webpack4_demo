/**
 * 新增插槽功能、徽标（类似订单数量）功能
 */
import React, { Component } from 'react'
import style from './index.scss'

class BottomMenu extends Component {
  constructor(props) {
    super(props)
    let index = props.active ? props.active : 0
    this.state = {
      active: index
    }
  }

  static propTypes = {
    onChange: React.PropTypes.func, // 切换回调函数
    data: React.PropTypes.array, // 渲染数据，img：背景图片，checkedImg：选中背景图片，text：底部文字，badge：徽标
    active: React.PropTypes.number, // 初始选中项
    zIndex: React.PropTypes.number // 组件层级
  }

  // 切换菜单
  switchTab(index) {
    let { active } = this.state
    if (active === index) return
    this.setState({ active: index })
    this.props.onChange && this.props.onChange(index)
  }

  render() {
    let { active } = this.state
    let { data, children = null, zIndex } = this.props
    return (
      <div className={style.footPanel} style={{ zIndex: zIndex || 950 }}>
        <div className={style.footNav}>
          {data.map((item, index) => {
            // 背景图片
            let bgImg = active == index ? item.checkedImg : item.img
            let iconBg = { background: `url(${bgImg}) center center / auto 0.56rem no-repeat scroll` }
            // 选中文案样式
            let textStyle = active == index ? style.footItemText + ' ' + style.activeText : style.footItemText
            return (
              <div
                className={style.navItem}
                key={index}
                onClick={e => {
                  e.stopPropagation()
                  this.switchTab(index)
                }}
              >
                <div className={style.footItemIcon} style={iconBg}>
                  {
                    // 徽标
                    item.badge ? <span className={style.footItemBadge}>{item.badge}</span> : ''
                  }
                </div>
                <div className={textStyle}>{item.text}</div>
              </div>
            )
          })}
        </div>
        {children}
      </div>
    )
  }
}

export default BottomMenu
