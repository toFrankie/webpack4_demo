/**
 * Created by 小敏哥 on 2017/8/7.
 * 此处提供一个封装了样式的列表，以第一层div作为列表项分隔
 */
import React, { Component } from 'react'
import style from './index.scss'
class ItemList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    borderPaddingLeft: React.PropTypes.string, // 底部border距左侧距离
    borderPaddingRight: React.PropTypes.string // 底部border距右侧距离
  }

  renderItems() {
    let paddingStyle = {
      paddingLeft: this.props.borderPaddingLeft ? this.props.borderPaddingLeft : '0',
      paddingRight: this.props.borderPaddingRight ? this.props.borderPaddingRight : '0'
    }
    let childrenArr = this.props.children
    if (childrenArr instanceof Array === false) {
      childrenArr = [childrenArr]
    }
    return childrenArr
      ? childrenArr.map((item, index) => {
          if (item) {
            return (
              <div key={'item' + index} className={style.item} style={paddingStyle}>
                <div className={style.innerItem}>{item}</div>
              </div>
            )
          }
        })
      : ''
  }

  render() {
    return <div className={style.items}>{this.renderItems()}</div>
  }
}

export default ItemList
