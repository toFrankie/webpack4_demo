/**
 * Created by 小敏哥 on 2017/3/22.
 */
/**
 * Created by 小敏哥 on 2017/3/22.
 * 此处封装一个带小图片的标题
 */
import React, { Component } from 'react'
import style from './index.scss'

class IconText extends Component {
  static propTypes = {
    imgUrl: React.PropTypes.string, // 图片链接
    text: React.PropTypes.string // 标题文字
  }

  getMainClass() {
    return this.props.className ? style.iconText + ' ' + this.props.className : style.iconText
  }

  render() {
    return (
      <div className={this.getMainClass()}>
        <img src={this.props.imgUrl} />
        <span>{this.props.text}</span>
      </div>
    )
  }
}

export default IconText
