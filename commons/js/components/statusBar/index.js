/**
 * Created by 小敏哥 on 2017/11/27.
 * 此处提供一个横向的状态流程图
 */
import React, { Component } from 'react'
import style from './index.scss'
import config from '../../config'

class StatusBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    status: React.PropTypes.number, // 当前所处状态位置
    statusArray: React.PropTypes.array // 列表，所有流程项的文字及是否通过，text：文字，isError：是否成功，FALSE为失败
  }

  // 获取节点样式
  getImg(index, isError) {
    // 错误样式优先
    if (index < this.props.status && isError) {
      return <img className={style.errorImg} src={config.resourceUrl + 'images/icon_error_xy.png'} />
    } else if (isError) {
      return <img className={style.errorImg} src={config.resourceUrl + 'images/icon_error.png'} />
    } else if (this.props.status == index) {
      return <img className={style.successImg} src={config.resourceUrl + 'images/icon_success.png'} />
    } else if (index < this.props.status) {
      return <img className={style.normalImg} src={config.resourceUrl + 'images/icon_success_xy.png'} />
    } else {
      return <img className={style.normalImg} src={config.resourceUrl + 'images/icon_moren.png'} />
    }
  }

  // 获取图例线条样式
  getSolid(index, isError) {
    // 错误样式优先
    if (isError) {
      return style.solid + ' ' + style.error
    } else {
      return this.props.status >= index ? style.solid + ' ' + style.successSolid : style.solid
    }
  }

  getText(index, isError) {
    if (isError) {
      return style.errorText
    } else {
      return this.props.status >= index ? style.successText : style.text
    }
  }

  // 构建流程图
  structBar() {
    return this.props.statusArray.map((item, index) => {
      if (index == 0) {
        return (
          <div className={style.first} key={index}>
            {this.getImg(index, item.isError)}
          </div>
        )
      } else {
        return (
          <div className={style.normal} key={index}>
            <div className={this.getSolid(index, item.isError)} />
            <div className={style.content}>{this.getImg(index, item.isError)}</div>
          </div>
        )
      }
    })
  }

  // 构建图例下方文字
  structText() {
    return this.props.statusArray.map((item, index) => {
      return (
        <div className={this.getText(index, item.isError)} key={'text' + index}>
          {item.text}
        </div>
      )
    })
  }

  render() {
    return (
      <div className={style.statusBar}>
        <div className={style.bar}>{this.structBar()}</div>
        <div className={style.textContainer}>{this.structText()}</div>
      </div>
    )
  }
}

export default StatusBar
