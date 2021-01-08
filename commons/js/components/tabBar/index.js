/**
 * 底部固定tab栏公共组件
 */
import React, { Component } from 'react'
import style from './index.scss'
import config from '../../config'

class TabBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let { isFixed, color, selectedColor, selectedIndex, borderStyle, backgroundColor, position, list, tabClick } = this.props
    return (
      <div className={isFixed ? style.footNav + ' ' + style.fixed : style.footNav} style={{ background: backgroundColor }}>
        {list.map((item, index) => (
          <div
            className={style.Nav}
            style={{ width: (1 / list.length) * 100 + '%' }}
            key={index}
            onClick={() => {
              selectedIndex != index && tabClick(index)
            }}
          >
            <span style={{ color: selectedIndex == index ? selectedColor : color }}>
              <img src={selectedIndex == index ? item.selectedIconPath : item.iconPath} alt={item.text} />
              {item.text}
            </span>
          </div>
        ))}
      </div>
    )
  }
}

TabBar.defaultProps = {
  color: '#ababab', // 字体默认颜色
  selectedColor: '#00B488', // 选中的颜色
  backgroundColor: '#fff', // 背景颜色
  selectedIndex: 1, // 选中的tab下标
  isFixed: true, // 是否固定在底部
  tabClick: index => console.log(index), // tab切换事件 index:当前点击的下标
  list: [
    {
      pagePath: '', // 页面跳转路由
      text: '车辆年检', // tab文案
      iconPath: config.resourceUrl + 'images/visaNav.png', // 默认图标
      selectedIconPath: config.resourceUrl + 'images/visaNav_s.png' // 选中图标
    },
    {
      pagePath: '',
      text: '我的订单',
      iconPath: config.resourceUrl + 'images/orderNav.png',
      selectedIconPath: config.resourceUrl + 'images/orderNav_s.png'
    }
  ]
}

export default TabBar
