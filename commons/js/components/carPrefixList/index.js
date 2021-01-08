import React, { Component, PropTypes } from 'react'
import Style from './index.scss'

class carPrefixList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    list: React.PropTypes.array.isRequired, // 省份列表
    getName: React.PropTypes.func, // 选择省份后回调函数
    show: React.PropTypes.bool // 控制显示和隐藏
  }

  render() {
    return (
      <div
        className={Style.carPrefixList}
        onClick={() => {
          this.props.getName('')
        }}
        style={this.props.show ? { display: 'inherit' } : { display: 'none' }}
      >
        <dl>
          {this.props.list.map((item, i) => (
            <dd
              key={i}
              onClick={e => {
                this.props.getName(item)
                e.stopPropagation()
              }}
            >
              {item}
            </dd>
          ))}
        </dl>
      </div>
    )
  }
}

carPrefixList.propTypes = {}

carPrefixList.defaultProps = {
  getName: name => console.log('获取车牌前缀:', name), // 获取车牌前缀
  show: false // 显示或隐藏
  // list: ['京', '津', '沪', '渝', '湘', '黑', '琼', '贵', '苏', '闽', '辽', '宁', '粤', '陕', '豫', '新', '赣', '冀', '甘', '鄂', '吉', '浙', '云', '桂', '皖', '晋', '鲁', '川','蒙','藏','青'], //列表数据
}

export default carPrefixList
