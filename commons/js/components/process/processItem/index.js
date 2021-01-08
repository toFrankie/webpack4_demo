/**
 * Created by 小敏哥 on 2017/11/28.
 * 流程列表列表项
 */
import React, { Component } from 'react'
import style from './index.scss'
import config from '../../../config'

class ProcessItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solidHeight: '50px'
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        solidHeight: this.refs.content.offsetHeight + 'px'
      })
    }, 500)
  }

  static propTypes = {
    statusType: React.PropTypes.string, // 节点类型，start:开始节点，normal：普通节点，current：当前节点
    content: React.PropTypes.string, // 节点文字
    time: React.PropTypes.string, // 流程节点时间
    lineHeight: React.PropTypes.string // 流程线长度
  }

  // 构建节点
  structItem() {
    let left
    let lineStyle = this.props.lineHeight ? { height: this.props.lineHeight } : { height: this.state.solidHeight }
    let lineStyle2 = this.props.lineHeight
      ? { height: this.props.lineHeight, background: '#ababab' }
      : { height: this.state.solidHeight, background: '#ababab' }
    let blankBlock = { height: '0.2rem' }
    if (this.props.statusType == 'start') {
      left = <div className={style.ball} style={{ background: '#ababab' }} />
    } else if (this.props.statusType == 'normal') {
      left = (
        <div className={style.normalLeft}>
          {/* 旧样式 */}
          {/* <div className={style.ball}></div>
                <div className={style.solid} style={lineStyle}></div> */}
          {/* 新样式 */}
          <div className={style.ball} style={{ background: '#ababab' }} />
          <div className={style.solid} style={lineStyle2} />
        </div>
      )
    } else {
      left = (
        <div className={style.currentLeft}>
          <img src={config.resourceUrl + 'images/icon_success.png'} className={style.current} />
          <div className={style.solid} style={lineStyle} />
        </div>
      )
    }

    return (
      <div
        className={this.props.statusType == 'start' ? style.item : style.item + ' ' + style.adaption}
        style={{ marginBottom: this.props.onlyOne ? '-.44rem' : '-.1rem' }}
      >
        {left}
        <div className={this.props.statusType == 'current' ? style.currentContent + ' ' + style.content : style.content} ref="content">
          <p>{this.props.content}</p>
          <div>{this.props.time}</div>
          <div style={this.props.statusType == 'current' ? {} : blankBlock} />
        </div>
      </div>
    )
  }

  render() {
    return <div className={style.processItem}>{this.structItem()}</div>
  }
}

export default ProcessItem
